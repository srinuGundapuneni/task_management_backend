const Task = require('../models/Task');
const logger = require('../utils/logger');

// @desc    Get all tasks with filtering
// @route   GET /api/tasks
// @access  Public
exports.getAllTasks = async (req, res) => {
  try {
    // Build query
    const queryObj = {};
    
    if (req.query.status) {
      queryObj.status = req.query.status;
    }
    
    if (req.query.assignedTo) {
      queryObj.assignedTo = req.query.assignedTo;
    }
    
    if (req.query.priority) {
      queryObj.priority = req.query.priority;
    }
    
    const tasks = await Task.find(queryObj).populate('assignedTo', 'name email role');
    
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    logger.error(`Get tasks error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Public
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignedTo', 'name email role');
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    logger.error(`Get task error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    const populatedTask = await Task.findById(task._id).populate('assignedTo', 'name email role');
    
    logger.log(`Task created: ${task._id}`);
    
    res.status(201).json({
      success: true,
      data: populatedTask
    });
  } catch (error) {
    logger.error(`Create task error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('assignedTo', 'name email role');
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    logger.log(`Task updated: ${task._id}`);
    
    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    logger.error(`Update task error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    logger.log(`Task deleted: ${req.params.id}`);
    
    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    logger.error(`Delete task error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
