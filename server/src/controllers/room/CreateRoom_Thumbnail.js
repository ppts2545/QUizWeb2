const mongoose = require('mongoose');
const Room = require('../../models/Room');

//Fetch all rooms with their thumbnails
exports.createRoomThumbnail = async (req, res) => {
    try {
        const rooms = await Room.find({}, 'title slug description tags maxPlayers isPublic color thumbnail')
            .sort({ createdAt: -1 }) // Sort by creation date, most recent first
            .lean(); // Use lean to get plain JavaScript objects instead of Mongoose documents
            
        res.status(200).json(rooms);
    } catch (error) {
        console.error('Error fetching rooms:', error);
        res.status(500).json({ message: 'Failed to fetch rooms' });
    }
};
