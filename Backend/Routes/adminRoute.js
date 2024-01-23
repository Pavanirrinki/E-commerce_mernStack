const express = require('express');
const productmodel = require("../Models/Productmodel.js");
const categorymodel = require("../Models/Categorymodel.js");
const Usermodel = require("../Models/Usermodel.js");
const orderroute = require("../Models/Ordermodel.js");
const crypto = require("crypto")
const router = express.Router();
const Razorpay = require("razorpay")
const middleware = require("../MiddleWare/MiddleWare.js");
require('dotenv').config()
router.get("/admin_dashboard/allorders",async(req,res)=>{
    try{
    const allorders = await orderroute.find({}).populate('products') 
    return res.status(200).json({allorders})
    }catch(error){
        return res.status(500).json({error:error.message})
    }
})


module.exports = router;