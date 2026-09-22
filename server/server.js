import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import pluginRoutes from './routes/plugins.js';
import marketplaceRoutes from './routes/marketplace.js';
import entitlementRoutes from './routes/entitlements.js';
import paymentRoutes, { stripeWebhook } from './routes/payments.js';
import desktopMarketplaceRoutes from './routes/desktopMarketplace.js';
import contactRoutes from './routes/contact.js';
import adminRoutes from './routes/admin.js';

const app=express();
const production=process.env.NODE_ENV==='production';
const required=['MONGO_URI','JWT_SECRET','PACKAGE_TOKEN_SECRET','CLIENT_URL','PUBLIC_API_URL'];
if(production){const missing=required.filter(key=>!process.env[key]||process.env[key].includes('<'));if(missing.length)throw new Error(`Missing production configuration: ${missing.join(', ')}`);if(process.env.JWT_SECRET===process.env.PACKAGE_TOKEN_SECRET)throw new Error('JWT_SECRET and PACKAGE_TOKEN_SECRET must be different.');}
if(process.env.TRUST_PROXY==='1')app.set('trust proxy',1);
app.disable('x-powered-by');
app.use((req,res,next)=>{res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('X-Frame-Options','DENY');res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');res.setHeader('Permissions-Policy','camera=(), microphone=(), geolocation=()');res.setHeader('Cross-Origin-Resource-Policy','same-site');if(production)res.setHeader('Strict-Transport-Security','max-age=31536000; includeSubDomains');next()});
const allowedOrigins=(process.env.CLIENT_URL||'http://localhost:5173').split(',').map(value=>value.trim()).filter(Boolean);
app.use(cors({origin(origin,callback){if(!origin||allowedOrigins.includes(origin))return callback(null,true);return callback(new Error('Origin not allowed'));},methods:['GET','POST','PUT','DELETE','OPTIONS'],allowedHeaders:['Content-Type','Authorization','X-ControlDeck-Version'],maxAge:86400}));
const buckets=new Map();
app.use((req,res,next)=>{const now=Date.now();const key=`${req.ip}:${req.path.startsWith('/api/auth')?'auth':'api'}`;const limit=req.path.startsWith('/api/auth')?20:240;const current=buckets.get(key);if(!current||current.reset<now){buckets.set(key,{count:1,reset:now+60000});return next()}current.count+=1;if(current.count>limit){res.setHeader('Retry-After',String(Math.ceil((current.reset-now)/1000)));return res.status(429).json({message:'Too many requests. Please try again shortly.'})}next()});
setInterval(()=>{const now=Date.now();for(const [key,value] of buckets)if(value.reset<now)buckets.delete(key)},60000).unref();
app.use(morgan(production?'combined':'dev'));
// Stripe requires the unparsed request body for signature verification.
app.post('/api/payments/webhook', express.raw({type:'application/json'}), stripeWebhook);
app.use(express.json({limit:'1mb'}));
app.get('/api/health',(req,res)=>res.json({ok:true,service:'control-deck-api'}));
app.use('/api/auth',authRoutes);
app.use('/api/plugins',pluginRoutes);
app.use('/api/marketplace',marketplaceRoutes);
app.use('/api/entitlements',entitlementRoutes);
app.use('/api/payments',paymentRoutes);
app.use('/api/desktop',desktopMarketplaceRoutes);
app.use('/api/contact',contactRoutes);
app.use('/api/admin',adminRoutes);
app.use((req,res)=>res.status(404).json({message:'Route not found'}));
app.use((err,req,res,next)=>{console.error(err);res.status(err.status||500).json({message:err.message||'Server error'})});
const port=process.env.PORT||5000;
async function start(){if(process.env.MONGO_URI)await mongoose.connect(process.env.MONGO_URI);else console.warn('MONGO_URI missing: API running without database connection');app.listen(port,()=>console.log(`Control Deck API on :${port}`))}
start().catch(e=>{console.error(e);process.exit(1)});
