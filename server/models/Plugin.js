import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:{type:String,required:true},slug:{type:String,required:true,unique:true},description:String,icon:String,category:{type:mongoose.Schema.Types.ObjectId,ref:'Category'},author:{type:mongoose.Schema.Types.ObjectId,ref:'User'},version:String,rating:{type:Number,default:0},downloads:{type:Number,default:0},price:{type:Number,default:0},supportedPlatforms:[String],permissions:[String],screenshots:[String],documentationUrl:String,repositoryUrl:String},{timestamps:true});
export default mongoose.model('Plugin',schema);
