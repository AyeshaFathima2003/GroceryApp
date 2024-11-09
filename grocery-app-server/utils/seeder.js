const mongoose = require('mongoose');
const User = require('../model/user');
const Product = require('../model/Product');
const Order = require('../model/Order');
const Payment = require('../model/Order'); // Fixed import for Payment model

const connectDb = require('../config/db');

const users = [
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '123-456-7890',
        addresses: [{
            street: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zip: '12345',
            country: 'USA'
        }],
        role: 'customer'
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        phone: '987-654-3210',
        role: 'seller'
    }
];

const products = [
    {
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 29.99,
        stock: 100,
        category: 'Electronics',
        images: ['image1.jpg', 'image2.jpg']
    },
    {
        name: 'Product 2',
        description: 'Description for Product 2',
        price: 49.99,
        stock: 50,
        category: 'Home',
        images: ['image3.jpg']
    }
];

const payments = [
    {
        amount: 29.99,
        status: 'completed',
        method: 'credit card'
    },
    {
        amount: 49.99,
        status: 'pending',
        method: 'paypal'
    }
];

const orders = [
    {
        items: [{ productId: null, quantity: 1, price: 29.99 }],
        totalAmount: 29.99,
        status: 'completed',
        paymentId: null // To be filled after payments are created
    },
    {
        items: [{ productId: null, quantity: 2, price: 49.99 }],
        totalAmount: 99.98,
        status: 'pending',
        paymentId: null // To be filled after payments are created
    }
];

// Seed function
const seedDatabase = async () => {
    try {
        // Connect to the database
        await connectDb();

        // Clear existing data
        await User.deleteMany({});
        await Product.deleteMany({});
        await Payment.deleteMany({});
        await Order.deleteMany({});

        // Create users
        const createdUsers = await User.insertMany(users);
        console.log('Users created:', createdUsers);

        // Create products
        const createdProducts = await Product.insertMany(products);
        console.log('Products created:', createdProducts);

        // Assign userId to payments
        payments[0].userId = createdUsers[0]._id; // Assigning payment to first user
        payments[1].userId = createdUsers[1]._id; // Assigning payment to second user

        // Create payments
        const createdPayments = await Payment.insertMany(payments);
        console.log('Payments created:', createdPayments);

        // Assign paymentId and productId to orders
        orders[0].userId = createdUsers[0]._id; // Assigning order to first user
        orders[0].paymentId = createdPayments[0]._id; // Assigning payment to order
        orders[0].items[0].productId = createdProducts[0]._id; // Assigning product to first order

        orders[1].userId = createdUsers[1]._id; // Assigning order to second user
        orders[1].paymentId = createdPayments[1]._id; // Assigning payment to order
        orders[1].items[0].productId = createdProducts[1]._id; // Assigning product to second order

        // Create orders
        const createdOrders = await Order.insertMany(orders);
        console.log('Orders created:', createdOrders);

        console.log('Database seeded successfully!');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        mongoose.connection.close(); // Close the connection after seeding
    }
};

// Run the seed function
seedDatabase();
