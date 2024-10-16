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

  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

connectDB();
