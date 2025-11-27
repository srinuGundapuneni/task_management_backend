const Employee = require('../models/Employee');
const logger = require('../utils/logger');

// @desc    Get all employees
// @route   GET /api/employees
// @access  Public
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().select('-password');
    
    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees
    });
  } catch (error) {
    logger.error(`Get employees error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get single employee
// @route   GET /api/employees/:id
// @access  Public
exports.getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    res.status(200).json({
      success: true,
      data: employee
    });
  } catch (error) {
    logger.error(`Get employee error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

// @desc    Create new employee
// @route   POST /api/employees
// @access  Public
exports.createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    
    logger.log(`Employee created: ${employee.email}`);
    
    res.status(201).json({
      success: true,
      data: employee
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Employee with this email already exists' });
    }
    logger.error(`Create employee error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update employee
// @route   PUT /api/employees/:id
// @access  Private
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    logger.log(`Employee updated: ${employee._id}`);
    
    res.status(200).json({
      success: true,
      data: employee
    });
  } catch (error) {
    logger.error(`Update employee error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
// @access  Private
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    logger.log(`Employee deleted: ${req.params.id}`);
    
    res.status(200).json({
      success: true,
      message: 'Employee deleted successfully'
    });
  } catch (error) {
    logger.error(`Delete employee error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
