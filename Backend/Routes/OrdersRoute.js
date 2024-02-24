const express = require('express');
const router = express.Router();
const usermodel = require("../Models/Usermodel.js");
const productmodel = require("../Models/Productmodel.js")
const Middleware = require("../MiddleWare/MiddleWare.js");
const ordermodel = require("../Models/Ordermodel.js")
const categorymodel = require("../Models/Categorymodel.js");



// SEARCH PRODUCT OR CATEGORY
router.get('/search/:keyword', async (req, res) => {
  const keyword = req.params.keyword;
   
  try {
    const categoryMatched = await categorymodel.findOne({
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ],
    });

    let products;

    if (categoryMatched) {
      products = await productmodel.find({ category: categoryMatched._id });
    } else {
       products = await productmodel.find({
        $or: [
          { name: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } },
          { sub_category: { $regex: keyword, $options: 'i' } },
          {Seller:{$regex: keyword, $options: 'i' }} 
        ],
      });
    }

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;