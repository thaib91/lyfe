// const twilio = require('twilio');
require('dotenv').config();
const {TWILIO_SID, TWILIO_AUTH} = process.env;
// Twilio

const client = require('twilio')(TWILIO_SID, TWILIO_AUTH);
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const cors = require('cors')



  module.exports = {
      respondText: (req, res) => {
        const twiml = new MessagingResponse();
      
        twiml.message('The Robots are coming! Head for the hills!');
      
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
      },

      getText: (req, res) => {
        const {recipient, text} = req.query;
        client.messages
        .create({
           body: text,
           from: '+12093539552',
           to: '+1' + recipient
         })
        .then(message => console.log(message.body))
        .done()
      } 
     
  }