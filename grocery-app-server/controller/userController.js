// controllers/authController.js
const User = require('../model/user');
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

module.exports = { verifyTokenAPI, addToWishlist, getUserAddresses, addUserAddress, signup, login, getUserProfile, logoutUser, updateUserProfile };




 


