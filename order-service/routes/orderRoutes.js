const express = require('express');
const axios = require('axios');
const Order = require('../models/Order');
require('dotenv').config();

const router = express.Router();

router.post('/create-order', async (req, res) => {
  try {
    const { userId, products, totalAmount, paymentMethodId } = req.body;

    // Create a new order with 'Pending' status
    const newOrder = new Order({ userId, products, totalAmount, status: 'Pending' });
    await newOrder.save();

    // Call Payment Service
    const paymentResponse = await axios.post(`${process.env.PAYMENT_SERVICE_URL}/api/payments/create-payment`, {
      amount: totalAmount,
      orderId: newOrder._id,
      userId,
      paymentMethodId
    });

    if (paymentResponse.data.success) {
      // Update order status to 'Paid'
      newOrder.status = 'Paid';
      newOrder.paymentId = paymentResponse.data.payment._id;
      await newOrder.save();

      return res.json({ success: true, message: 'Order Placed & Payment Successful', order: newOrder });
    } else {
      return res.status(400).json({ success: false, message: 'Payment Failed' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});
router.patch('/update-status/:orderId', async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status, paymentId } = req.body;
  
      const order = await Order.findById(orderId);
      if (!order) return res.status(404).json({ success: false, message: 'Order Not Found' });
  
      order.status = status;
      order.paymentId = paymentId;
      await order.save();
  
      return res.json({ success: true, message: 'Order Status Updated', order });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  });

module.exports = router;
