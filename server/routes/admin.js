import express from 'express';
import User from '../models/User.js';
import Entitlement from '../models/Entitlement.js';
import Download from '../models/Download.js';
import Order from '../models/Order.js';
import ContactSubmission from '../models/ContactSubmission.js';
import { protect,allow } from '../middleware/auth.js';
const router=express.Router();
router.use(protect,allow('admin'));
router.get('/overview',async(req,res,next)=>{try{
  const [users,entitlements,downloads,orders,messages,recentOrders]=await Promise.all([User.countDocuments(),Entitlement.countDocuments({status:'active'}),Download.countDocuments(),Order.countDocuments({status:'paid'}),ContactSubmission.countDocuments({status:'new'}),Order.find().sort({createdAt:-1}).limit(20).select('totalAmount currency status createdAt')]);
  res.json({stats:{users,entitlements,downloads,orders,messages},recentOrders});
}catch(e){next(e)}});
export default router;
