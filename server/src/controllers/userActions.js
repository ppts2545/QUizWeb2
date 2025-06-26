const dbConnection = require('../config/database/connection.js');

exports.createUserIfNotExists = async({email, name, password, googleId}) => {
    // Get connection by awaiting the promise
    const mysqlConnection = await dbConnection.getMySQLConnection();
    
    const [row] = await mysqlConnection.execute('SELECT * FROM users WHERE email = ?', [email]);

    if(row.length === 0){
        await mysqlConnection.execute(
            'INSERT INTO users (email, username, password) VALUES (?, ?, ?)',
            [email, name, password]
        );
    } else if (googleId && !row[0].googleId){
        await mysqlConnection.execute('UPDATE users SET google_id = ? WHERE email = ?', [googleId, email]);
    }
}