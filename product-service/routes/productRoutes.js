const express = require('express');
const Product = require('../models/Product.js');
const cloudinary = require("../utils/cloudinay.js")
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();


// Create a product with image upload
router.post('/',authMiddleware, async (req, res) => {
  console.log(req.body);
    try {
      let { name, description, price, category,image} = req.body;
  
      if(!image){
        return res.status(404).json({massage : "image not fount"})
      }
      let cloudinaryResponse = null;

      if (image) {
        cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
      }
      console.log(cloudinaryResponse)
      if(!cloudinaryResponse){
        return res.status(404).json({massage : "cloudresponse not fount"})
      }
      
      if (!req.user) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      // console.log(cloudinaryResponse?.secure_url);
      console.log(cloudinaryResponse.secure_url);
      const product = await Product.create({ name, description, price, image:cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",category});
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error creating product', error:error.message });
    }
  });

// Get all products
router.get('/', async (req, res) => {
  const products = await Product.find({});
  res.json({products});
});

// Get a product by category

router.get('/category/:category',async (req,res) =>{
  try{
    const category = req.params.category;
    
    const product = await Product.find({category});
   
    res.json({product})
  }catch(err){
    res.status(500).json({message : err})
  }
})


// Get a product by ID
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});



// Update a product
router.put('/:id', async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
});

// Delete a product
router.delete('/:id', async (req, res) => {

  const product = await Product.findById(req.params.id);
  // await Product.findByIdAndDelete(req.params.id);
  if (product.image) {
    const publicId = product.image.split("/").pop().split(".")[0];
    try {
      await cloudinary.uploader.destroy(`products/${publicId}`);
      console.log("deleted image from cloduinary");
    } catch (error) {
      console.log("error deleting image from cloduinary", error);
    }
  }

  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
});

module.exports = router;