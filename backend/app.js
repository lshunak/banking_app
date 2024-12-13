// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const authRoutes = require('./routes/authentication');
const userRoutes = require('./routes/user');
const accountRoutes = require('./routes/account');
const transactionRoutes = require('./routes/transaction');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/authentication', authRoutes);
app.use('/user', userRoutes);
app.use('/account', accountRoutes);
app.use('/transaction', transactionRoutes);

module.exports = { app };