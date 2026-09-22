import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { officialDesktopPlugins, findOfficialDesktopPlugin } from '../config/officialDesktopPlugins.js';
import { packageIntegrity } from '../services/packageSigner.js';

const router=express.Router();
const packageRoot=()=>path.resolve(process.env.PACKAGE_ROOT||'./packages');
const packagePath=item=>path.join(packageRoot(),item.slug,item.packageFile);
const publicBase=req=>(process.env.PUBLIC_API_URL||`${req.protocol}://${req.get('host')}`).replace(/\/$/,'');

router.get('/plugins',async(req,res,next)=>{try{
  const plugins=[];
  for(const item of officialDesktopPlugins){
    const file=packagePath(item);
    if(!fs.existsSync(file))continue;
    const integrity=await packageIntegrity(file);
    plugins.push({...item.manifest,distribution:{downloadUrl:`${publicBase(req)}/api/desktop/plugins/${encodeURIComponent(item.manifest.id)}/package`,sha256:integrity.sha256,signature:integrity.signature,signatureAlgorithm:integrity.algorithm,size:fs.statSync(file).size}});
  }
  res.setHeader('Cache-Control','public, max-age=300, stale-while-revalidate=600');
  res.json({schemaVersion:1,plugins});
}catch(e){next(e)}});

router.get('/plugins/:id/package',async(req,res,next)=>{try{
  const item=findOfficialDesktopPlugin(req.params.id);
  if(!item)return res.status(404).json({message:'Plugin not found'});
  const file=packagePath(item);
  if(!fs.existsSync(file))return res.status(404).json({message:'Plugin package is not published'});
  const integrity=await packageIntegrity(file);
  res.setHeader('X-Control-Deck-SHA256',integrity.sha256);
  if(integrity.signature){res.setHeader('X-Control-Deck-Signature',integrity.signature);res.setHeader('X-Control-Deck-Signature-Algorithm',integrity.algorithm)}
  res.setHeader('Cache-Control','public, max-age=300');
  res.setHeader('Content-Type','application/zip');
  res.setHeader('Content-Disposition',`attachment; filename="${item.slug}-${item.manifest.version}.zip"`);
  fs.createReadStream(file).on('error',next).pipe(res);
}catch(e){next(e)}});

export default router;
