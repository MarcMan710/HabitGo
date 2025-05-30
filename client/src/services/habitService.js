// services/habitService.js
const formatDate = (date) => new Date(date).toISOString().split('T')[0];

/**
 * Checks if a date exists in the daysCompleted array.
 * @param {object} habit - The habit object containing daysCompleted.
 * @param {Date} date - The date to check.
 * @returns {boolean} True if the date is already marked, false otherwise.
 */
export const isDateAlreadyMarked = (habit, date) => {
  const formattedDate = formatDate(date);
  return habit.daysCompleted.some((d) => formatDate(d) === formattedDate);
};

/**
 * Calculates the current streak based on completed dates.
 * @param {Date[]} daysCompleted - An array of dates when the habit was completed.
 * @returns {number} The current streak.
 */
export const calculateStreak = (daysCompleted) => {
  if (!daysCompleted || daysCompleted.length === 0) return 0;
  const sortedDates = [...daysCompleted].sort((a, b) => new Date(b) - new Date(a));
  return sortedDates.reduce((streak, date, index) => {
    return index > 0 && (new Date(sortedDates[index - 1]) - new Date(date)) / (1000 * 60 * 60 * 24) === 1 ? streak + 1 : streak;
  }, 1);
};

/**
 * Calculates the completion rate for a habit.
 * @param {object} habit - The habit object containing daysCompleted and createdAt.
 * @returns {number} The completion rate as a percentage (0-100).
 */
export const calculateCompletionRate = (habit) => {
  if (!habit.createdAt || !Array.isArray(habit.daysCompleted)) return 0;
  const start = new Date(habit.createdAt);
  const end = new Date();
  // Calculate the number of days between start and end (inclusive)
  const totalDays = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
  if (totalDays <= 0) return 0;
  // Unique completed days
  const uniqueDays = new Set(habit.daysCompleted.map(d => d.split('T')[0]));
  return Math.round((uniqueDays.size / totalDays) * 100);
};

/**
 * Returns a badge or gamification label based on the current streak.
 * @param {Date[]} daysCompleted - An array of dates when the habit was completed.
 * @returns {string|null} The badge label or null if no badge.
 */
export const getStreakBadge = (daysCompleted) => {
  const streak = calculateStreak(daysCompleted);
  if (streak >= 30) return '🏆 30-day streak!';
  if (streak >= 15) return '🔥 15-day streak!';
  if (streak >= 10) return '🔥 10-day streak!';
  if (streak >= 5) return '⭐ 5-day streak!';
  if (streak >= 2) return `✨ ${streak}-day streak!`;
  return null;
};
