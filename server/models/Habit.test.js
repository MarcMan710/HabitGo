const mongoose = require('mongoose');
const formatDate = require('../utils/formatDate'); // Assuming this is the correct path

// We need the schema to create instances for testing, but not necessarily the compiled model
const habitSchema = new mongoose.Schema({
  user:          { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title:         { type: String, required: true },
  description:   { type: String, default: '' },
  daysCompleted: [{ type: Date, default: [] }],
  frequency: { type: Number, default: 7 },
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
}, { timestamps: true });

// Import the updateStreak method logic (or attach it to the schema for testing)
// This is a bit unconventional, normally you'd import the model directly.
// For isolated unit testing of a method, we can define it on a test-specific schema.
const originalUpdateStreak = require('./Habit').schema.methods.updateStreak; // Accessing via schema
habitSchema.methods.updateStreak = originalUpdateStreak;

const TestHabit = mongoose.model('TestHabitForStreak', habitSchema);

describe('Habit Model - updateStreak Method', () => {
  const today = new Date();
  const todayString = formatDate(today);
  
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayString = formatDate(yesterday);

  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);
  const twoDaysAgoString = formatDate(twoDaysAgo);

  const threeDaysAgo = new Date(today);
  threeDaysAgo.setDate(today.getDate() - 3);
  const threeDaysAgoString = formatDate(threeDaysAgo);
  
  const fourDaysAgo = new Date(today);
  fourDaysAgo.setDate(today.getDate() - 4);
  const fourDaysAgoString = formatDate(fourDaysAgo);


  test('should have current and longest streak as 0 if no days completed', () => {
    const habit = new TestHabit({ title: 'Test', daysCompleted: [] });
    habit.updateStreak(todayString); // todayString doesn't matter if daysCompleted is empty
    expect(habit.currentStreak).toBe(0);
    expect(habit.longestStreak).toBe(0);
  });

  test('should set current and longest streak to 1 if only today is completed', () => {
    const habit = new TestHabit({ title: 'Test', daysCompleted: [new Date(todayString)] });
    habit.updateStreak(todayString);
    expect(habit.currentStreak).toBe(1);
    expect(habit.longestStreak).toBe(1);
  });

  test('should calculate consecutive days correctly (today, yesterday, 2 days ago)', () => {
    const habit = new TestHabit({
      title: 'Test',
      daysCompleted: [new Date(twoDaysAgoString), new Date(yesterdayString), new Date(todayString)],
      longestStreak: 0 // Start with 0
    });
    habit.updateStreak(todayString);
    expect(habit.currentStreak).toBe(3);
    expect(habit.longestStreak).toBe(3);
  });

  test('should handle unsorted daysCompleted array', () => {
    const habit = new TestHabit({
      title: 'Test',
      daysCompleted: [new Date(todayString), new Date(twoDaysAgoString), new Date(yesterdayString)],
      longestStreak: 0
    });
    // The updateStreak method sorts internally using .map(date => new Date(date)).sort()
    habit.updateStreak(todayString);
    expect(habit.currentStreak).toBe(3);
    expect(habit.longestStreak).toBe(3);
  });
  
  test('should reset current streak if there is a break, longest streak remains', () => {
    const habit = new TestHabit({
      title: 'Test',
      // Completed 2 days ago, yesterday, then a break (not today)
      // Then completed today again.
      // Initial state: 3 days ago, 2 days ago (streak of 2)
      daysCompleted: [new Date(threeDaysAgoString), new Date(twoDaysAgoString)],
      currentStreak: 2,
      longestStreak: 2
    });
    // Mark today as completed, after a break
    habit.daysCompleted.push(new Date(todayString));
    habit.updateStreak(todayString);
    expect(habit.currentStreak).toBe(1); // Current streak is 1 (only today)
    expect(habit.longestStreak).toBe(2); // Longest streak remains 2
  });

  test('should update longest streak when current streak surpasses it', () => {
    const habit = new TestHabit({
      title: 'Test',
      daysCompleted: [new Date(yesterdayString)], // Completed yesterday
      currentStreak: 1,
      longestStreak: 1
    });
    // Now complete today
    habit.daysCompleted.push(new Date(todayString));
    habit.updateStreak(todayString); // todayString is crucial here
    expect(habit.currentStreak).toBe(2);
    expect(habit.longestStreak).toBe(2);
  });

  test('should correctly calculate streak if completions are only in the past and not consecutive to today', () => {
    const habit = new TestHabit({
      title: 'Test',
      daysCompleted: [new Date(fourDaysAgoString), new Date(threeDaysAgoString)], // Streak of 2, but in the past
      longestStreak: 2 // Assume this was the previous longest
    });
    // We call updateStreak with todayString, but today is NOT in daysCompleted
    // The streak calculation is based on `todayString` and checks backwards.
    // Since todayString is not in daysCompleted, the streak should be 0.
    habit.updateStreak(todayString);
    expect(habit.currentStreak).toBe(0); 
    expect(habit.longestStreak).toBe(2); // Longest streak should not be affected by a non-completion
  });
  
  test('should calculate streak if daysCompleted has dates not leading up to todayString', () => {
    const habit = new TestHabit({
      title: 'Test',
      daysCompleted: [new Date(fourDaysAgoString), new Date(threeDaysAgoString), new Date(todayString)],
      longestStreak: 0,
    });
    // Streak should be 1 (only today) because 3daysAgo and 4daysAgo are not consecutive with today.
    habit.updateStreak(todayString);
    expect(habit.currentStreak).toBe(1);
    expect(habit.longestStreak).toBe(1);
  });

   test('should handle multiple completions on the same day (should not affect streak logic)', () => {
    const habit = new TestHabit({
      title: 'Test',
      daysCompleted: [new Date(yesterdayString), new Date(todayString), new Date(todayString)], // today completed twice
      longestStreak: 1
    });
    habit.updateStreak(todayString);
    expect(habit.currentStreak).toBe(2); // yesterday, today
    expect(habit.longestStreak).toBe(2);
  });

  test('should correctly identify a streak of 1 if only yesterday was completed, and checking for today', () => {
    // This tests if updateStreak correctly identifies that 'today' is not part of the streak
    const habit = new TestHabit({
      title: 'Test',
      daysCompleted: [new Date(yesterdayString)],
      currentStreak: 1, // Current streak was 1 (for yesterday)
      longestStreak: 1,
    });
    // Calling updateStreak with todayString, but today is NOT in daysCompleted
    habit.updateStreak(todayString);
    expect(habit.currentStreak).toBe(0); // Streak is 0 because today was not completed
    expect(habit.longestStreak).toBe(1); // Longest streak remains 1
  });
});
