// Cart.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, default: 1 }
    }]
}, { timestamps: true });

cartSchema.index({ userId: 1 });  // Indexing userId for faster access

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
