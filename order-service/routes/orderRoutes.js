const express = require('express');
const Order = require('../models/Order');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Create an order (Protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { userId, products, totalAmount } = req.body;
    const order = await Order.create({ userId, products, totalAmount });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
});

module.exports = router;