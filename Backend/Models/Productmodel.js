const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  price:{
   type:Number,
   required:true
  },
  Seller:{
   type:String,
   required:true,
   default:"pavan"
  },
  countInstock:{
   type:Number,
   required:true
  },
 description:{
    type:String,
    required:true
 },
 category:{
    type: mongoose.Schema.Types.ObjectId, ref: 'category' 
 },
 sub_category:{
type:String,
required:true
 },
 images:[{
    type:String,
    required:true
 }],
 rating:{
   type:Number,
   default:0
 },
 comments:[{
   rating:{
  type:Number,
  default:0
   },
   coment:{
      type:String,
   },
   postedBy:{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User'
   }
 }]
});
const Product = mongoose.model('Product',productSchema);
module.exports = Product;
