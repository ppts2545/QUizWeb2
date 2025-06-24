
const mysqlConnection = require('../../config/database/connection.js');

exports.createRoomThumbnail = async (req, res) => {
    try {
        const [rooms] = await mysqlConnection.execute(
            'SELECT slug, thumbnail_url, title FROM rooms'
        );
        res.status(200).json(rooms);
    } catch (error) {
        console.error('Error fetching rooms:', error);
        res.status(500).json({ message: 'Failed to fetch rooms' });
    }
};