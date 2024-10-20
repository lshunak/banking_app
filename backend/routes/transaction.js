const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authenticateToken  = require('../middleware/authMiddleware'); // JWT authentication middleware

// Middleware to protect routes
router.use(authenticateToken);

// Route to create a new transaction
router.post('/create', transactionController.createTransaction);

// Route to get transactions for a specific account
router.get('/list/:accountId', transactionController.getTransactions);

module.exports = router;
