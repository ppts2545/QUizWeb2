
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  tags: { type: [String], default: [] },
  maxPlayers: { type: Number, default: 10 },
  isPublic: { type: Boolean, default: true },
  color: { type: String, default: '#ffffff' },
  password: { type: String, default: null },
  thumbnail: { type: String, default: null },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
