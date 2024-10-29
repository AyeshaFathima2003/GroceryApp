// User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
    role: { type: String, enum: ['customer', 'seller', 'admin'], default: 'customer' }
}, { timestamps: true });

userSchema.index({ email: 1 });  // Indexing email for faster lookup

const User = mongoose.model('User', userSchema);
module.exports = User;
