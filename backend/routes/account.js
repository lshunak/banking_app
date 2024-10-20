const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const  authenticateToken  = require('../middleware/authMiddleware'); // JWT authentication middleware

router.use(authenticateToken);


// Route to create a new account 
router.post('/',  accountController.createAccount);

// Route to get the account balance 
router.get('/balance/:accountNumber',  accountController.getBalance);

module.exports = router;
