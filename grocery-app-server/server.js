// server.js
const express = require('express');

const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');

// Connect to MongoDB
const connectDB = require('./config/db');
connectDB();

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());


// Routes
app.use('/api/user', userRoutes);

//app.use('/api/user', userRoutes);

// Define a home route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






