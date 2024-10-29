// Address.js
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true }
}, { timestamps: true });

addressSchema.index({ userId: 1, city: 1 });  // Indexing userId and city for optimization

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;
