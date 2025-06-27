const slugify = require('slugify');
const Room = require('../../models/Room');

exports.createRoom = async (req, res) => {
    try {
        console.log('Request body:', req.body); // Add logging to debug
        
        // Check if req.body exists
        if (!req.body) {
            return res.status(400).json({ message: 'Request body is empty' });
        }
        
        // Parse boolean from string with fallback
        const isPublic = req.body.isPublic ? req.body.isPublic === 'true' : true;
        
        const title = req.body.title || '';
        const description = req.body.description || '';
        const tags = req.body.tags || '';
        const maxPlayers = req.body.maxPlayers || 10;
        const password = req.body.password || null;
        const color = req.body.color || '#ffffff';
        
        // Generate slug from title
        const slug = slugify(title, { lower: true, strict: true });
        
        // Get user ID from auth middleware
        const userId = req.user.userId;
        
        // Create room with basic properties
        const roomData = {
            title,
            slug,
            description,
            tags: tags.split(',').map(tag => tag.trim()),
            maxPlayers: parseInt(maxPlayers) || 10,
            isPublic: isPublic,
            color: color || '#ffffff',
            creatorId: userId.toString()
        };
        
        // Only add password if the room is private and password is provided
        if (!isPublic && password) {
            roomData.password = password;
        }
        
        // Handle thumbnail if present
        if (req.file) {
            roomData.thumbnail = `/uploads/${req.file.filename}`;
        }
        
        const newRoom = new Room(roomData);
        await newRoom.save();
        
        res.status(201).json(newRoom);
    } catch (err) {
        console.error('Error creating room:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};