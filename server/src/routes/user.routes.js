const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const SignupController = require('../controllers/google/Signup_Google_Controller');
const Login = require('./Login')

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many requests, please try again later.'
});

// User Signup  
router.post('/sendVerificationCode', limiter, SignupController.sendVerificationCode);
router.post('/verifyCode', SignupController.verifyCode);
router.post('/submitCreateAccount', SignupController.submitCreateAccount);

// User Login
router.post('/userLogin', limiter, Login.userLogin);

// Google Login
//router.post('/googleLogin', limiter, Login.googleLogin);


module.exports = router;