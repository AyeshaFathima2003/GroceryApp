// OrderItem.js
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
}, { timestamps: true });

orderItemSchema.index({ productId: 1 });  // Indexing productId for faster access

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = OrderItem;

// Payment.js
const paymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    method: { type: String, required: true }
}, { timestamps: true });

paymentSchema.index({ userId: 1, status: 1 });  // Composite index for user and payment status

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;

// Order.js
const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],  // Nested OrderItem Schema
    totalAmount: { type: Number, required: false },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
    paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }
}, { timestamps: true });

orderSchema.index({ userId: 1, status: 1 });  // Composite index for filtering

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
