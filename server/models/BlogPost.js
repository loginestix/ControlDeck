import mongoose from 'mongoose';
const schema=new mongoose.Schema({title:{type:String,required:true},slug:{type:String,required:true,unique:true},excerpt:String,content:String,author:{type:mongoose.Schema.Types.ObjectId,ref:'User'},status:{type:String,enum:['draft','published'],default:'draft'},publishedAt:Date},{timestamps:true});
export default mongoose.model('BlogPost',schema);
