const SMTPServer = require('smtp-server').SMTPServer;

const receiverServer = new SMTPServer({
    allowInsecureAuth: true,
    authOptional: true,
    // logger: true,
    onConnect(session, callBack) {
        console.log("onConnect", session.id);
        // accept the connection
        callBack()
    },

    onMailFrom(address, session, callBack) {
        console.log("onMailFrom", address.address, session.id);
        callBack()
    },

    onRcptTo(address, session, callBack) {
        console.log("onRcptTo", address.address, session.id);
        callBack();
    },
    // onData(stream, session, callBack) {
    //     stream.on('data', (data) => {
    //         console.log(`onData ${data.toString()}`)
    //     })
    //     stream.on('end', callBack);
    // }
    onData(stream, session, callBack) {
        let emailData = ''; // Buffer to store the email data

        stream.on('data', (data) => {
            emailData += data.toString(); // Append data to the buffer
        });

        stream.on('end', () => {
            console.log(`Received email data for session ${session.id}:`);
            console.log(emailData); // Log the entire email data
            callBack(); // Continue processing
        });
    }
})

// server.listen(process.env.PORT, () => {
//     console.log("Server listening on ", process.env.PORT)
// })

module.exports = receiverServer;