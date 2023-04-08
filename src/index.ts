import { SMTPServer } from 'smtp-server';
import { createTransport } from 'nodemailer';

import { JSDOM } from 'jsdom';
import knex from './knex';

const DOMPurify = require('dompurify');

const SMTP_HOST = '0.0.0.0';
const SMTP_PORT = 25;
const smtpServer = new SMTPServer({
  onAuth(auth, session, callback) {
    callback(null, { user: 123 })
  },
  onRcptTo(address, session, callback) {
    console.log('mailto', address);
    if (/receiver/.test(address.address)) {
      callback();
    } else {
      callback(new Error('wrong address'))
    }
  },
  onData(stream, session, callback) {
    const data = [];
    stream.on('data', chunk => {
      data.push(Buffer.from(chunk));
    })
    stream.on('end', () => {
      const buffer = Buffer.concat(data);
      session.envelope.rcptTo.forEach(({ address }) => {
        knex('emails_data')
          .insert({
            recipient: address,
            body: buffer
          }).then()
      });

      callback();
    });
  }
});

smtpServer.listen(SMTP_PORT, SMTP_HOST, () => {
  console.log(`🚀 SMTP server started at ${SMTP_HOST}:${SMTP_PORT}`);
});

setTimeout(async () => {
  console.log('send email');
  const transport = createTransport({
    host: '0.0.0.0',
    port: 25,
    tls: {
      rejectUnauthorized: false
    },
    auth: {
      user: 'user',
      pass: 'password'
    }
  })

  await transport.sendMail({
    from: "sender@server.com",
    to: "receiver@sender.com",
    cc: "frey.dev@yandex.ru",
    subject: "Message title",
    text: "Plaintext version of the message",
    html: "<p>HTML version of the message</p>"
  }, (err, info) => {
  });
}, 5000)

const window = new JSDOM('').window;
console.log(DOMPurify(window).sanitize('<img src="xxxx" onerror="alert(1)" />'))
