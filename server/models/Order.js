import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  itemSlug: { type: String, required: true },
  unitAmount: { type: Number, required: true },
  currency: { type: String, default: 'usd' },
},{ _id: false });

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  items: { type: [orderItemSchema], default: [] },
  totalAmount: { type: Number, required: true },
  currency: { type: String, default: 'usd' },
  status: { type: String, enum: ['pending','paid','canceled','refunded'], default: 'pending', index: true },
  provider: { type: String, enum: ['stripe'], default: 'stripe' },
  providerSessionId: { type: String, index: true, sparse: true },
  paidAt: Date,
},{ timestamps: true });

export default mongoose.model('Order', schema);
