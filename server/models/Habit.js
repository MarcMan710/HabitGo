// models/Habit.js
const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  user:          { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:         { type: String, required: true },
  description:   { type: String, default: '' },
  category:      { 
    type: String, 
    required: true,
    enum: ['health', 'work', 'learning', 'personal', 'fitness', 'other'],
    default: 'other'
  },
  daysCompleted: [{ type: Date, default: [] }], // Dates habit was completed
  frequency: { type: Number, default: 7 },
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Habit', habitSchema);
