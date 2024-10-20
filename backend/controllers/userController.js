//  userController.js
const Account = require('../models/account');
const User = require('../models/user'); // Import the User model if needed

// Get User Profile
exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId; // Use req.user.userId consistently from JWT
        const user = await User.findById(userId).select('-password'); // Exclude password field

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error); // Log the error
        res.status(500).json({ message: 'Error fetching user profile' });
    }
};

// Get User's Accounts
exports.getUserAccounts = async (req, res) => {
    try {
        const userId = req.user.userId; // Use req.user.userId consistently

        // Find all accounts associated with the authenticated user
        const accounts = await Account.find({ userId });

        if (!accounts || accounts.length === 0) {
            return res.status(404).json({ message: 'No accounts found for this user' });
        }

        res.status(200).json({ accounts });
    } catch (error) {
        console.error('Error fetching accounts:', error); // Log the error
        res.status(500).json({ message: 'Failed to fetch accounts' });
    }
};
