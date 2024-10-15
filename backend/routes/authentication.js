const express = require('express');
const router = express.Router(); // allows us to define routes


const {signup, signin, verifyEmail} = require('../controllers/authController'); // import controller functions

// Define signup route. When a POST request is made to /authentication/signup, it triggers the signup function from authController.js.
router.post('/signup', signup);

// Define signin routes
router.post('/signin', signin);

// Email verification route
router.get('/verify-email', verifyEmail);

module.exports = router;