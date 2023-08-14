const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodemailerConfig');

const sendEmail = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport(nodemailerConfig);
  return await transporter.sendMail({
    from: '"free content" <freecontent09983@gmail.com>', // sender address
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;

