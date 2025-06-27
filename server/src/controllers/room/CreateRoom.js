const slugify = require('slugify');
const Room = require('../models/Room'); // Make sure to import your Room model

exports.createRoom = async (req, res) => {
    try {
        const { title, description, tags, maxPlayers, isPublic, password, color } = req.body;
        const slug = slugify(title, { lower: true, strict: true });
        
        const newRoom = new Room({
            title,
            slug,
            description,
            tags,
            maxPlayers,
            isPublic,
            password,
            color,
            creator: req.user.userId // Get user ID from the auth middleware
        });

        await newRoom.save();
        res.status(201).json(newRoom);
    } catch (err) {
        console.error('Error creating room:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
