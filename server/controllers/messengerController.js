const twilio = require('twilio');
require('dotenv').config();
const {TWILIO_SID, TWILIO_AUTH, NODEMAILER_PASS} = process.env;
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
// const CronJob = require('cron').CronJob;

//used to send daily reminder emails.
const cron = require('node-cron');
const fs = require('fs');

const client = require('twilio')(TWILIO_SID, TWILIO_AUTH);
// const MessagingResponse = require('twilio').twiml.MessagingResponse;


cron.schedule('0 0 * * 0', ()=>{
  console.log('running a task every minute')
  let email_smtp = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
        type: 'login',
        user: 'team.lyfer@gmail.com',
        pass: 'testpassword1-5'
    },
  });
  let mailOptions = {
    from: '"Thai B." <team.lyfer@gmail.com>',
    to: 'team.lyfer@gmail.com',
    subject: 'This is a Reminder from Team Lyfe! Stay on Track!',
    text: "At the end of the day we are accountable to ourselves - our success is a result of what we do. -Catherine Pulsifer "
  };
  email_smtp.sendMail(mailOptions, (error, res)=>{
    if(error){
      console.log(error);
    }else{
      console.log('The Message Was Sent!');
      console.log(res)
    }
  });

})



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
      } ,

      getEmail: (req, res) => {
        let email_smtp = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          auth: {
              type: 'login',
              user: 'team.lyfer@gmail.com',
              pass: 'testpassword1-5'
          },
        });
        const {text} = req.query;
        let mailOptions = {
          from: '"Thai B." <team.lyfer@gmail.com>',
          to: 'team.lyfer@gmail.com',
          subject: 'This is a Reminder from Team Lyfe! Stay on Track!',
          text: text
        };
        email_smtp.sendMail(mailOptions, (error, res)=>{
          if(error){
            console.log(error);
          }else{
            console.log('The Message Was Sent!');
            console.log(res)
          }
        })
      },
     
  }


