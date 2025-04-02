
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();


router.post("/cartItem",authMiddleware,async (req,res) =>{
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
router.get("/cartItem",authMiddleware,async(req,res) =>{
  try {
		const products = await Product.find({ _id: { $in: req.user.cartItems } });

		// add quantity for each product
		const cartItems = products.map((product) => {
			const item = req.user.cartItems.find((cartItem) => cartItem.id === product.id);
			return { ...product.toJSON(), quantity: item.quantity };
		});

		res.json(cartItems);
	} catch (error) {
		console.log("Error in getCartProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
})

module.exports = router;