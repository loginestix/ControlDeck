import mongoose from 'mongoose';
const schema=new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  item:{type:mongoose.Schema.Types.ObjectId,ref:'MarketplaceItem',default:null},
  itemSlug:{type:String,index:true},
  version:String,
  platform:String
},{timestamps:true});
export default mongoose.model('Download',schema);
