const Employee = require('../models/Employee');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// @desc    Register new employee
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;

    // Check if employee already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ error: 'Employee with this email already exists' });
    }

    // Create employee
    const employee = await Employee.create({
      name,
      email,
      role,
      password
    });

    logger.log(`New employee registered: ${email}`);

    // Generate token
    const token = generateToken(employee._id);

    res.status(201).json({
      success: true,
      data: employee,
      token
    });
  } catch (error) {
    logger.error(`Registration error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

// @desc    Login employee
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    // Check for employee (include password in query)
    const employee = await Employee.findOne({ email }).select('+password');

    if (!employee) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await employee.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    logger.log(`Employee logged in: ${email}`);

    // Generate token
    const token = generateToken(employee._id);

    res.status(200).json({
      success: true,
      data: employee,
      token
    });
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get current logged in employee
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const employee = await Employee.findById(req.employee.id);
    
    res.status(200).json({
      success: true,
      data: employee
    });
  } catch (error) {
    logger.error(`Get me error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
