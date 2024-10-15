//  userController.js
const Account = require('../models/account');
const User = require('../models/user'); // Import the User model if needed

// Fetch all accounts for a specific user
const getAccounts = async (userId) => {
    try {
        return await Account.find({ userId }).exec();
    } catch (error) {
        throw new Error('Failed to fetch accounts');
    }
};


// Handle user dashboard data
const getUserDashboard = async (req, res) => {
    try {
        const userId = req.user.userId; // Get user ID from request
        const accounts = await getAccounts(userId);

        res.status(200).json({
            userId,
            accounts
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user dashboard data' });
    }
};

// Optionally, define a route to get accounts directly
const getUserAccounts = async (req, res) => {
    try {
        const userId = req.user._id;
        const accounts = await getAccounts(userId);

        res.status(200).json({ accounts });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch accounts' });
    }
};

module.exports = {
    getUserDashboard,
    getUserAccounts
};
