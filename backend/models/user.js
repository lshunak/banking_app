const { Schema, default:mongoose } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }, 
    email: { type: String, required: true, unique: true },
    verificationCode: { type: String }, // Store verification code
    isVerified: { type: Boolean, default: false },
    accounts: [{ type: Schema.Types.ObjectId, ref: 'Account' }]

    /*
    verificationCodeExpires: { type: Date }, // Expiration time for the code */
});

module.exports = mongoose.model('User', userSchema);
