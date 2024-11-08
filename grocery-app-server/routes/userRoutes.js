// routes/authRoutes.js
const express = require('express');

const router = express.Router();
const { signup,login,getUserProfile,logoutUser,updateUserProfile,addUserAddress,getUserAddresses, addToWishlist, verifyTokenAPI} = require('../controller/userController');
const {verifyToken} = require('../middleware/verifyToken');
// Signup route
router.post('/signup', signup);
router.post('/login',login)

router.get('/profile', getUserProfile);
router.post('/logout', logoutUser);
router.put('/update',updateUserProfile);
router.post('/address', addUserAddress);
router.get('/addresses', getUserAddresses);
router.post('/wishlist', addToWishlist);

router.get('/verify',verifyToken, verifyTokenAPI);

module.exports = router;
