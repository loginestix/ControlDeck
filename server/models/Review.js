import mongoose from 'mongoose';
const schema=new mongoose.Schema({user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},item:{type:mongoose.Schema.Types.ObjectId,ref:'MarketplaceItem',required:true},rating:{type:Number,min:1,max:5,required:true},comment:String},{timestamps:true});
export default mongoose.model('Review',schema);
