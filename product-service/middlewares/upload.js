const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinay');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'ecommerce_products', // Change the folder name as needed
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage });

module.exports = upload;
