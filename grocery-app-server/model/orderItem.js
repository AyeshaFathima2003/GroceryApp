// OrderItem.js
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
}, { timestamps: true });

orderItemSchema.index({ orderId: 1 });  // Indexing orderId for faster access

const OrderItem = mongoose.model('OrderItem', orderItemSchema);
module.exports = OrderItem;
