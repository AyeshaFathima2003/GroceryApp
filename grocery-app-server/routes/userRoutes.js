// routes/authRoutes.js
const express = require('express');

const router = express.Router();

const {verifyToken} = require('../middleware/verifyToken');
const {verifyTokenAPI,signup,removeCartItem,login,getUserProfile,logoutUser,updateUserProfile,addUserAddress,getUserAddresses,addToWishlist,removeFromWishlist,getWishlist,addToCart,updateCart,getCart,placeOrder,getUserOrders} = require('../controller/userController');

// Signup route
router.post('/signup', signup);
router.post('/login',login)
router.get('/profile', getUserProfile);
router.post('/logout', logoutUser);
router.put('/update',updateUserProfile);
router.post('/address', addUserAddress);
router.get('/addresses', getUserAddresses);
router.post('/wishlist', verifyToken, addToWishlist);
router.delete('/wishlist',verifyToken, removeFromWishlist);
router.get('/wishlist', verifyToken ,getWishlist);
router.post('/cartadd',verifyToken, addToCart);
router.get('/getcart',verifyToken, getCart);
router.delete('/removecart',verifyToken, removeCartItem);


router.get('/verify',verifyToken, verifyTokenAPI);

module.exports = router;
