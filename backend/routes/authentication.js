const express = require('express');
const router = express.Router();


const {signup, signin, verifyEmail} = require('../controllers/authController');

// Define signup route
router.post('/signup', signup);

// Define signin route
router.post('/signin', signin);

// Email verification route
router.get('/verify-email', verifyEmail);

module.exports = router;