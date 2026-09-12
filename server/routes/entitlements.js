import express from 'express';
import jwt from 'jsonwebtoken';
import path from 'node:path';
import fs from 'node:fs';
import Entitlement from '../models/Entitlement.js';
import Download from '../models/Download.js';
import { protect } from '../middleware/auth.js';
import { getCatalogItem } from '../config/marketplaceCatalog.js';
import { packageIntegrity } from '../services/packageSigner.js';

const router = express.Router();

router.get('/me', protect, async (req,res,next) => {
  try {
    const entitlements = await Entitlement.find({ user:req.user.id, status:'active' }).sort({createdAt:-1});
    res.json(entitlements);
  } catch (e) { next(e); }
});

router.post('/free/:slug', protect, async (req,res,next) => {
  try {
    const catalogItem = getCatalogItem(req.params.slug);
    if (!catalogItem) return res.status(404).json({message:'Marketplace item not found'});
    if (catalogItem.unitAmount !== 0) return res.status(400).json({message:'This item requires purchase'});
    const entitlement = await Entitlement.findOneAndUpdate(
      { user:req.user.id, itemSlug:req.params.slug },
      { $set:{status:'active',source:'free'}, $setOnInsert:{version:'latest'} },
      { new:true, upsert:true, setDefaultsOnInsert:true }
    );
    res.status(201).json(entitlement);
  } catch (e) { next(e); }
});

router.post('/:slug/install', protect, async (req,res,next) => {
  try {
    const catalogItem = getCatalogItem(req.params.slug);
    if (!catalogItem) return res.status(404).json({message:'Marketplace item not found'});
    if (catalogItem.delivery !== 'plugin') return res.status(400).json({message:'This marketplace item is not a desktop plugin package.'});
    const entitlement = await Entitlement.findOne({user:req.user.id,itemSlug:req.params.slug,status:'active'});
    if (!entitlement) return res.status(403).json({message:'Add or purchase this item before installing it'});
    const root = path.resolve(process.env.PACKAGE_ROOT || './packages');
    const safeSlug = String(req.params.slug).replace(/[^a-z0-9-]/gi,'');
    const safeVersion = String(entitlement.version || 'latest').replace(/[^a-z0-9._-]/gi,'');
    const publishedPackage = path.join(root, safeSlug, `${safeVersion}.zip`);
    if (!fs.existsSync(publishedPackage)) return res.status(409).json({message:'This plugin is owned, but its desktop package is not published yet.'});
    const token = jwt.sign(
      { type:'package', userId:req.user.id, slug:req.params.slug, version:entitlement.version || 'latest' },
      process.env.PACKAGE_TOKEN_SECRET || process.env.JWT_SECRET,
      { expiresIn:'10m' }
    );
    await Download.create({user:req.user.id,item:null,version:entitlement.version || 'latest',platform:req.body?.platform || 'desktop',itemSlug:req.params.slug});
    const base = process.env.PUBLIC_API_URL || `http://localhost:${process.env.PORT || 5000}`;
    const packageUrl = `${base}/api/entitlements/package/${token}`;
    const deepLink = `control-deck://install?url=${encodeURIComponent(packageUrl)}&slug=${encodeURIComponent(req.params.slug)}`;
    res.json({deepLink,packageUrl,expiresIn:600});
  } catch (e) { next(e); }
});

router.get('/package/:token', async (req,res,next) => {
  try {
    const payload = jwt.verify(req.params.token, process.env.PACKAGE_TOKEN_SECRET || process.env.JWT_SECRET);
    if (payload.type !== 'package') return res.status(403).json({message:'Invalid package token'});
    const entitlement = await Entitlement.findOne({user:payload.userId,itemSlug:payload.slug,status:'active'});
    if (!entitlement) return res.status(403).json({message:'Entitlement is no longer active'});
    const root = path.resolve(process.env.PACKAGE_ROOT || './packages');
    const safeSlug = String(payload.slug).replace(/[^a-z0-9-]/gi,'');
    const safeVersion = String(payload.version || 'latest').replace(/[^a-z0-9._-]/gi,'');
    const packagePath = path.join(root, safeSlug, `${safeVersion}.zip`);
    if (!fs.existsSync(packagePath)) return res.status(404).json({message:'Package file is not published yet'});
    const integrity=await packageIntegrity(packagePath);
    res.setHeader('X-Control-Deck-SHA256',integrity.sha256);
    if(integrity.signature){res.setHeader('X-Control-Deck-Signature',integrity.signature);res.setHeader('X-Control-Deck-Signature-Algorithm',integrity.algorithm);}
    res.setHeader('Cache-Control','private, no-store');
    res.download(packagePath, `${safeSlug}-${safeVersion}.zip`);
  } catch (e) {
    if (e?.name === 'JsonWebTokenError' || e?.name === 'TokenExpiredError') return res.status(401).json({message:'Package link expired or invalid'});
    next(e);
  }
});

export default router;
