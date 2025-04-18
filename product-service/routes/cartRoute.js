const express = require("express");

const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware.js");
const Product = require("../models/Product.js");

router.get("/cart-item",authMiddleware,async(req,res) =>{
   
    console.log(req.user);
    try {
         console.log(req.user.cartItems)
        // let productIds = req.user.cartItems.map(item => item.id);
        let products = await Product.find({ _id: { $in: req.user.cartItems } });
        console.log(products)
        

          // add quantity for each product
          const cartItems = products.map((product) => {
            console.log(product);

              let item = req.user.cartItems.find((cartItem) => cartItem._id === product.id);
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