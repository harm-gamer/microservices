const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
 
  category: { type: String, required: true },
  image: {
    type: String,
    required: [true, "Image is required"],
  }
});

module.exports = mongoose.model('Product', ProductSchema);