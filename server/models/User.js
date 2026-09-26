import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:{type:String,required:true},email:{type:String,required:true,unique:true,lowercase:true},password:{type:String,required:true,select:false},role:{type:String,enum:['user','creator','developer','admin'],default:'user'},active:{type:Boolean,default:true},savedItems:[{type:mongoose.Schema.Types.ObjectId,ref:'MarketplaceItem'}]},{timestamps:true});
export default mongoose.model('User',schema);
