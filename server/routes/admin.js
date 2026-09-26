import express from 'express';
import User from '../models/User.js';
import Entitlement from '../models/Entitlement.js';
import Download from '../models/Download.js';
import Order from '../models/Order.js';
import ContactSubmission from '../models/ContactSubmission.js';
import { officialDesktopPlugins } from '../config/officialDesktopPlugins.js';
import { protect,allow } from '../middleware/auth.js';

const router=express.Router();
router.use(protect,allow('admin'));
const publicUser='name email role active createdAt updatedAt';

router.get('/overview',async(req,res,next)=>{try{
  const [users,activeUsers,entitlements,downloads,orders,messages,recentUsers,recentMessages,recentOrders]=await Promise.all([
    User.countDocuments(),User.countDocuments({active:{$ne:false}}),Entitlement.countDocuments({status:'active'}),Download.countDocuments(),Order.countDocuments({status:'paid'}),ContactSubmission.countDocuments({status:'new'}),
    User.find().sort({createdAt:-1}).limit(6).select(publicUser),ContactSubmission.find().sort({createdAt:-1}).limit(6),Order.find().sort({createdAt:-1}).limit(8).select('totalAmount currency status createdAt')
  ]);
  res.json({stats:{users,activeUsers,entitlements,downloads,orders,messages,plugins:officialDesktopPlugins.length},recentUsers,recentMessages,recentOrders,plugins:officialDesktopPlugins.map(x=>({id:x.manifest.id,name:x.manifest.name,version:x.manifest.version,verified:x.manifest.marketplace?.verified,actions:x.manifest.actions?.length||0}))});
}catch(e){next(e)}});

router.get('/users',async(req,res,next)=>{try{const q=String(req.query.q||'').trim();const filter=q?{$or:[{name:{$regex:q,$options:'i'}},{email:{$regex:q,$options:'i'}}]}:{};res.json(await User.find(filter).sort({createdAt:-1}).limit(100).select(publicUser))}catch(e){next(e)}});
router.patch('/users/:id',async(req,res,next)=>{try{
  const update={};
  if(['user','creator','developer','admin'].includes(req.body?.role))update.role=req.body.role;
  if(typeof req.body?.active==='boolean')update.active=req.body.active;
  if(String(req.user.id)===String(req.params.id)&&update.active===false)return res.status(400).json({message:'You cannot disable your own administrator account.'});
  const user=await User.findByIdAndUpdate(req.params.id,{$set:update},{new:true,runValidators:true}).select(publicUser);
  if(!user)return res.status(404).json({message:'User not found'});
  res.json(user);
}catch(e){next(e)}});

router.get('/messages',async(req,res,next)=>{try{const status=String(req.query.status||'');const filter=['new','in_progress','closed'].includes(status)?{status}:{};res.json(await ContactSubmission.find(filter).sort({createdAt:-1}).limit(100))}catch(e){next(e)}});
router.patch('/messages/:id',async(req,res,next)=>{try{if(!['new','in_progress','closed'].includes(req.body?.status))return res.status(400).json({message:'Invalid message status'});const message=await ContactSubmission.findByIdAndUpdate(req.params.id,{$set:{status:req.body.status}},{new:true,runValidators:true});if(!message)return res.status(404).json({message:'Message not found'});res.json(message)}catch(e){next(e)}});

export default router;
