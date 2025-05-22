const Habit = require('../models/Habit'); // Assuming Habit model path

const authorizeHabitOwner = async (req, res, next) => {
  try {
    const habitId = req.params.id;

    if (!habitId) {
      return res.status(400).json({ message: 'Habit ID not found in request parameters' });
    }

    const habit = await Habit.findById(habitId);

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    if (!req.user || habit.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'User not authorized to perform this action' });
    }

    req.habit = habit; // Attach habit to request object for later use
    next();
  } catch (error) {
    console.error('Error in authorizeHabitOwner middleware:', error);
    res.status(500).json({ message: 'Server error during authorization' });
  }
};

module.exports = { authorizeHabitOwner };
