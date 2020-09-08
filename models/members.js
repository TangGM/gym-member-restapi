const mongoose = require('mongoose');
const membersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, branch: {
        type: String,
        required: true
    }, joinDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

// name and correspoding schema
module.exports = mongoose.model('Member', membersSchema)
