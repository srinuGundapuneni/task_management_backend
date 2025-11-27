const express = require('express');
const { body } = require('express-validator');
const {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');
const { protect } = require('../middleware/auth');
const { validate } = require('../middleware/validation');

const router = express.Router();

router.get('/', getAllEmployees);
router.get('/:id', getEmployee);

router.post('/', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('role').isIn(['Developer', 'Designer', 'Manager', 'QA', 'DevOps', 'Product Manager', 'Other']),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  validate
], createEmployee);

router.put('/:id', protect, updateEmployee);
router.delete('/:id', protect, deleteEmployee);

module.exports = router;
