import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const r=express.Router();
const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const token=u=>jwt.sign({id:u._id,role:u.role},process.env.JWT_SECRET,{expiresIn:'2h',issuer:'control-deck-api',audience:'control-deck-web'});
const publicUser=u=>({id:u._id,name:u.name,email:u.email,role:u.role});

r.post('/register',async(req,res,next)=>{try{
  const name=String(req.body?.name||'').trim().slice(0,80);
  const email=String(req.body?.email||'').trim().toLowerCase();
  const password=String(req.body?.password||'');
  if(name.length<2||!emailPattern.test(email)||password.length<12||password.length>128)return res.status(400).json({message:'Enter a valid name, email, and password between 12 and 128 characters.'});
  if(await User.findOne({email}))return res.status(409).json({message:'Email already registered'});
  const u=await User.create({name,email,password:await bcrypt.hash(password,12)});
  res.status(201).json({token:token(u),user:publicUser(u)});
}catch(e){next(e)}});

r.post('/login',async(req,res,next)=>{try{
  const email=String(req.body?.email||'').trim().toLowerCase();
  const u=await User.findOne({email}).select('+password');
  if(!u||!await bcrypt.compare(String(req.body?.password||''),u.password))return res.status(401).json({message:'Invalid credentials'});
  if(u.active===false)return res.status(403).json({message:'This account has been disabled. Contact support for help.'});
  res.json({token:token(u),user:publicUser(u)});
}catch(e){next(e)}});

export default r;
