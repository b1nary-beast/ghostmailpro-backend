const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    // host: 'smtp.gmail.com',
    host: 'localhost',
    port: process.env.SMTP_PORT || 25,
    // comment for gmail
    ignoreTLS: true,
    secure: false,
    // comment auth for local
    // auth: {
    //     user: process.env.EMAIL_ID,
    //     pass: process.env.KEY,
    // },
    debug: false,
    logger: false,
    from: 'AHEM Test! <alive-test@mydomain.com>',
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter;