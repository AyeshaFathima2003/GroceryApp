// Product.js
const mongoose = require('mongoose');

// Define Review Schema
const reviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String }
}, { timestamps: true });

// Define Product Schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, index: true },
    images: [{ type: String }],
    reviews: [reviewSchema]  // Nested Review Schema
}, { timestamps: true });

productSchema.index({ name: "text", category: "text" });  // Text index for search optimization

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
