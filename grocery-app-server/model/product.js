// Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, index: true },
    images: [{ type: String }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
}, { timestamps: true });

productSchema.index({ name: "text", category: "text" });  // Text index for search optimization

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
