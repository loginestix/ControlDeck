import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:{type:String,required:true,maxlength:80},email:{type:String,required:true,maxlength:160},inquiryType:{type:String,required:true,enum:['Product question','Marketplace','Creator inquiry','Partnership','Other']},subject:{type:String,required:true,maxlength:160},message:{type:String,required:true,maxlength:5000},status:{type:String,enum:['new','in_progress','closed'],default:'new'}},{timestamps:true});
export default mongoose.model('ContactSubmission',schema);
