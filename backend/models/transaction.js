const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
    senderAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true }, // Reference to sender account
    receiverAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true }, // Reference to receiver account
    amount: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
