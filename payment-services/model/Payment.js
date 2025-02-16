const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
  paymentMethod: { type: String, required: true },
  transactionId: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);