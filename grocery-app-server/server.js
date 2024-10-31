// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
connectDB();

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/user', userRoutes);

app.use(cors({
    origin: 'http://localhost:4200', // Replace with the URL of your frontend
    methods: ['GET', 'POST'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow specific headers
  }));

app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






