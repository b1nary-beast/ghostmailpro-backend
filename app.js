require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const smtpServer = require('./SMTP/server');
const sendMail = require('./SMTP/mailTester');
const apiRoute = require('./routes/apiRoute');

const app = express();


const connectDB = async () => {
    try {
        const res = await mongoose.connect(process.env.DB_URL);
        if (res) {
            console.log("Connected to the database");
            app.listen(process.env.APP_PORT, () => {
                console.log('Server started on port: ', process.env.APP_PORT);
                smtpServer(process.env.SMTP_PORT, 'localhost')
                setTimeout(() => {
                    sendMail();
                }, 3000)
            });
        }
    } catch (err) {
        console.error("Failed to connect to the database with error: ", err);
        process.exit(1); // Exit the process if unable to connect to the database
    }
};

connectDB();

app.use('/api/', apiRoute);