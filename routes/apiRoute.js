const express = require('express');
const sendMail = require('../SMTP/mailTester');
const routes = express.Router();

routes.get('ping', (req, res) => {
    sendMail();
    res.status(200).send({
        success: true,
        api: true,
        smtp: true,
        db: true
    })
})

/**
 * @description returns the total count of email
 */
routes.get('emailCount', (req, res, next) => {

})

module.exports = routes;