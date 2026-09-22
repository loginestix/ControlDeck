import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:{type:String,required:true},slug:{type:String,required:true,unique:true},creator:{type:mongoose.Schema.Types.ObjectId,ref:'User'},type:{type:String,enum:['plugin','icon','profile','action','theme','workflow']},category:{type:mongoose.Schema.Types.ObjectId,ref:'Category'},price:{type:Number,default:0},featured:{type:Boolean,default:false},downloads:{type:Number,default:0}},{timestamps:true});
export default mongoose.model('MarketplaceItem',schema);
