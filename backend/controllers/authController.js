const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models/user'); // Ensure correct path to User model
const { sendVerificationEmail, generateVerificationCode } = require('../services/email');
const { createAccountForUser } = require('../services/accountService'); // Import account utility

// Signup function
exports.signup = async (req, res) => {
    const { username, password, email } = req.body;
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        // Create a new user with verification code and expiry
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            isVerified: false, // Default to false
            verificationCode: generateVerificationCode(),
        });
        
        await newUser.save();
        console.log('User saved:', newUser); // Add logging

        // Send verification email
        if (process.env.NODE_ENV !== 'test') {
            await sendVerificationEmail(newUser.email, newUser.verificationCode);
        }

        await createAccountForUser(newUser._id, 1000);

        res.status(200).json({ message: 'Signup successful! Please verify your email.'});
        
    } catch (error) {
        console.error('Signup error:', error); // Add logging
        
        if (error.code === 11000) {
            return res.status(400).json({ message: 'email already exist' });
        }

        res.status(500).json({ message: 'Server error'});
    }
};

// Signin function
exports.signin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if email is verified
        if (!user.isVerified) {

            // If not verified, generate a new verification code and send it
            user.verificationCode = generateVerificationCode();
            await user.save();

            sendVerificationEmail(user, user.verificationCode);

            // Redirect user to email verification page
            return res.status(403).json({
                message: 'Email not verified. A new verification code has been sent.'
            });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Generate a JWT token
        const token = jwt.sign(
            { userId: user._id }, // Payload
            process.env.JWT_SECRET, // Secret key
            { expiresIn: '1h' } // Expiration time
        );

        // Send the token along with a message and token expiration info
        res.status(200).json({
            message: 'Signin successful',
            token,
            expiresIn: 3600 // 1 hour (in seconds)
        });
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Verify email function
exports.verifyEmail = async (req, res) => {
    const { verifyCode } = req.query;

    try {
        if (!verifyCode) {
            return res.status(400).json({ message: 'Verification code is required' });
        }
        const user = await User.findOne({ verificationCode: verifyCode });

        if (!user) {
            console.log('User not found for verification code:', verifyCode); // Add logging
            return res.status(404).json({ message: 'User not found' });
        }

        // Mark the user's email as verified
        user.isVerified = true;
        user.verificationCode = undefined;
        await user.save();
        console.log('User verified:', user); // Add logging

        return res.status(200).json({ message: 'Email verified successfully' });

    } catch (error) {
        console.error('Verification error:', error); // Add logging
        return res.status(500).json({ message: 'Server error'});
    }
};
