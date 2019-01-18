// const twilio = require('twilio');
require('dotenv').config();
const {TWILIO_SID, TWILIO_AUTH} = process.env;
// Twilio

const client = require('twilio')(TWILIO_SID, TWILIO_AUTH);
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const cors = require('cors')



  module.exports = {
      getText: (req, res) => {
        const { text} = req.query;
        client.messages
        .create({
           body: text,
           from: '+12093539552',
           to: '+12099851698'
         })
        .then(message => console.log(message.body))
        .done()
      } 
     
  }