const nodemailer = require('nodemailer');
const mysqlConnection = require('../../config/database/connection').getMySQLConnection();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { createUserIfNotExists } = require('../userActions')

// Temporary in-memory stores
const verificationCodes = {};
const verifiedEmails = new Set();
const verifiedTokens = {};

// Email Transporter Setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// 1. Send Verification Code
exports.sendVerificationCode = async (req, res) => {
    const { email } = req.body;

    if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    verificationCodes[email] = {
        code: verificationCode,
        expires: Date.now() + 5 * 60 * 1000
    };

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verification Code',
            text: `Your verification code is ${verificationCode}`
        });
        res.status(200).json({ message: 'Verification code sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send verification code' });
    }
};

// 2. Verify Code
exports.verifyCode = async (req, res) => {
    const { email, code } = req.body;
    const entry = verificationCodes[email];

    if (!entry || entry.code !== code || entry.expires <= Date.now()) {
        return res.status(400).json({ message: 'Invalid or expired verification code' });
    }

    delete verificationCodes[email];
    verifiedEmails.add(email);

    const token = crypto.randomBytes(16).toString('hex');
    verifiedTokens[token] = email;

    res.status(200).json({ message: 'Verification successful', token });
};

// 3. Create Account
exports.submitCreateAccount = async (req, res) => {
    const { username, password, token } = req.body;
    const email = verifiedTokens[token];

    if (!email) {
        return res.status(400).json({ message: 'Invalid or expired token' });
    }

    try {
       const hashedPassword = await bcrypt.hash(password, 10);
       await createUserIfNotExists({
            email,
            name: username,
            password: hashedPassword
       });
       res.status(200).json({ message: 'Account created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};