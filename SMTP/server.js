const { SMTPServer } = require("smtp-server")
const simpleParser = require('mailparser').simpleParser;
const startSMTPServer = (port, host) => {
    const mailServer = new SMTPServer({
        authOptional: true,
        logger: true,
        allowInsecureAuth: true,

        onConnect(session, callBack) {
            return callBack();
        },

        onMailFrom(address, session, callBack) {
            return callBack();
        },

        onRcptTo(address, session, callBack) {
            /* receive email on listed domains only */
            if (!validateReceiverAddress(address)) {
                return callBack(new Error('Only following domains are allowed: ', process.env.WHITELISTED_DOMAIN))
            }
            return callBack();
        },

        onData(stream, session, callBack) {
            let mailDataString = '';

            stream.on('data', (chunk) => {
                mailDataString += chunk;
            })

            stream.on('end', () => {
                /* parse the received mail data */
                simpleParser(mailDataString, (err, mail) => {
                    mail.timestamp = new Date().getTime();
                    /* replacing headers with '.' in the key with '_' because of insertions problem */
                    mail.headers.forEach((value, key) => {
                        if (key.includes('.')) {
                            const newKey = key.replace(/\./g, '_');
                            mail.headers.set(newKey, mail.headers.get(key));
                            mail.headers.delete(key);
                        }
                    })
                    console.log("processed response is ", mail);
                })

            })
        }
    })

    mailServer.listen(port, host, () => {
        console.log("mail server started on: ", port);
    })

    mailServer.on('error', err => {
        console.log("Error: Failed to start SMTP server with error ", err.message);
        mailServer.close(() => {
            console.log("Closing mail server");
        })
    })
}


const validateReceiverAddress = (address) => {
    const whiteListedDomains = process.env.WHITELISTED_DOMAIN?.split(",");
    /* return true when no whiteListedDomains are found i.e all the domains are allowed */
    if (!whiteListedDomains || (whiteListedDomains && whiteListedDomains?.length == 0)) {
        return true;
    }

    for (let domain in whiteListedDomains) {
        if (address.address.split('@')[1].toLowerCase().endsWith(domain.toLowerCase())) {
            return true;
        }
    }
    return false;
}

module.exports = startSMTPServer;