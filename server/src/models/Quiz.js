// models/Quiz.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  questions: [{
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: Number, required: true },
    points: { type: Number, default: 1 }
  }],
  timeLimit: { type: Number, default: 30 }, // seconds per question
  
  // Reference to the room this quiz belongs to
  roomId: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  
  creatorId: { 
    type: String,
    required: true 
  },
  
  // Quiz status
  isActive: { type: Boolean, default: false },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;