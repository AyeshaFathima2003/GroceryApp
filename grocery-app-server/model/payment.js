// Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    method: { type: String, required: true }
}, { timestamps: true });

paymentSchema.index({ userId: 1, status: 1 });  // Composite index for user and payment status

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
