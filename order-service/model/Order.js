const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [{ productId: String, quantity: Number }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
  paymentId: { type: String } // Track payment ID
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
