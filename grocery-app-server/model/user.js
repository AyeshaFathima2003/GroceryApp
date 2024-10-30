// User.js
const mongoose = require('mongoose');

// Define Address Schema
const addressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true }
}, { timestamps: true });

// Define Cart Item Schema
const cartItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 }
});

// Define Cart Schema
const cartSchema = new mongoose.Schema({
    items: [cartItemSchema]
}, { timestamps: true });

// Define Wishlist Schema
const wishlistSchema = new mongoose.Schema({
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
}, { timestamps: true });

// Define User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    addresses: [addressSchema], // Nested Address Schema
    cart: cartSchema, // Nested Cart Schema
    wishlist: wishlistSchema, // Nested Wishlist Schema
    role: { type: String, enum: ['customer', 'seller', 'admin'], default: 'customer' }
}, { timestamps: true });

userSchema.index({ email: 1 });  // Indexing email for faster lookup

const User = mongoose.model('User', userSchema);

module.exports = User;
