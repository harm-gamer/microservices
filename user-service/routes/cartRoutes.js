
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();


router.post("/cartItem",authMiddleware,async (req,res) =>{
    try{
      const{ productId} = req.body;
      console.log(productId);
      const user = req.user;

      const existingItem = await user.cartItems.find((item) => item?.id === productId);
      if(existingItem){
        existingItem.quantity += 1;
      }else{
        user.cartItems.push(productId);
      }

      await user.save();
      res.json(user.cartItems);
    }catch(error){
        console.log("Error in addToCart controller", error.message);
        res.status(402).json({msg : "Failed to add cart"})
    }
})


module.exports = router;