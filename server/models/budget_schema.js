const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    data: {
        type: Number,
        required: true
    },
    backgroundColor: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    }
}, {collection: 'budget_data'});

module.exports = mongoose.model('budget_data', budgetSchema);