const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

// Route to get dashboard data
router.get('/dashboard', dashboardController.getUserDashboard);

router.get('/accounts', authenticateToken, dashboardController.getUserAccounts);

module.exports = router;
