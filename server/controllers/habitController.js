// controllers/habitController.js
const Habit = require('../models/Habit.js');
const formatDate = require('../utils/formatDate.js');

// @desc    Get all habits for logged-in user
// @route   GET /api/habits
const getHabits = async (req, res) => {
  const habits = await Habit.find({ user: req.user._id });
  res.json(habits);
};

// @desc    Create new habit
// @route   POST /api/habits
const createHabit = async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const habit = new Habit({
    user: req.user._id,
    title,
    description,
  });

  const created = await habit.save();
  res.status(201).json(created);
};

// @desc    Update a habit
// @route   PUT /api/habits/:id
const updateHabit = async (req, res) => {
  const habit = await Habit.findById(req.params.id);
  const { title, description, targetDays } = req.body;

  if (!habit || habit.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: 'Habit not found or unauthorized' });
  }

  habit.targetDays = targetDays || habit.targetDays;


  habit.title = req.body.title || habit.title;
  habit.description = req.body.description || habit.description;
  const updated = await habit.save();
  res.json(updated);
};

// @desc    Delete a habit
// @route   DELETE /api/habits/:id
const deleteHabit = async (req, res) => {
  const habit = await Habit.findById(req.params.id);

  if (!habit || habit.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: 'Habit not found or unauthorized' });
  }

  await habit.remove();
  res.json({ message: 'Habit deleted' });
};

// @desc    Mark habit completed for today
// @route   PUT /api/habits/check/:id
const markHabitComplete = async (req, res) => {
  const habit = await Habit.findById(req.params.id);
  const today = formatDate(new Date());

  if (!habit || habit.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: 'Habit not found or unauthorized' });
  }

  const alreadyMarked = habit.daysCompleted.some(
    (date) => formatDate(date) === today
  );

  if (!alreadyMarked) {
    habit.daysCompleted.push(new Date());

    // Calculate current streak
    let currentStreak = 0;
    let longestStreak = habit.longestStreak;
    const sortedDays = habit.daysCompleted.sort((a, b) => a - b);
    for (let i = sortedDays.length - 1; i >= 0; i--) {
      const diff = new Date(today).getTime() - sortedDays[i].getTime();
      const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
      if (diffDays <= currentStreak + 1) {
        currentStreak++;
      } else {
        break;
      }
    }

    habit.currentStreak = currentStreak;
    if (currentStreak > longestStreak) {
      habit.longestStreak = currentStreak;
    }

    const updatedHabit = await habit.save();
    return res.json(updatedHabit);
  }

  res.json(habit);
};

module.exports = { getHabits, createHabit, updateHabit, deleteHabit, markHabitComplete };
