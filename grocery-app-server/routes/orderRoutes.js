const express = require('express');

const router = express.Router();
const { placeOrder, getUserOrders, getOrderDetails,createOrder,updateOrderStatus } = require('../controller/orderController');
const { verifyToken } = require('../middleware/verifyToken');

router.post('/placeOrder', placeOrder);
router.get('/userOrders', getUserOrders);
router.get('/orderDetails',  getOrderDetails);
router.post('/createOrder', verifyToken, createOrder);
router.put('/createOrder', updateOrderStatus);

module.exports = router;