// routes/authRoutes.js
const express = require('express');

const router = express.Router();
const { signup,login,getUserProfile,logoutUser,updateUserProfile} = require('../controller/userController');

const{verifyToken}=require('../utils/verifyToken');

// Signup route
router.post('/signup', signup);
router.post('/login',login)

router.get('/profile', getUserProfile);
router.post('/logout', logoutUser);
router.put('/update',updateUserProfile)
module.exports = router;
