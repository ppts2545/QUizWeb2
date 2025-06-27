const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  //Room ID
  roomId: {
    type: String,
    unique: true,
    default: () => Math.random().toString(36).substring(2, 10).toUpperCase()
  },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  tags: { type: [String], default: [] },
  maxPlayers: { type: Number, default: 10 },
  isPublic: { type: Boolean, default: true },
  color: { type: String, default: '#ffffff' },
  password: { type: String, default: null },
  thumbnail: { type: String, default: null },
  
  // Add creator field as a String to store MySQL user ID
  creatorId: { 
    type: String,  // String to store MySQL integer ID
    required: true 
  },
  
  // Timestamps
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;