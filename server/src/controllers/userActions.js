const { connectMongoDB, connectMySQL } = require('../config/database/connection.js');

exports.createUserIfNotExists = async({email, name, password}) => {
    const [row] = await connectMySQL.query('SELECT * FROM users WHERE email = ?', [email]);

    if(row.length === 0){
        await connectMySQL.query(
            'INSERT INTO users (email, name, password) VALUES (?, ?, ?)',
            [email, name, password]
        );
    } else if (googleId && !row[0].googleId){
        await connectMySQL.query('UPDATE users SET google_id = ? WHERE email = ?', [googleId, email]);
    }
}