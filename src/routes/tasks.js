const express = require('express');
const { body } = require('express-validator');
const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const { validate } = require('../middleware/validation');

const router = express.Router();

// Public routes
router.get('/', getAllTasks);
router.get('/:id', getTask);

// Protected routes
router.post('/', protect, [
  body('title').trim().isLength({ min: 3, max: 100 }).withMessage('Title must be 3-100 characters'),
  body('description').optional().isLength({ max: 500 }).withMessage('Description max 500 characters'),
  body('status').optional().isIn(['Pending', 'In Progress', 'Completed']),
  body('priority').optional().isIn(['Low', 'Medium', 'High']),
  body('assignedTo').isMongoId().withMessage('Valid employee ID is required'),
  validate
], createTask);

router.put('/:id', protect, updateTask);
router.delete('/:id', protect, deleteTask);

module.exports = router;
