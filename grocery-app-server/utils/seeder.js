const mongoose = require('mongoose');
const User = require('../model/user');
const Product = require('../model/Product');
const Order = require('../model/Order');
const Payment = require('../model/Order'); // Fixed import for Payment model

const connectDb = require('../config/db');

// Updated user data
const users = [
    {
        name: 'Root User',
        email: 'root@example.com',
        password: 'root@123',
        phone: '123-456-7890',
        addresses: [{
            street: '123 Admin Lane',
            city: 'Admin City',
            state: 'CA',
            zip: '90001',
            country: 'USA'
        }],
        role: 'admin'
    },
    {
        name: 'Customer User',
        email: 'customer@example.com',
        password: 'customer@123',
        phone: '987-654-3210',
        addresses: [{
            street: '456 Customer Street',
            city: 'Customer Town',
            state: 'TX',
            zip: '75001',
            country: 'USA'
        }],
        role: 'customer'
    }
];

// Updated product data
const products = [
    {
        name: 'Apple - Red (1kg)',
        description: 'Fresh, juicy red apples sourced directly from farms.',
        price: 3.99,
        stock: 150,
        category: 'Fruits',
        images: ['apple.jpg']
    },
    {
        name: 'Whole Wheat Bread (500g)',
        description: 'Soft and fresh whole wheat bread, perfect for a healthy diet.',
        price: 2.49,
        stock: 200,
        category: 'Bakery',
        images: ['bread.jpg']
    },
    {
        name: 'Milk - Full Cream (1L)',
        description: 'Fresh and creamy milk sourced from local dairies.',
        price: 1.99,
        stock: 300,
        category: 'Dairy',
        images: ['milk.jpg']
    },
    {
        name: 'Rice - Basmati (5kg)',
        description: 'Premium quality basmati rice for delicious meals.',
        price: 14.99,
        stock: 100,
        category: 'Grains',
        images: ['rice.jpg']
    }
];

// Updated payment data
const payments = [
    {
        amount: 10.99,
        status: 'completed',
        method: 'credit card'
    },
    {
        amount: 14.99,
        status: 'pending',
        method: 'paypal'
    }
];

// Updated orders data
const orders = [
    {
        items: [{ productId: null, quantity: 2, price: 3.99 }], // Placeholder for productId
        totalAmount: 7.98,
        status: 'completed',
        paymentId: null // Placeholder for paymentId
    },
    {
        items: [{ productId: null, quantity: 1, price: 14.99 }], // Placeholder for productId
        totalAmount: 14.99,
        status: 'pending',
        paymentId: null // Placeholder for paymentId
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
        payments[0].userId = createdUsers[0]._id; // Assigning payment to admin user
        payments[1].userId = createdUsers[1]._id; // Assigning payment to customer user

        // Create payments
        const createdPayments = await Payment.insertMany(payments);
        console.log('Payments created:', createdPayments);

        // Assign paymentId and productId to orders
        orders[0].userId = createdUsers[1]._id; // Assigning order to customer user
        orders[0].paymentId = createdPayments[0]._id; // Assigning payment to order
        orders[0].items[0].productId = createdProducts[0]._id; // Assigning product to order

        orders[1].userId = createdUsers[1]._id; // Assigning order to customer user
        orders[1].paymentId = createdPayments[1]._id; // Assigning payment to order
        orders[1].items[0].productId = createdProducts[3]._id; // Assigning product to order

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