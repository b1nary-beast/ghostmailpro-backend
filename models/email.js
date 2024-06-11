const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    from: {
        address: String,
        name: String
    },
    to: [{
        address: String,
        name: String
    }],
    cc: [{
        address: String,
        name: String
    }],
    bcc: [{
        address: String,
        name: String
    }],
    subject: String,
    messageId: String,
    inReplyTo: String,
    references: [String],
    date: Date,
    text: String,
    html: String,
    attachments: [{
        filename: String,
        contentType: String,
        contentDisposition: String,
        contentId: String,
        cid: String,
        content: Buffer,
        size: Number
    }],
    headers: mongoose.Schema.Types.Mixed, // Headers field to store key-value pairs
    timestamp: { type: Number, default: Date.now } // Added timestamp field
})

const Email = mongoose.model('Email', emailSchema);

module.exports = Email