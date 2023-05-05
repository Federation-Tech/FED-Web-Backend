const fs = require('fs');
const path = require('path');
const sendMail = require('./gmail');

const main = async () => {
  const options = {
    to: 'vinitagarwal.garg@gmail.com',
    subject: 'Hello Amit 🚀',
    text: 'This email is sent from the command line',
    textEncoding: 'base64',
    headers: [
      { key: 'X-Application-Developer', value: 'Vinit Agarwal' },
      { key: 'X-Application-Version', value: 'v1.0.0.2' },
    ],
  };

  const messageId = await sendMail(options);
  return messageId;
};

main()
  .then((messageId) => console.log('Message sent successfully:', messageId))
  .catch((err) => console.error(err));