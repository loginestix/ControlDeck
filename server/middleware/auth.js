import jwt from 'jsonwebtoken';
export function protect(req,res,next){
  const value=req.headers.authorization||'';
  const token=value.startsWith('Bearer ')?value.slice(7):null;
  if(!token)return res.status(401).json({message:'Authentication required'});
  try{req.user=jwt.verify(token,process.env.JWT_SECRET,{issuer:'control-deck-api',audience:'control-deck-web'});next()}
  catch{return res.status(401).json({message:'Invalid or expired token'})}
}
export const allow=(...roles)=>(req,res,next)=>roles.includes(req.user?.role)?next():res.status(403).json({message:'Forbidden'});
