require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./src/config/database');
const logger = require('./src/utils/logger');

// Route imports
const authRoutes = require('./src/routes/auth');
const employeeRoutes = require('./src/routes/employees');
const taskRoutes = require('./src/routes/tasks');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Custom logging middleware
app.use((req, res, next) => {
  logger.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/tasks', taskRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Task Management API is running 🚀" });
});


// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});


// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.log(`Server running on port ${PORT}`);
});

module.exports = app;
