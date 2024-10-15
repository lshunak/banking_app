const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Route to create a new account
router.post('/create', accountController.createAccount);

// Route to get the account balance
router.get('/balance/:accountId', accountController.getBalance);

module.exports = router;
