const mongoose = require('mongoose');

const mailBoxSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    emails: [{
        emailId: { type: mongoose.Schema.Types.ObjectId, ref: 'Email' },
        sender: {
            address: String,
            name: String
        },
        subject: String,
        timestamp: Number,
        isRead: { type: Boolean, default: false }
    }]
})

const MailBox = mongoose.model('MailBox', mailBoxSchema);

module.exports = MailBox;