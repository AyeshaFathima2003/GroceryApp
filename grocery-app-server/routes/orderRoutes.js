const express = require('express');

const router = express.Router();
const { placeOrder, getUserOrders, getOrderDetails } = require('../controller/orderController');

router.post('/placeOrder', placeOrder);
router.get('/userOrders', getUserOrders);
router.get('/orderDetails',  getOrderDetails);

module.exports = router;