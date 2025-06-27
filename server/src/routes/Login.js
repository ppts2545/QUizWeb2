
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbConnection = require('../config/database/connection.js');

const Login = {
    // 1. User Login
    userLogin: async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        try {
            const mysqlConnection = await dbConnection.getMySQLConnection();
            const [rows] = await mysqlConnection.execute('SELECT * FROM users WHERE email = ?', [email]);
            if (rows.length === 0) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const user = rows[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Successful login
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                //after deploy need to set to secure === true
                maxAge: 3600000 // 1 hour
            }); 
            res.status(200).json({ message: 'Login successful', userId: user.id });
            
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = Login;