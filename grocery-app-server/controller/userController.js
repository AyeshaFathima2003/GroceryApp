// controllers/authController.js
const User = require('../model/user');
const Product = require('../model/Product');
const Order = require('../model/Order');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const{verifyToken}=require('../middleware/verifyToken');


const signup = async (req, res) => {
    try {
        const { name, email, password, phone, addresses, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            addresses,
            role
        });

        await newUser.save();

        // Generate a token for the user (optional)
        const token = jwt.sign({ userId: newUser._id, role: newUser.role }, 'your_jwt_secret_key', {
            expiresIn: '1h'
        });

        res.status(201).json({ message: 'User created successfully', token, user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error during signup', error });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate a token for the user
        const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret_key', {
            expiresIn: '1h'
        });

        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        res.status(500).json({ message: 'Error during login', error });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const userId = req.query.id; // Get userId from the request object

        // Find the user by ID
        const user = await User.findById(userId).select('-password'); // Exclude password from the response
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user profile', error });
    }
};


const logoutUser = async (req, res) => {
    try {
        // Invalidate the token on the client-side by clearing it from storage.
        // This response is for the client to clear their JWT token.
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error during logout', error });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const userId = req.body.userId; // User ID from the JWT payload (authenticated user)
        const { name, email, phone, addresses } = req.body;

        console.log('User ID:', userId);
        console.log('Update Data:', { name, email, phone, addresses });

        // Find user by ID and update profile fields
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email, phone, addresses },
            { new: true, runValidators: true } // Returns updated document & validates
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Update Profile Error:', error);
        res.status(500).json({ message: 'Error updating profile', error: error.message || error });
    }
};


// Controller function to add an address to a user's profile
const addUserAddress = async (req, res) => {
    try {
        const userId = req.body.userId; // Get the userId from JWT payload
        const { street, city, state, zip, country } = req.body;

        // Find the user and push the new address into the addresses array
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $push: {
                    addresses: { street, city, state, zip, country }
                }
            },
            { new: true, runValidators: true } // Return updated document & validate schema
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Address added successfully', user: updatedUser });
    } catch (error) {
        console.error('Add Address Error:', error);
        res.status(500).json({ message: 'Error adding address', error: error.message || error });
    }
};

const getUserAddresses = async (req, res) => {
    try {
        const userId = req.query.userId; // Extract userId from JWT payload
        console.log('User ID:', userId);
        // Find the user by ID and select only the addresses field
        const user = await User.findById(userId).select('addresses');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ addresses: user.addresses });
    } catch (error) {
        console.error('Get Addresses Error:', error);
        res.status(500).json({ message: 'Error fetching addresses', error: error.message || error });
    }
};

const addToWishlist = async (req, res) => {
    try {
        console.log('User:', req.user);
        const userId = req.user.userId; // Get the userId from the JWT payload
        const { productId } = req.body;

        // Update the user's wishlist to add the product if it's not already there
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { 'wishlist.products': productId } }, // Only add if it doesn't exist
            { new: true }
        ).select('wishlist');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Product added to wishlist', wishlist: updatedUser.wishlist });
    } catch (error) {
        console.error('Add to Wishlist Error:', error);
        res.status(500).json({ message: 'Error adding to wishlist', error: error.message || error });
    }
};

const verifyTokenAPI = async (req, res) => {
    try {
        res.status(200).json({ message: 'Token is valid' , user: req.user });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying token', error });
    }
}

const removeFromWishlist = async (req, res) => {
    try {
        const userId = req.user.userId; // Get the userId from the JWT payload
        const { productId } = req.body;

        // Update the user's wishlist to remove the product if it exists
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { 'wishlist.products': productId } }, // Remove the specified product
            { new: true }
        ).select('wishlist');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Product removed from wishlist', wishlist: updatedUser.wishlist });
    } catch (error) {
        console.error('Remove from Wishlist Error:', error);
        res.status(500).json({ message: 'Error removing from wishlist', error: error.message || error });
    }
};

const getWishlist = async (req, res) => {
    try {
        console.log('User:', req.user);
        const userId = req.user.userId; // Assuming userId is set in the authentication middleware
        
        // Find the user and populate wishlist products
        const user = await User.findById(userId).populate('wishlist.products');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Wishlist retrieved successfully', wishlist: user.wishlist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving wishlist', error });
    }
};




