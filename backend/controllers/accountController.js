const User = require('../models/user');
const Account = require('../models/account');
const mongoose = require('mongoose');
const { createAccountForUser } = require('../services/accountService'); // Import the utility function

exports.createAccount = async (req, res) => {
    try {
        const userId = req.user._id; // Get the user ID from the authenticated user

        // Call the utility function to create an account for the user
        const newAccount = await createAccountForUser(userId);

        // Send a success response
        res.status(201).json({ message: 'Account created successfully', account: newAccount });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create account', error: error.message });
    }
};


// Get balance for a specific account
exports.getBalance = async (req, res) => {
    const { accountNumber } = req.params; // Extract account number from request params
    const userId = req.user.userId;       // Extract user ID from authenticated token (set in middleware)

    try {
        // Find the account by accountNumber and check if it belongs to the authenticated user
        const account = await Account.findOne({ accountNumber, userId });

        if (!account) {
            return res.status(404).json({ message: 'Account not found or you do not have access to this account' });
        }

        // Return the account balance
        res.status(200).json({ balance: account.balance });
    } catch (error) {
        console.error('Error fetching balance:', error);
        res.status(500).json({ message: 'Failed to fetch balance' });
    }
};
