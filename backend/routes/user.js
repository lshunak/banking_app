const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware'); // JWT authentication middleware

router.use(authenticateToken);

// Route to get the authenticated user's profile
router.get('/profile', userController.getProfile);

// Route to get the authenticated user's accounts
router.get('/accounts', userController.getUserAccounts);

module.exports = router;