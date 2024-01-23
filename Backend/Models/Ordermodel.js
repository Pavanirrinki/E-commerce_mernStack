const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
orderedBy:{
    type: mongoose.Schema.Types.ObjectId, ref: 'User' 
},
products:{
type: mongoose.Schema.Types.ObjectId, ref: 'Product' 
 },
 productcount:{
type:Number,
required:true
 },
deliveredto:{
    type:Object,
    required:true
},
paymentdetails:{
    type:Object,
    required:true
},
timestamp:{
    type:Date,
    default:Date.now
}
});
const Orders = mongoose.model('Order',orderSchema);
module.exports = Orders;
