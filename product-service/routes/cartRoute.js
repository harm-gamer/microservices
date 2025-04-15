const express = require("express");

const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware.js");
const Product = require("../models/Product.js");

router.get("/cartItem",authMiddleware,async(req,res) =>{
    try {
        console.log(req.user);
          const products = await Product.find({ _id: { $in: req.user.cartItems } });
  
          // add quantity for each product
          const cartItems = products.map((product) => {
              const item = req.user.cartItems.find((cartItem) => cartItem._id === product.id);
              console.log(item);
              return { ...product.toJSON(), quantity: item.quantity };
          });
  
          res.json(cartItems);
      } catch (error) {
          console.log("Error in getCartProducts controller", error.message);
          res.status(500).json({ message: "Server error", error: error.message });
      }
  })

  module.exports = router;