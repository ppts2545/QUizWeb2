const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();

// Import routes
const UserRoute = require('./routes/user.routes');
const RoomRoute = require('./routes/room.routes');

const { connectMongoDB, connectMySQL } = require('./config/database/connection.js');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Connect to databases
connectMongoDB();
connectMySQL();

// Middleware to parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Your React app's URL
  credentials: true // Important for cookies
}));

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.use('/api/user', UserRoute);

app.use('/api/room', RoomRoute);
// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
