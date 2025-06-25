const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const SignupController = require('../controllers/google/Signup_Google_Controller');
const LoginController = require('../controllers/google/Google_OneTapLogin_Controller');

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
//router.post('/userLogin', limiter, LoginController.userLogin);

// Google Login
router.post('/googleLogin', limiter, LoginController.googleLogin);


module.exports = router;