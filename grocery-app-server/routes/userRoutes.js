// routes/authRoutes.js
const express = require('express');

const router = express.Router();
const { signup,login,getUserProfile} = require('../controller/userController');

const{verifyToken}=require('../utils/verifyToken');

// Signup route
router.post('/signup', signup);
router.post('/login',login)

router.get('/profile', getUserProfile);
module.exports = router;
