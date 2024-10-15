const { Schema, default:mongoose } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true }, 
    isVerified: { type: Boolean, default: false },
    verificationCode: { type: String }, // Store verification code
    accounts: [{ type: Schema.Types.ObjectId, ref: 'Account' }]

    /*
    verificationCodeExpires: { type: Date }, // Expiration time for the code */
});

module.exports = mongoose.model('Users', userSchema);
