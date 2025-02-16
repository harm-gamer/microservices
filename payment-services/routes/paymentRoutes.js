const express = require('express');
const Stripe = require('stripe');
const Payment = require('../models/Payment');
require('dotenv').config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-payment', async (req, res) => {
    try {
      const { amount, orderId, userId, paymentMethodId } = req.body;
  
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Convert to cents
        currency: 'usd',
        payment_method: paymentMethodId,
        confirm: true
      });
  
      const payment = new Payment({
        orderId,
        userId,
        amount,
        status: 'Completed',
        paymentMethod: 'Stripe',
        transactionId: paymentIntent.id
      });
      await payment.save();
  
      // Notify Order Service that payment was successful
      await axios.patch(`${process.env.ORDER_SERVICE_URL}/api/orders/update-status/${orderId}`, {
        status: 'Paid',
        paymentId: payment._id
      });
  
      res.json({ success: true, message: 'Payment Successful', payment });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
 
    