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

const app=express();
app.use(cors({origin:process.env.CLIENT_URL||'http://localhost:5173'}));
app.use(morgan('dev'));
// Stripe requires the unparsed request body for signature verification.
app.post('/api/payments/webhook', express.raw({type:'application/json'}), stripeWebhook);
app.use(express.json({limit:'1mb'}));
app.get('/api/health',(req,res)=>res.json({ok:true,service:'control-deck-api'}));
app.use('/api/auth',authRoutes);
app.use('/api/plugins',pluginRoutes);
app.use('/api/marketplace',marketplaceRoutes);
app.use('/api/entitlements',entitlementRoutes);
app.use('/api/payments',paymentRoutes);
app.use((req,res)=>res.status(404).json({message:'Route not found'}));
app.use((err,req,res,next)=>{console.error(err);res.status(err.status||500).json({message:err.message||'Server error'})});
const port=process.env.PORT||5000;
async function start(){if(process.env.MONGO_URI)await mongoose.connect(process.env.MONGO_URI);else console.warn('MONGO_URI missing: API running without database connection');app.listen(port,()=>console.log(`Control Deck API on :${port}`))}
start().catch(e=>{console.error(e);process.exit(1)});
