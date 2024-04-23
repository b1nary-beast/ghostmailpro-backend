require('dotenv').config();
const express = require('express');
const receiverService = require('./service/receiverService');
const sendMail = require('./service/senderService');
const generateUniqueNames = require('./service/utilService');
const mongoose = require('mongoose');

const app = express();



// const connectDB = async () => {
//     return await mongoose.connect(process.env.DB_URL);

// }

// try {
//     await connectDB();
//     console.log("Connect with DB")
//     app.listen(process.env.APP_PORT, () => {
//         console.log('started on: ', process.env.PORT);
//         receiverService.listen(process.env.SMTP_RECEIVER, 'localhost', () => {
//             console.log("mail receiver server running on: ", process.env.SMTP_RECEIVER);
//         })

//     })

// } catch (err) {
//     console.log("Failed to connect with DB with error: ", err);
// }


const connectDB = async () => {
    try {
        const res = await mongoose.connect(process.env.DB_URL);
        if (res) {
            console.log("Connected to the database");
            app.listen(process.env.APP_PORT, () => {
                console.log('Server started on port: ', process.env.APP_PORT);
                // receiverService.listen(process.env.SMTP_RECEIVER, 'localhost', () => {
                //     console.log("Mail receiver server running on: ", process.env.SMTP_RECEIVER);
                // });
            });
        }
    } catch (err) {
        console.error("Failed to connect to the database with error: ", err);
        process.exit(1); // Exit the process if unable to connect to the database
    }
};

connectDB();