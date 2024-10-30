const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');

// Load environment variables from .env file

dotenv.config();

const connectDB = async () => {
  try {
    // Check if MONGO_URI is defined
    const uri = process.env.MONGO_URI; 
    if (!uri) {
      throw new Error('MONGO_URI is not defined in the .env file');
    }

    await mongoose.connect(uri, { serverSelectionTimeoutMS: 30000 });
    console.log(`MongoDB Connected`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

module.exports = connectDB;