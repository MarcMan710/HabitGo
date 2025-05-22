// controllers/habitController.js
const Habit = require('../models/Habit.js');
const formatDate = require('../utils/formatDate.js');

// @desc    Get all habits for logged-in user
// @route   GET /api/habits
const getHabits = async (req, res, next) => {
  try {
    const habits = await Habit.find({ user: req.user._id });
    res.json(habits);
  } catch (error) {
    console.error('Error in getHabits:', error);
    next(error);
  }
};

// @desc    Create new habit
// @route   POST /api/habits
const createHabit = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      res.status(400).json({ message: 'Title is required' });
      return; // Ensure no further execution
    }

    const habit = new Habit({
      user: req.user._id,
      title,
      description,
    });

    const created = await habit.save();
    res.status(201).json(created);
  } catch (error) {
    console.error('Error in createHabit:', error);
    next(error);
  }
};

// @desc    Update a habit
// @route   PUT /api/habits/:id
const updateHabit = async (req, res, next) => {
  try {
    const { habit } = req; // Habit is attached by authorizeHabitOwner middleware
    const { title, description, targetDays } = req.body;

    habit.targetDays = targetDays || habit.targetDays;
    habit.title = req.body.title || habit.title;
    habit.description = req.body.description || habit.description;

    const updated = await habit.save();
    res.json(updated);
  } catch (error) {
    console.error('Error in updateHabit:', error);
    next(error);
  }
};

// @desc    Delete a habit
// @route   DELETE /api/habits/:id
const deleteHabit = async (req, res, next) => {
  try {
    const { habit } = req; // Habit is attached by authorizeHabitOwner middleware

    await habit.remove();
    res.json({ message: 'Habit deleted' });
  } catch (error) {
    console.error('Error in deleteHabit:', error);
    next(error);
  }
};

// @desc    Mark habit completed for today
// @route   PUT /api/habits/check/:id
const markHabitComplete = async (req, res, next) => {
  try {
    const { habit } = req; // Habit is attached by authorizeHabitOwner middleware
    const today = formatDate(new Date());

    const alreadyMarked = habit.daysCompleted.some(
      (date) => formatDate(date) === today
    );

    if (!alreadyMarked) {
      habit.daysCompleted.push(new Date()); // Add today's date object to the array

      habit.updateStreak(today); // Call the model method, passing the formatted 'today' string

      const updatedHabit = await habit.save();
      res.json(updatedHabit); // Changed to res.json from return res.json
      return; // Ensure no further execution if response is sent
    }

    res.json(habit);
  } catch (error) {
    console.error('Error in markHabitComplete:', error);
    next(error);
  }
};

module.exports = { getHabits, createHabit, updateHabit, deleteHabit, markHabitComplete };
