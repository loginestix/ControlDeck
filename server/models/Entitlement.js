import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  itemSlug: { type: String, required: true, index: true },
  source: { type: String, enum: ['free','purchase','grant'], required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', default: null },
  status: { type: String, enum: ['active','revoked','refunded'], default: 'active' },
  version: { type: String, default: 'latest' },
},{ timestamps: true });

schema.index({ user: 1, itemSlug: 1 }, { unique: true });
export default mongoose.model('Entitlement', schema);
