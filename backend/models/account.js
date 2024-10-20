const { Schema, default: mongoose } = require('mongoose');
const AccountSchema = new Schema({
    accountNumber: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    balance: { type: Number, required: true}
});

module.exports = mongoose.model('Account', AccountSchema);
