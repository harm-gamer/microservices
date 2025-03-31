require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes.js');
const cartRoutes = require("./routes/cartRoutes.js")
const app = express();
app.use(express.json({ limit: '50mb' })); // Increase body limit
app.use(express.urlencoded({ extended: true ,limit : '50mb'}));
app.use(cors({
  origin: "*", 
  credentials: true,
})); // Allow requests from the API Gateway

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => console.log('User Service Connected to DB'))
  .catch(err => console.log(err));

  app.use((req, res, next) => {
    req.on('aborted', () => {
        console.warn("Request aborted by the client!");
    });
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api/user',cartRoutes)

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));
