const nodemailer = require('nodemailer');

let transport;

if (process.env.NODE_ENV === 'production') {
  transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'helloworld.equipe@gmail.com',
      pass: process.env.MAIL_PASSWORD,
    },
  });
} else {
  transport = nodemailer.createTransport({
    host: 'mailhog',
    port: '1025',
    auth: null,
  });
}

module.exports = transport;
