const { accountSid, authToken, twilio_phone_number } = require("./credentials.json");
const client = require('twilio')(accountSid, authToken);


function send(phone) {
    client.messages
        .create({ body: 'Hi there! this is the sms', from: twilio_phone_number, to: phone })
        .then(message => console.log(message.sid))
        .catch(err => console.log(err));
}

module.exports.send = send;