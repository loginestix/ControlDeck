import jwt from 'jsonwebtoken';
import User from '../models/User.js';
export async function protect(req,res,next){
  const value=req.headers.authorization||'';
  const token=value.startsWith('Bearer ')?value.slice(7):null;
  if(!token)return res.status(401).json({message:'Authentication required'});
  try{const payload=jwt.verify(token,process.env.JWT_SECRET,{issuer:'control-deck-api',audience:'control-deck-web'});const current=await User.findById(payload.id).select('role active');if(!current||current.active===false)return res.status(401).json({message:'Account unavailable'});req.user={...payload,role:current.role};next()}
  catch{return res.status(401).json({message:'Invalid or expired token'})}
}
export const allow=(...roles)=>(req,res,next)=>roles.includes(req.user?.role)?next():res.status(403).json({message:'Forbidden'});
