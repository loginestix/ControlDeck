import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:{type:String,required:true},slug:{type:String,required:true,unique:true},category:String,description:String,icon:String,supportedPlatforms:[String],status:{type:String,default:'planned'}},{timestamps:true});
export default mongoose.model('Integration',schema);
