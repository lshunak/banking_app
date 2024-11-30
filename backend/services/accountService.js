const Account = require('../models/account');
const mongoose = require('mongoose'); // Ensure you import mongoose for ObjectId generation

// Utility function to generate a new account number 
const generateAccountNumber = () => {
    const objectId = new mongoose.Types.ObjectId(); // Generate a new ObjectId
    return objectId.toString(); // Convert the ObjectId to a string and return it
};

// Function to create an account
const createAccountForUser = async (userId, initialBalance) => {
    const accountNumber = generateAccountNumber(); // Generate a new account number

    // Create a new account
    const newAccount = new Account({
        userId: userId, // Make sure to assign userId here
        accountNumber: generateAccountNumber(), // Assign the generated account number
        balance: initialBalance 
    });

    // Save the new account to the database
    await newAccount.save();
    return newAccount; // Return the created account
};

module.exports = {
    createAccountForUser
};
