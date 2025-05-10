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

const router = express.Router();


router.route('/')
  .get(protect, getHabits).post(protect, createHabit);

router.route('/:id')
  .put(protect, updateHabit).delete(protect, deleteHabit);

router.route('/check/:id')
  .post(protect, markHabitComplete);

module.exports = router;
