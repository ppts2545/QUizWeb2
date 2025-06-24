
const mysqlConnection = require('../../config/database/connection.js');

//Fetch all rooms with their thumbnails
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

//Create a new room with title, slug, and thumbnail_url
exports.createRoom = async (req, res) => {
    const { title, slug, thumbnail_url } = req.body;

    if (!title || !slug || !thumbnail_url) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        await mysqlConnection.execute(
            'INSERT INTO rooms (title, slug, thumbnail_url) VALUES (?, ?, ?)',
            [title, slug, thumbnail_url]
        );
        res.status(201).json({ message: 'Room created successfully' });
    } catch (error) {
        console.error('Error creating room:', error);
        res.status(500).json({ message: 'Failed to create room' });
    }
};