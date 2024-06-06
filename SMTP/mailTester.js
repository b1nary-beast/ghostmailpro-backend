const transporter = require('../config/senderConfig');

const mailOptions = {
    // from: 'amit.rana.truminds@gmail.com',
    subject: 'dummy email',
    to: 'dummy@gmail.com',
    html: '<h1>dummy text</h1>',
    // An array of attachments
    attachments: [
        // File Stream attachment
        {
            filename: 'ahem-happy.png',
            path: './dummy.jpg',
            cid: 'ahem-tester@mydomain.com' // should be as unique as possible
        }
    ]
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
