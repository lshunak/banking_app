const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const authenticateToken  = require('../middleware/authMiddleware'); // JWT authentication middleware

router.use(authenticateToken);

// Route to get the authenticated user's profile
router.get('/profile', userController.getUserProfile);

// Route to get the authenticated user's accounts
router.get('/accounts', userController.getUserAccounts);

module.exports = router;