const Account = require('../models/account');
const mongoose = require('mongoose'); // Ensure you import mongoose for ObjectId generation

// Utility function to generate a new account number (choose one method)
const generateAccountNumber = () => {
    const objectId = new mongoose.Types.ObjectId(); // Generate a new ObjectId
    return objectId.toString(); // You can use the entire ObjectId or part of it
};

// Function to create an account
const createAccountForUser = async (userId) => {
    const accountNumber = generateAccountNumber(); // Generate a new account number

    // Create a new account
    const newAccount = new Account({
        userId, // Attach the authenticated user's ID to the account
        accountNumber,
        balance: 0 // Default balance to 0
    });

    // Save the new account to the database
    await newAccount.save();
    return newAccount; // Return the created account
};

module.exports = {
    createAccountForUser
};
