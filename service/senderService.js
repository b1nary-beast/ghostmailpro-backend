const transporter = require('../config/senderConfig');

const mailOptions = {
    // from: 'amit.rana.truminds@gmail.com',
    subject: 'dummy email',
    to: 'dummy@gmail.com',
    html: '<h1>dummy text</h1>'
}


const sendMail = () => {
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log("ERR: ", err.message);
            return;
        } else {
            console.log("Email send: ", info.messageId);
        }
    })
}

module.exports = sendMail;
