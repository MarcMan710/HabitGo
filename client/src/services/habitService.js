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
