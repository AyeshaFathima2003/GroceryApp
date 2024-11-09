const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Get all products
router.get('/', productController.getAllProducts);

// Get product by ID
router.get('/:id', productController.getProductById);

// Create a new product (admin or store owner only)
router.post('/', productController.createProduct);

// Update a product by ID (admin or store owner only)
router.put('/:id', productController.updateProduct);

// Delete a product by ID (admin or store owner only)
router.delete('/:id', productController.deleteProduct);

// Search products by name or category
router.get('/search', productController.searchProducts);

// Filter products by category, price range, or in stock
router.post('/filter', productController.filterProducts);

// Add a review to a product
router.post('/:id/review', productController.addProductReview);

// Get all reviews for a specific product
router.get('/:id/reviews', productController.getProductReviews);

// Get top-rated products based on reviews
router.get('/top-rated', productController.getTopRatedProducts);

module.exports = router;
