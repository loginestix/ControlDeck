import express from 'express';
import Stripe from 'stripe';
import Order from '../models/Order.js';
import Entitlement from '../models/Entitlement.js';
import { protect } from '../middleware/auth.js';
import { getCatalogItem } from '../config/marketplaceCatalog.js';

const router = express.Router();
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

router.post('/checkout-session', protect, async (req,res,next) => {
  try {
    if (!stripe) return res.status(503).json({message:'Payments are not configured. Add STRIPE_SECRET_KEY on the server.'});
    const slugs = Array.isArray(req.body?.slugs) ? [...new Set(req.body.slugs)] : [];
    if (!slugs.length) return res.status(400).json({message:'Your cart is empty'});
    const items = slugs.map(getCatalogItem);
    if (items.some(x=>!x)) return res.status(400).json({message:'One or more marketplace items are invalid'});
    if (items.some(x=>x.unitAmount<=0)) return res.status(400).json({message:'Free products do not belong in checkout'});
    const totalAmount = items.reduce((sum,x)=>sum+x.unitAmount,0);
    const order = await Order.create({
      user:req.user.id,
      items:items.map(x=>({itemSlug:x.slug,unitAmount:x.unitAmount,currency:x.currency})),
      totalAmount,
      currency:'usd',
      status:'pending'
    });
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const session = await stripe.checkout.sessions.create({
      mode:'payment',
      line_items:items.map(x=>({price_data:{currency:x.currency,product_data:{name:x.slug.split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join(' ')},unit_amount:x.unitAmount},quantity:1})),
      success_url:`${clientUrl}/marketplace/library?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:`${clientUrl}/marketplace/cart?checkout=canceled`,
      client_reference_id:String(order._id),
      metadata:{orderId:String(order._id),userId:String(req.user.id)},
    });
    order.providerSessionId=session.id;
    await order.save();
    res.status(201).json({checkoutUrl:session.url,orderId:order._id});
  } catch (e) { next(e); }
});

export async function stripeWebhook(req,res){
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) return res.status(503).send('Stripe webhook is not configured');
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET);
  } catch (e) { return res.status(400).send(`Webhook Error: ${e.message}`); }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const order = await Order.findOne({providerSessionId:session.id});
      if (order && order.status !== 'paid') {
        order.status='paid'; order.paidAt=new Date(); await order.save();
        await Promise.all(order.items.map(x=>Entitlement.findOneAndUpdate(
          {user:order.user,itemSlug:x.itemSlug},
          {$set:{status:'active',source:'purchase',order:order._id},$setOnInsert:{version:'latest'}},
          {upsert:true,new:true,setDefaultsOnInsert:true}
        )));
      }
    }
    if (event.type === 'checkout.session.expired') {
      await Order.findOneAndUpdate({providerSessionId:event.data.object.id,status:'pending'},{$set:{status:'canceled'}});
    }
    res.json({received:true});
  } catch (e) {
    console.error(e); res.status(500).json({message:'Webhook processing failed'});
  }
}

export default router;
