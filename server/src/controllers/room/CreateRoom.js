const slugify = require('slugify');
const Room = require('../../models/Room'); // Fixed: correct path to the model

exports.createRoom = async (req, res) => {
    try {
        const { title, description, tags, maxPlayers, isPublic, password, color } = req.body;
        const slug = slugify(title, { lower: true, strict: true });
        
        const newRoom = new Room({
            title,
            slug,
            description,
            tags: tags.split(',').map(tag => tag.trim()), // Convert comma-separated string to array
            maxPlayers: maxPlayers || 10,
            isPublic: isPublic !== false, // Default to true
            password,
            color: color || '#ffffff',
            creator: req.user.userId // Get user ID from the auth middleware
        });

        await newRoom.save();
        res.status(201).json(newRoom);
    } catch (err) {
        console.error('Error creating room:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};