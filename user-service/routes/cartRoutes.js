
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();


router.post("/cart",authMiddleware,async (req,res) =>{
    try{
      const productId = req.body;
      const user = req.user;
      console.log(user)

      const existingItem = await user.cartItems.find((item) => item.id === productId);
      if(existingItem){
        user.cartItems.quantity += 1;
      }else{
        user.cartItems.push(productId)
      }

      await user.save();
      res.json(user.cartItems);
    }catch(error){
        console.log("Error in addToCart controller", error.message);
        res.status(402).json({msg : "Failed to add cart"})
    }
})
router.get("/post",authMiddleware,async(req,res) =>{
  try{
    
  }catch(err){
    res.status(404).json({msg : err.msg})
  }
})

module.exports = router;