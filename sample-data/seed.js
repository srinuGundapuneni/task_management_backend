require('dotenv').config();
const mongoose = require('mongoose');
const Employee = require('../src/models/Employee');
const Task = require('../src/models/Task');

const connectDB = require('../src/config/database');

const sampleEmployees = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Developer',
    password: 'password123'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Manager',
    password: 'password123'
  },
  {
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Designer',
    password: 'password123'
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Employee.deleteMany();
    await Task.deleteMany();

    // Insert employees
    const employees = await Employee.create(sampleEmployees);
    console.log('✓ Employees created');

    // Create sample tasks
    const sampleTasks = [
      {
        title: 'Design Homepage',
        description: 'Create a modern homepage design',
        status: 'In Progress',
        priority: 'High',
        assignedTo: employees[2]._id,
        dueDate: new Date('2025-12-15')
      },
      {
        title: 'Implement API',
        description: 'Build RESTful API endpoints',
        status: 'Pending',
        priority: 'High',
        assignedTo: employees[0]._id,
        dueDate: new Date('2025-12-10')
      },
      {
        title: 'Write Documentation',
        description: 'Document all API endpoints',
        status: 'Pending',
        priority: 'Medium',
        assignedTo: employees[0]._id,
        dueDate: new Date('2025-12-20')
      },
      {
        title: 'Team Meeting',
        description: 'Weekly sprint planning',
        status: 'Completed',
        priority: 'Low',
        assignedTo: employees[1]._id
      }
    ];

    await Task.create(sampleTasks);
    console.log('✓ Tasks created');

    console.log('\n✓ Database seeded successfully');
    console.log('\nSample Login Credentials:');
    console.log('Email: john@example.com | Password: password123');
    console.log('Email: jane@example.com | Password: password123');
    console.log('Email: bob@example.com | Password: password123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
