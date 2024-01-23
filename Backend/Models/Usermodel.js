const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilepic:{type:String,default:'https://th.bing.com/th/id/OIP.66elZ0rdKa61JlWQw8G7XgHaGf?w=211&h=186&c=7&r=0&o=5&dpr=1.5&pid=1.7'},
  Addresses:[{
   name:{
    type:String,
 },
   mobileNumber:{
    type:String,
   },
   zipcode:{
    type:String,
   },
   Locality:{
        type:String,
   },
   Area:{
    type:String,
   },
   city:{
    type:String,
   },
   Landmark:{
    type:String
   },
   alternativephone:{
    type:String
   },
   State:{
    type:String
   },
   Address_type:{
    type:String
   },
   _id:false,
  }],
cartproducts:[{
  product:{
    type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product'
  },
  Count:{
     type:Number
  },
  _id:false
}],
   cartprice: { type:Number, default:0},
   purchasedproducts:[{type: mongoose.Schema.Types.ObjectId,ref:'Product'}]

});
const User = mongoose.model('User', userSchema);
module.exports = User;
