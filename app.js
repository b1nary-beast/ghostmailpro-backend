require('dotenv').config();
const express = require('express');
const receiverService = require('./service/receiverService');
const sendMail = require('./service/senderService')

const app = express();

app.listen(process.env.APP_PORT, () => {
    console.log('started on: ', process.env.PORT);
    receiverService.listen(process.env.SMTP_RECEIVER, 'localhost', () => {
        console.log("mail receiver server running on: ", process.env.SMTP_RECEIVER);
        sendMail();

    })

})