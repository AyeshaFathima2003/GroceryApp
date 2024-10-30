// controllers/authController.js
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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

 // Export only the necessary functions

module.exports = { signup, login, getUserProfile };


