const Email = require("../models/email");
const EmailCount = require("../models/emailCount");
const MailBox = require("../models/mailBox");

const saveEmail = async (email) => {
    try {
        const newEmail = new Email(email);
        const result = await newEmail.save();
        if (!result) {
            throw new Error('Failed to save email in db');
        } else {
            console.log("email saved to the db")
        }
    } catch (err) {
        throw new Error('Failed to save email in db');
    }
}

const updateMailBox = async (mail, address) => {
    try {
        const updateResult = await MailBox.updateOne(
            { name: address?.toLowerCase() },
            {
                $push: {
                    emails: {
                        emailId: mail._id,
                        sender: mail.from.value[0],
                        subject: mail.subject,
                        timestamp: mail.timestamp,
                        isRead: false
                    }
                }
            },
            { upsert: true }, // create if doesn't exist
            function (err2, res) {
                if (err2) {
                    logger.error('Error in writing to mailbox db', err2);
                    return;
                }
                logger.info('updated email content in db.');
            }
        )
    }
    catch (err) {
        console.log('failed to save email in the mailbox');
    }
}

const updateEmailCount = async () => {
    try {
        const result = await EmailCount.findOneAndUpdate(
            {}, // empty fileter as only one entry will exists
            {
                $inc: { count: 1 },
                $setOnInsert: { since: new Date().getTime() }
            },
        )

        // at the end emit the event so that it can be reflected on the frontend
    } catch (err) {
        console.log("failed to update the email count")
    }
}

module.exports = {
    saveEmail,
    updateMailBox
}