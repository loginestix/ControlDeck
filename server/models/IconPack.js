import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:{type:String,required:true},slug:{type:String,required:true,unique:true},creator:{type:mongoose.Schema.Types.ObjectId,ref:'User'},icons:[String],price:{type:Number,default:0},rating:{type:Number,default:0},category:{type:mongoose.Schema.Types.ObjectId,ref:'Category'}},{timestamps:true});
export default mongoose.model('IconPack',schema);
