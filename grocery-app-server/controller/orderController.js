const User = require('../model/user');
const Product = require('../model/Product');
const Order = require('../model/Order');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const placeOrder = async (req, res) => {
    try {
        const userId = req.body.userId; // Extract userId from JWT payload

        // Find the user and populate product details in the cart
        const user = await User.findById(userId).populate('cart.items.productId');

        if (!user || !user.cart || !user.cart.items.length) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Calculate total amount
        let totalAmount = 0;
        const orderItems = user.cart.items.map((item) => {
            totalAmount += item.productId.price * item.quantity;
            return {
                productId: item.productId._id,
                quantity: item.quantity,
                price: item.productId.price,
            };
        });

        // Create new order
        const newOrder = new Order({
            userId,
            items: orderItems,
            totalAmount,
            status: 'pending',  // Default status
        });

        await newOrder.save();

        // Clear the user's cart
        user.cart.items = [];
        await user.save();

        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error placing order', error });
    }
};

const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.userId; // Extract userId from JWT payload

        // Find all orders for the user
        const orders = await Order.find({ userId }).populate('items.productId'); // Populating to show product details

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        res.status(200).json({ message: 'Orders retrieved successfully', orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving orders', error });
    }
};

 // Ensure the Order model path is correct

const getOrderDetails = async (req, res) => {
    try {
        const orderId = req.query.orderId; // Get order ID from request parameters

        // Find the order by ID and populate the product details in each item
        const order = await Order.findById(orderId).populate('items.productId');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order details retrieved successfully', order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving order details', error });
    }
};

const createOrder = async (req, res) => {
    try {
        const userId = req.user.userId; // Get the user ID from JWT payload

        // Fetch the user's cart
        const cart = await Cart.findOne({ userId }).populate('items.productId');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Your cart is empty' });
        }

        // Calculate the total amount for the order
        let totalAmount = 0;
        cart.items.forEach(item => {
            totalAmount += item.productId.price * item.quantity;
        });

        // Create an order
        const newOrder = new Order({
            userId,
            items: cart.items.map(item => ({
                productId: item.productId._id,
                quantity: item.quantity,
                price: item.productId.price
            })),
            totalAmount,
            status: 'pending', // Default status
        });

        await newOrder.save();

        // Clear the cart after placing the order
        cart.items = [];
        await cart.save();

        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error placing order', error });
    }
};
module.exports = { getUserOrders, getOrderDetails, placeOrder, createOrder };







 



