// routes/habitRoutes.js
const express = require('express');
const {
  getHabits, 
  createHabit,
  updateHabit,
  deleteHabit,
  markHabitComplete,
} = require('../controllers/habitController.js');
const protect = require('../middleware/authMiddleware.js');
const { authorizeHabitOwner } = require('../middleware/habitMiddleware.js');

const router = express.Router();


router.route('/')
  .get(protect, getHabits).post(protect, createHabit);

router.route('/:id')
  .put(protect, authorizeHabitOwner, updateHabit).delete(protect, authorizeHabitOwner, deleteHabit);

router.route('/check/:id')
  .post(protect, authorizeHabitOwner, markHabitComplete);

module.exports = router;
