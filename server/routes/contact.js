import express from 'express';
import ContactSubmission from '../models/ContactSubmission.js';
const router=express.Router();
const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
router.post('/',async(req,res,next)=>{try{
  const data={name:String(req.body?.name||'').trim().slice(0,80),email:String(req.body?.email||'').trim().toLowerCase().slice(0,160),inquiryType:String(req.body?.inquiryType||''),subject:String(req.body?.subject||'').trim().slice(0,160),message:String(req.body?.message||'').trim().slice(0,5000)};
  if(data.name.length<2||!emailPattern.test(data.email)||!['Product question','Marketplace','Creator inquiry','Partnership','Other'].includes(data.inquiryType)||data.subject.length<3||data.message.length<10)return res.status(400).json({message:'Please complete every field with valid information.'});
  await ContactSubmission.create(data);
  res.status(201).json({ok:true,message:'Your message has been received.'});
}catch(e){next(e)}});
export default router;
