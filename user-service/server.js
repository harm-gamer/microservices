require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes.js');
const cartRoutes = require("./routes/cartRoutes.js")
const app = express();
app.use(express.json({ limit: '10mb' })); // Increase body limit
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => console.log('User Service Connected to DB'))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/user',cartRoutes)

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));
