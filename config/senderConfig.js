const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    // host: 'smtp.gmail.com',
    host: 'localhost',
    port: process.env.SMTP_RECEIVER,
    // comment for gmail
    ignoreTLS: true,
    secure: false,
    // comment auth for local
    // auth: {
    //     user: process.env.EMAIL_ID,
    //     pass: process.env.KEY,
    // },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter;