import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const email=String(process.env.ADMIN_EMAIL||'').trim().toLowerCase();
const name=String(process.env.ADMIN_NAME||'Control Deck Admin').trim().slice(0,80);
const password=String(process.env.ADMIN_PASSWORD||'');

if(!process.env.MONGO_URI)throw new Error('MONGO_URI is required.');
if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))throw new Error('ADMIN_EMAIL must be a valid email.');
if(password.length<16||password.length>128)throw new Error('ADMIN_PASSWORD must be between 16 and 128 characters.');

await mongoose.connect(process.env.MONGO_URI);
try{
  const hash=await bcrypt.hash(password,12);
  await User.findOneAndUpdate({email},{$set:{name,password:hash,role:'admin'}},{upsert:true,new:true,setDefaultsOnInsert:true});
  console.log(`Administrator ready: ${email}`);
}finally{
  await mongoose.disconnect();
}
