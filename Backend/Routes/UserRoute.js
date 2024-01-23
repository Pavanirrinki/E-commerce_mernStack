const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();
const usermodel = require("../Models/Usermodel.js");
const productmodel = require("../Models/Productmodel.js")
const Middleware = require("../MiddleWare/MiddleWare.js");


// GET PARTICULAR USER DATA
router.get("/particular_user/:id",async(req,res)=>{
  try{
const user_details = await usermodel.findById(req.params.id).
populate('cartproducts.product', 'name price description category images');;
return res.status(200).json({user_details})
  }catch(error){
    return res.status(500).json({error:error.message})
  }
})
//-----------------SIGN UP ROUTE------------
router.post("/signup", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const existingUser = await usermodel.findOne({ email });

    if (existingUser) {
      return res.status(500).send("Email Already Exists");
    }

    if (!firstname || !lastname || !email || !password) {
      return res.status(401).send("Please fill all fields");
    }

    const user = await new usermodel({ firstname, lastname, email, password });
    await user.save();
    return res.status(201).json({ user });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});


//------------------LOGIN ROUTE----------------------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await usermodel.findOne({ email });
    if (existingUser) {
      if (existingUser.password == password) {
        let payload = {
          user: {
            id: existingUser.id,
          },
        };

        jwt.sign(payload, "jwtpassword", (error, token) => {
          if (error) throw error;
          const userWithoutPassword = { ...existingUser._doc }; // mongodb data to plain javascript object can be converted 
          delete userWithoutPassword.password;

          return res.json({ token, user: userWithoutPassword });
         
         
        });
      } else {
        return res.status(400).send("password wrong");
      }
    } else {
      return res.status(400).send("email wrong");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

//-----------PROFILE PIC ROUTE------------------ 
router.post("/profile_pic",async(req,res)=>{
    const {email,profilepic} = req.body;
    try{
const user = await usermodel.findOneAndUpdate({ email },
    { $set: { profilepic } },
    { new: true })
    res.status(200).send("profilepic updated successfully")
    }catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
})


// PRODUCT ADD TO CART
router.post("/item_add_to_cart", Middleware,async (req, res) => {
  const {user_id, product_id } = req.body;

  try {
    const usercartdata = await usermodel.findById(user_id);
    const addtocartproduct = await productmodel.findById(product_id)
console.log(product_id,'poker')
    const productIndex = usercartdata?.cartproducts?.findIndex(
      (cartProduct) => cartProduct.product?.toString() === product_id
    );
console.log(productIndex)
    if (productIndex === -1) {
      
      const updatedUser = await usermodel.findByIdAndUpdate(
        user_id,
        {
          $push: { cartproducts: { product: product_id, Count: 1 } },
          $inc: { cartprice:addtocartproduct?.price},

        },
       
        { new: true }
      );

      return res.status(200).json({ updatedUser });
    } else {
     
      const updatedUser = await usermodel.findOneAndUpdate(
        { _id: user_id, "cartproducts.product": product_id },
        { $inc: { "cartproducts.$.Count": 1,cartprice:addtocartproduct?.price}},
     
        { new: true }
      );

      return res.status(200).json({ updatedUser });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});




// REMOVE PRODUCT FROM CART DATA
router.post("/item_remove_to_cart", async (req, res) => {
  const { user_id, product_id, data } = req.body;

  try {
    const usercartdetails = await usermodel.findById(user_id);
    const removed_product = await productmodel.findById(product_id);

    const indextoremove = usercartdetails?.cartproducts?.findIndex(
      (item) => item.product?.toString() === product_id
    );

    if ((data === "REMOVE" && indextoremove !== -1) || (data == "DECREMENT" && indextoremove !== -1 && usercartdetails?.cartproducts[indextoremove].Count == 1)) {
      const removed_product_price = (removed_product?.price * usercartdetails?.cartproducts[indextoremove].Count)
     
      usercartdetails?.cartproducts.splice(indextoremove, 1);
    const updatedUser = await usermodel.findByIdAndUpdate(
        user_id,
        {
          $set: {
            cartproducts: usercartdetails?.cartproducts,
          },
          $inc: { cartprice: -removed_product_price },
        },
        { new: true }
      );

      return res.status(200).json({ usercartdetails: updatedUser });
    }


    if (data === "DECREMENT" && indextoremove !== -1 && usercartdetails.cartproducts[indextoremove].Count >1) {
      const updatedUser = await usermodel.findOneAndUpdate(
        { _id: user_id, "cartproducts.product": product_id },
        {
          $inc: {
            "cartproducts.$.Count": -1,
            cartprice: -removed_product?.price
          }
        },
        { new: true }
      );
    
      return res.status(200).json({ usercartdetails: updatedUser });
    }

    return res.status(200).json({ usercartdetails });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


//MANAGE ADDRESS
router.post("/manage_addresses/:id",async(req,res)=>{
  const {name, mobileNumber, zipcode, Area, city, Landmark, alternativephone, Address_type,Locality,State} = req.body;
 try{
const user_address = await usermodel.findById(req.params.id);
const new_address = {name, mobileNumber, zipcode, Area, city, Landmark, alternativephone, Address_type,Locality,State};
 await user_address?.Addresses?.push(new_address);
await user_address.save()
return res.status(200).json("Successfully added address");
  }catch(error){
    return res.status(400).json({error:error.message})
  }
})

module.exports = router;