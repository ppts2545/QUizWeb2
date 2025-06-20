const { connectMongoDB, connectMySQL } = require('./config/database/connection.js');

exports.createUserIfNotExists = async({email, name, googleId, picture}) => {
    const [row] = await connectMySQL.query('SELECT * FROM users WHERE email = ?', [email]);

    if(row.length === 0){
        await connectMySQL.query(
            'INSERT INTO users (email, name, google_id, picture) VALUES (?, ?, ?, ?)',
            [email, name, googleId || null, picture || null]
        );
    } else if (!row[0].googleId){
        await db.query('UPDATE users SET google_id = ? WHERE email = ?', [googleId, email]);
    }
}