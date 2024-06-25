const mongoose = require('mongoose');

const emailCountSchema = new mongoose.Schema({
    count: {
        type: Number,
        default: 0,
    },
    since: {
        type: Number,
        default: Date.now
    }
})

const EmailCount = mongoose.model('EmailCount', emailCountSchema);

module.exports = EmailCount;