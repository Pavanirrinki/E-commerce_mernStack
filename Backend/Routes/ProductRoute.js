const express = require('express');
const productmodel = require("../Models/Productmodel.js");
const categorymodel = require("../Models/Categorymodel.js");
const Usermodel = require("../Models/Usermodel.js");
const router = express.Router();
const middleware = require("../MiddleWare/MiddleWare.js");
//add category
router.post("/add_category",async(req,res)=>{
    const{name,description,Image} =req.body;
    try{
      console.log("pppppppppppppp",name)
        const existingcategory = await categorymodel.findOne({name:name});
        console.log(existingcategory);
        if(existingcategory?.name){
          return  res.status(400).send("Category already exists");
        }else{
        const category = await new categorymodel({name,description,Image});
        await category.save();
        return res.status(201).json({ category });
        }
    }catch(e){
        res.status(400).json({error:e.message});
    }
  })

  //GET ALL CATEGORIES
  router.get("/all_catgories",async(req,res)=>{
    try{
        const category = await categorymodel.find();
        res.status(200).json({category});
      
    }catch(e){
        res.status(400).json({error:e.message});
    }
  })

// GET ONE CATEGORY
router.get("/category/:id",async(req,res)=>{
  try{
    const particularcategory = await categorymodel.find({_id:req.params.id});
    return res.status(200).json({particularcategory})

  }catch(error){
    return res.status(400).json({error})
  }
})

// UPDATE CATEGORY
router.patch('/update_category/:id', async (req, res) => {
  try {
    const updatedcategory = await categorymodel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } 
    );
   return res.status(200).json(updatedcategory);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE CATEGORY
router.delete("/delete/:id",async(req,res)=>{
  try {
    const deletedcategory = await categorymodel.findById(req.params.id);
    
    if(!deletedcategory){
      return res.status(400).json("Category not found")
    }else{
    await categorymodel.findByIdAndDelete( req.params.id,{ new: true })
   return res.status(200).json('deleted succesfully');
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})

//GET ONE CATEGORY ALL PRODUCTS
router.get("/all_products/:category",async(req,res)=>{
try{
const particularcategory = await categorymodel.findOne({name:req.params.category})
const particularcategoryproducts = await productmodel.find({category:particularcategory?._id});
return res.status(200).json(particularcategoryproducts);
  }catch(error){
    return res.status(400).json({error:error.message})
  }
})

//add product 
router.post("/add_product",async(req,res)=>{
    const{name,price,countInstock,description,category,images,sub_category} =req.body;
    try{
        const product = await new productmodel({ name,price,countInstock,description,category,images,sub_category });
        await product.save();
        return res.status(201).json({ product });
    }catch(e){
        res.status(400).json({error:e.message});
    }
})

//ALL PRODUCTS
router.get("/get_all_product",async(req,res)=>{
try{
        const product = await productmodel.find();
        return res.status(201).json({ product});
    }catch(e){
        res.status(400).json({error:e.message});
    }
})
// UPDATE PRODUCT
router.patch('/update_product/:id', async (req, res) => {
    try {
      const updatedData = await productmodel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true } 
      );
     return res.status(200).json(updatedData);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//GET PARTICULAR PRODUCT
router.get('/product/:id', async (req, res) => {
  try {
    const particularproduct = await productmodel.findById({ _id: req.params.id }).populate('comments.postedBy', 'firstname'); 

    return res.status(200).json({ particularproduct });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE PRODUCT
router.delete("/delete_product/:id",async(req,res)=>{
  try {
    const deletedproduct = await productmodel.findById(req.params.id);
    
    if(!deletedproduct){
      return res.status(400).json("Product not found")
    }else{
    await productmodel.findByIdAndDelete( req.params.id,{ new: true })
   return res.status(200).json('deleted succesfully');
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})

//COMMENTS FOR PRODUCT
router.post("/comments/:product_id", async (req, res) => {
  const { postedBy, comment } = req.body;
  try {
    const productdata = await productmodel.findByIdAndUpdate(
      req.params.product_id,
      { $push: { comments: {coment: comment, postedBy } } },
      { new: true }
    );
    if(productdata){
      const userdata = await Usermodel.findById(postedBy);
      return res.status(200).json({productdata,userdata});
    }

  } catch (error) {
    console.error(error);
    return res.status(400).send("Network issue");
  }
});

module.exports = router;