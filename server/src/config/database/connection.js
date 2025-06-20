
// MongoDB connection
const mongoose = require('mongoose');

async function connectMongoDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/QuizWeb_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  }
}

// MySQL connection
const mysql = require('mysql2');
let mysqlConnection;
async function connectMySQL() {
  try {
    mysqlConnection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || 'SudoPo13166m',
      database: process.env.MYSQL_DB || 'QuizWeb_db',
    });
    console.log('✅ MySQL connected');
  } catch (err) {
    console.error('MySQL connection error:', err);
  }
}
connectMongoDB();
connectMySQL();

module.exports = {
    connectMongoDB,
    connectMySQL,
    getMySQLConnection: () => mysqlConnection
}