const User = require('../models/user');
const Account = require('../models/account');
const mongoose = require('mongoose');

// Utility function to generate a new account number (choose one method)
const generateAccountNumber = () => {
    const objectId = new mongoose.Types.ObjectId(); // Generate a new ObjectId
    return objectId.toString(); // You can use the entire ObjectId or part of it
};

// Create a new account
exports.createAccount = async (userId) => {
    try {
        // Generate a new account number (this function should be implemented)
        const accountNumber = generateAccountNumber();

        // Create a new account with default balance 0
        const newAccount = new Account({
            userId,
            accountNumber,
            balance: 0
        });

        // Save the account to the database
        await newAccount.save();

        // Update the user with the new account
        await User.findByIdAndUpdate(userId, {
            $push: { accounts: newAccount._id }
        });

        return newAccount;
    } catch (error) {
        console.error('Error creating account:', error);
        throw new Error('Failed to create account');
    }
};


// Get balance for a specific account
exports.getBalance = async (req, res) => {
    const { accountId } = req.params;

    try {
        const account = await Account.findById(accountId);

        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }

        res.status(200).json({ balance: account.balance });
    } catch (error) {
        console.error('Error fetching balance:', error);
        res.status(500).json({ error: 'Failed to fetch balance' });
    }
};