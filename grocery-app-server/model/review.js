// Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String }
}, { timestamps: true });

reviewSchema.index({ productId: 1, userId: 1 });  // Composite index for product and user lookup

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
