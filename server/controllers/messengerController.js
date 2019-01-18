const twilio = require('twilio');
// Twilio
const accountSid = 'AC0044da7804535ff2b111f795020edb4a';
const authToken = '4795f3896872c2ca73911fa5d72a24fd';
const client = require('twilio')(accountSid, authToken);
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