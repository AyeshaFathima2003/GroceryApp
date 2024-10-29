import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import users from './data/user.js';
import addresses from './data/addressData.js';
import products from './data/productData.js';
import orders from './data/orderData.js';
import carts from './data/cartData.js';
import wishlists from './data/wishlistData.js';
import reviews from './data/reviewData.js';
import orderItems from './data/orderItemData.js';
import payments from './data/paymentData.js';


// Models
import User from './model/user.js';
import Address from './model/address.js';
import Product from './model/product.js';
import Order from './model/order.js';
import Cart from './model/cart.js';
import Wishlist from './model/wishlist.js';
import Review from './model/review.js';
import OrderItem from './model/orderItem.js';
import Payment from './model/payment.js';


dotenv.config();
const uri = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log(`MongoDB Connected`.cyan.underline))
  .catch(error => {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  });

// Insert Data Function
const importData = async () => {
  try {
    // Clear existing data in collections
    await User.deleteMany();
    await Address.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await Cart.deleteMany();
    await Wishlist.deleteMany();
    await Review.deleteMany();
    await OrderItem.deleteMany();
    await Payment.deleteMany();
    await Admin.deleteMany();

    // Insert new records
    await User.insertMany(users);
    await Address.insertMany(addresses);
    await Product.insertMany(products);
    await Order.insertMany(orders);
    await Cart.insertMany(carts);
    await Wishlist.insertMany(wishlists);
    await Review.insertMany(reviews);
    await OrderItem.insertMany(orderItems);
    await Payment.insertMany(payments);
    await Admin.insertMany(admins);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

// Delete Data Function
const destroyData = async () => {
  try {
    await User.deleteMany();
    await Address.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await Cart.deleteMany();
    await Wishlist.deleteMany();
    await Review.deleteMany();
    await OrderItem.deleteMany();
    await Payment.deleteMany();
    await Admin.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

// Run seeder script based on command
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
