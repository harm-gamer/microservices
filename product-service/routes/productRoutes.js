const express = require('express');
const Product = require('../models/product.js');
const cloudinary = require("../utils/cloudinay.js")
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();


// Create a product with image upload
router.post('/', authMiddleware, async (req, res) => {
    try {
      const { name, description, price, category,image } = req.body;
      let cloudinaryResponse = null;

      if (image) {
        cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
      }
      if (!req.user || !req.user.userId) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      
      const product = await Product.create({ name, description, price, image:cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",category});
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error creating product', error });
    }
  });

// Get all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

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
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
});

module.exports = router;