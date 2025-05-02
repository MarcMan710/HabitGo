// routes/habitRoutes.js
import express from 'express';
import {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  markHabitComplete,
} from '../controllers/habitController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getHabits).post(protect, createHabit);

router.route('/:id')
  .put(protect, updateHabit).delete(protect, deleteHabit);

router.route('/check/:id')
  .put(protect, markHabitComplete);

export default router;
