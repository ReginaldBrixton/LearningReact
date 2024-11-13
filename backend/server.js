const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config/config');

// Import routes
const userRoutes = require('./routes/admin/userRoutes');
const supervisorRoutes = require('./routes/admin/supervisorRoutes');
const settingsRoutes = require('./routes/admin/settingsRoutes');

const app = express();

// Middleware
app.use(helmet());
app.use(cors(config.cors));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(config.database.url)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/admin/users', userRoutes);
app.use('/api/admin/supervisors', supervisorRoutes);
app.use('/api/admin/settings', settingsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

module.exports = app;