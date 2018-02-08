//config/email.js
module.exports.email = {
    service: 'Gmail',
    auth: {user: process.env.mail , pass: process.env.pass},
    testMode: false
  };
