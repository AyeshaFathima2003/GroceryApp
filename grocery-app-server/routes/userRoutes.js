// routes/authRoutes.js
const express = require('express');

const router = express.Router();
const { signup,login,getUserProfile,logoutUser,updateUserProfile,addUserAddress,getUserAddresses,addToWishlist,removeFromWishlist,getWishlist,addToCart,updateCart,getCart} = require('../controller/userController');

const{verifyToken}=require('../utils/verifyToken');


// Signup route
router.post('/signup', signup);
router.post('/login',login)

router.get('/profile', getUserProfile);
router.post('/logout', logoutUser);
router.put('/update',updateUserProfile);
router.post('/address', addUserAddress);
router.get('/addresses', getUserAddresses);
router.post('/wishlist', addToWishlist);
router.delete('/wishlist', removeFromWishlist);
router.get('/wishlist',getWishlist);
router.post('/cartadd', addToCart);
router.put('/updatecart',updateCart);
router.get('/getcart', getCart);


module.exports = router;
