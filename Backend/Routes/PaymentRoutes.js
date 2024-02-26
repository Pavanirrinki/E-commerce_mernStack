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

var instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET
});

router.post("/payment/checkout", async (req, res) => {
    console.log(Number(req.body?.userstate?.cartprice))
    try {
        const order = await instance?.orders?.create({
            amount: Number(req.body?.userstate?.cartprice),
            currency: "INR",
            receipt: "order_rcptid_11"
        });

        return res.status(200).json(order)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})

router.post("/payment_verification", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    console.log("payment1234", req.body);

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        // Database operations here
        await instance.payments.fetch(razorpay_payment_id)
            .then(async (payment) => {
                if (payment.status == "captured") {
                    const purchaseddetails = await Usermodel.findById(JSON.parse(payment?.notes?.userdata));
const purchasedproductsids =[];
const updatedproductids = [];
                    try {
                       
    await purchaseddetails?.cartproducts?.map(product =>  purchasedproductsids.push((product)) ); 
    await purchaseddetails?.cartproducts?.map(product =>  updatedproductids.push((product?.product?.toString())) ); 
    
await purchasedproductsids?.map(async (product)=>{
    console.log("purchasedids",product.Count)
        const order = await orderroute.create({
            orderedBy: purchaseddetails,
            products: product?.product?.toString(),
            productcount:Number(product?.Count),
            deliveredto: JSON.parse(payment?.notes?.address),
            paymentdetails: razorpay_payment_id
        });
    
       await order.save()
    })
    
    
    await Usermodel.updateOne(
            { _id: purchaseddetails._id },
            {
                $push: {
                    purchasedproducts: { $each: updatedproductids },
                },
                $set: {
                    cartproducts: [],
                    cartprice: 0,
                },
            }
        );

              
          return res.status(200).redirect('https://e-commerce-mern-stack-nu.vercel.app/payment_successful');
                    } catch (error) {
                        return res.status(400).json({ error: error.message });
                    }
                }
            })
            .catch((error) => res.status(500).json(error.message));
    } else {
        res.status(400).json({
            success: false,
        });
    }
});


module.exports = router;
