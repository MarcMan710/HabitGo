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
  schedule: {
    type: {
      type: String,
      enum: ['daily', 'weekdays', 'weekends', 'custom', 'everyXDays'],
      default: 'daily'
    },
    customDays: [{
      type: Number, // 0-6 for Sunday-Saturday
      min: 0,
      max: 6
    }],
    everyXDays: {
      type: Number,
      min: 2,
      default: 2
    }
  },
  reminder: {
    enabled: { type: Boolean, default: false },
    time: { type: String, default: '09:00' }, // 24-hour format
    days: [{ type: Number, default: [0,1,2,3,4,5,6] }], // 0-6 for Sunday-Saturday
    lastNotified: { type: Date }
  },
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Habit', habitSchema);
