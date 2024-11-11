// controllers/productController.js

const Product = require('../model/Product');
const {verifyToken} = require('../middleware/verifyToken');

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error });
    }
};

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId).populate('reviews.userId', 'name');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product', error });
    }
};

// Create a new product
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, imageUrl } = req.body;

        // Create a new product instance
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            stock,
            imageUrl,
        });

        // Save the product to the database
        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};

// Update product details
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, description, price, category, stock, imageUrl } = req.body;

        // Find the product by ID and update it
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { name, description, price, category, stock, imageUrl },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        // Find the product by ID and delete it
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};

// Search products by name and category
const searchProducts = async (req, res) => {
    try {
        const query = req.query.q; // Search query from query params
        const products = await Product.find({ $text: { $search: query } });
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: 'Error searching products', error });
    }
};

// Filter products by category, price range, or stock availability
const filterProducts = async (req, res) => {
    try {
        const { category, minPrice, maxPrice, inStock } = req.body;
        const filterCriteria = {
            ...(category && { category }),
            ...(minPrice && maxPrice && { price: { $gte: minPrice, $lte: maxPrice } }),
            ...(inStock !== undefined && { stock: { $gt: 0 } }), // Optional filter for in-stock products
        };

        const products = await Product.find(filterCriteria);
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: 'Error filtering products', error });
    }
};

// Add a product review
const addProductReview = async (req, res) => {
    try {
        const productId = req.params.id;
        const { userId, rating, comment } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Add review to the product
        const review = {
            userId,
            rating,
            comment,
            date: new Date(),
        };
        product.reviews.push(review);
        await product.save();

        res.status(200).json({ message: 'Review added successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error adding review', error });
    }
};

// Get product reviews
const getProductReviews = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId).populate('reviews.userId', 'name email');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ reviews: product.reviews });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving reviews', error });
    }
};

// Get the most popular products based on review ratings (Optional)
const getTopRatedProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            { $unwind: "$reviews" },
            { $group: { _id: "$_id", avgRating: { $avg: "$reviews.rating" }, product: { $first: "$$ROOT" } } },
            { $sort: { avgRating: -1 } },
            { $limit: 10 }
        ]);
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving top-rated products', error });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    filterProducts,
    addProductReview,
    getProductReviews,
    getTopRatedProducts,
};
