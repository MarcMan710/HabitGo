// models/Habit.js
const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  user:          { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:         { type: String, required: true },
  description:   { type: String, default: '' },
  daysCompleted: [{ type: Date, default: [] }], // Dates habit was completed
  frequency: { type: Number, default: 7 },
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
}, { timestamps: true });

const formatDate = require('../utils/formatDate');

habitSchema.methods.updateStreak = function (todayString) {
  // Ensure `this.daysCompleted` contains the date for `todayString`
  // and are sorted. The controller will add `todayString` to `daysCompleted` before calling this.
  const sortedCompletionDates = this.daysCompleted
    .map(date => new Date(date)) // Convert to Date objects
    .sort((a, b) => a - b);     // Sort chronologically

  let newCurrentStreak = 0;
  if (sortedCompletionDates.length > 0) {
    const todayDateObj = new Date(todayString); // Date object for the current completion day

    // Iterate backwards from `todayString` and check against `sortedCompletionDates`
    for (let i = 0; ; i++) {
      const expectedDateInStreak = new Date(todayDateObj);
      expectedDateInStreak.setDate(todayDateObj.getDate() - i); // i=0 is today, i=1 is yesterday, etc.
      const expectedDateString = formatDate(expectedDateInStreak);

      // Check if this expected date is in our list of completion dates
      const foundMatch = sortedCompletionDates.some(
        compDate => formatDate(compDate) === expectedDateString
      );

      if (foundMatch) {
        newCurrentStreak++;
      } else {
        // As soon as a date is not found, the consecutive streak from today backwards ends
        break;
      }
    }
  }

  this.currentStreak = newCurrentStreak;
  if (this.currentStreak > this.longestStreak) {
    this.longestStreak = this.currentStreak;
  }
};

module.exports = mongoose.model('Habit', habitSchema);
