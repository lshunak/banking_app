const Transaction = require('../models/transaction');
const Account = require('../models/account');

// Create a new transaction
exports.createTransaction = async (req, res) => {
    const { senderAccount, receiverAccount, amount } = req.body;

    try {
        // Validate accounts and amount (you can add more validation as needed)
        const sender = await Account.findById(senderAccount);
        const receiver = await Account.findById(receiverAccount);

        if (!sender || !receiver) {
            return res.status(404).json({ message: 'Sender or Receiver account not found.' });
        }


        // Create the transaction
        const transaction = new Transaction({
            userId: req.user.id, // assuming req.user is set by the authentication middleware
            senderAccount,
            receiverAccount,
            amount,
        });

        // Save the transaction
        await transaction.save();

        // Update sender and receiver balances
        sender.balance -= amount;
        receiver.balance += amount;
        
        await sender.save();
        await receiver.save();

        res.status(201).json({ message: 'Transaction created successfully', transaction });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get transactions for a specific account (both as sender and receiver)
exports.getTransactions = async (req, res) => {
    const { accountId } = req.params;

    try {
        const transactions = await Transaction.find({
            $or: [
                { senderAccount: accountId },
                { receiverAccount: accountId }
            ]
        }).populate('userId senderAccount receiverAccount'); // Populate user and account details

        res.status(200).json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};


