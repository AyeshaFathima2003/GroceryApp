<<<<<<< HEAD
const { MongoClient } = require('mongodb');

// Connection URL
const uri = process.env.MONGO_URI;

// Create a new MongoClient
const client = new MongoClient(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const connectDB = async () => {
  try {
    // Connect the client to the server
    await client.connect();
    
    console.log(`MongoDB Connected: ${client.s.options.servers[0].host}`.cyan.underline);
    
    // You can optionally return the database instance
    // const db = client.db('your-database-name');
    // return db;

=======
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
>>>>>>> gibss
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

<<<<<<< HEAD
connectDB();
=======
module.exports = connectDB;
>>>>>>> gibss
