require("dotenv").config();
const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodemailerConfig');
const Mailgen = require('mailgen')
const sendEmail = async ({ to, subject, html }) => {
  
  const EMAIL = process.env.EMAIL;
  const PASS = process.env.EMAIL_PASS;
  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASS
    }
  };
  let transporter = nodemailer.createTransport(config);
  let message = {
    from: EMAIL,
    to: to,
    subject: subject,
    html: html
};
return await transporter.sendMail(message);


};

module.exports = sendEmail;

