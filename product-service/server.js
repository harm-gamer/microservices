require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URI).then(() => console.log('Product Service Connected to DB'))
  .catch(err => console.log(err));

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Product Service running on port ${PORT}`));