// Controller to add item to cart
const addToCart = async (req, res) => {
    try {
        const userId = req.user.userId; // User ID from JWT payload
        const { productId, quantity } = req.body;

        // Validate product existence
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find user
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user has an existing cart
        if (!user.cart) {
            // If there's no cart, create one and add the item
            user.cart = {
                items: [{ productId, quantity }]
            };
        } else {
            // If a cart exists, check if the product is already in the cart
            const cartItem = user.cart.items.find(item => item.productId.toString() === productId);

            if (cartItem) {
                // If the product exists in the cart, increase quantity
                cartItem.quantity += quantity;
            } else {
                // If not, add a new item to the cart
                user.cart.items.push({ productId, quantity });
            }
        }

        // Save the updated user document
        await user.save();

        res.status(200).json({ message: 'Product added to cart successfully', cart: user.cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding product to cart', error });
    }
};



// Controller to update cart item quantity
const updateCart = async (req, res) => {
    try {
        const userId = req.body.userId; // User ID from JWT payload
        const { productId, quantity } = req.body;

        // Validate the quantity to ensure it's a valid number
        if (quantity <= 0) {
            return res.status(400).json({ message: 'Quantity must be greater than 0' });
        }

        // Validate product existence
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find user
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user has a cart
        if (!user.cart) {
            return res.status(400).json({ message: 'No cart found for the user' });
        }

        // Find the cart item and update its quantity
        const cartItem = user.cart.items.find(item => item.productId.toString() === productId);

        if (cartItem) {
            // If the product is already in the cart, update the quantity
            cartItem.quantity = quantity;
        } else {
            // If the product is not in the cart, add it
            user.cart.items.push({ productId, quantity });
        }

        // Save the updated user document
        await user.save();

        res.status(200).json({ message: 'Cart updated successfully', cart: user.cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating cart', error });
    }
};

const getCart = async (req, res) => {
    try {
        const userId = req.user.userId; // User ID from JWT payload

        // Find the user and populate product details in the cart
        const user = await User.findById(userId).populate({
            path: 'cart.items.productId',
            model: 'Product', // Adjust if product model has a different name
            select: 'name price description' // Specify fields to include
        });

        if (!user || !user.cart || !user.cart.items.length) {
            return res.status(404).json({ message: 'Cart is empty' });
        }

        res.status(200).json({ cart: user.cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving cart', error });
    }
};

const removeCartItem = async (req, res) => {
    try {
        const userId = req.user.userId; // Get the user ID from JWT payload
        const { productId } = req.body; // Get the product ID to remove from the request body

        // Find the user and their cart
        const user = await User.findById(userId);

        if (!user || !user.cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Check if the product exists in the cart
        const cartItemIndex = user.cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (cartItemIndex === -1) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        // Remove the item from the cart
        user.cart.items.splice(cartItemIndex, 1);

        // Save the updated cart
        await user.save();

        res.status(200).json({ message: 'Product removed from cart', cart: user.cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error removing product from cart', error });
    }
};




 // Adjust the path if necessary
const placeOrder = async (req, res) => {
    try {
        const userId = req.body.userId; // Extract userId from JWT payload

        // Find the user and populate product details in the cart
        const user = await User.findById(userId).populate('cart.items.productId');

        if (!user || !user.cart || !user.cart.items.length) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Calculate total amount
        let totalAmount = 0;
        const orderItems = user.cart.items.map((item) => {
            totalAmount += item.productId.price * item.quantity;
            return {
                productId: item.productId._id,
                quantity: item.quantity,
                price: item.productId.price,
            };
        });

        // Create new order
        const newOrder = new Order({
            userId,
            items: orderItems,
            totalAmount,
            status: 'pending',  // Default status
        });

        await newOrder.save();

        // Clear the user's cart
        user.cart.items = [];
        await user.save();

        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error placing order', error });
    }
};

const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.userId; // Extract userId from JWT payload

        // Find all orders for the user
        const orders = await Order.find({ userId }).populate('items.productId'); // Populating to show product details

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        res.status(200).json({ message: 'Orders retrieved successfully', orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving orders', error });
    }
};



module.exports = {verifyTokenAPI,  getUserOrders,getWishlist, removeFromWishlist, addToWishlist, getUserAddresses, addUserAddress, signup, login, getUserProfile, logoutUser, updateUserProfile ,addToCart,updateCart,getCart,placeOrder,removeCartItem};







 


