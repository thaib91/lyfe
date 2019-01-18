const twilio = require('twilio');
require('dotenv').config();
const {TWILIO_SID, TWILIO_AUTH} = process.env'
// Twilio

const client = require('twilio')(TWILIO_SID, TWILIO_AUTH);
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const cors = require('cors')


client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+12093539552',
     to: '+12099851698'
   })
  .then(message => console.log(message.sid))
  .done();


  module.exports = {
      respondText: (req, res) => {
        const twiml = new MessagingResponse();
      
        twiml.message('The Robots are coming! Head for the hills!');
      
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
      },
  }