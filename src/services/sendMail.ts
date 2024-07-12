import { env } from 'src/env';
const { MailtrapClient } = require('mailtrap');

export const sendEmail = (titleNote) => {
  const client = new MailtrapClient({
    endpoint: env.MAIL_ENDPOINT,
    token: env.MAIL_TOKEN,
  });

  const sender = {
    email: 'mailtrap@demomailtrap.com',
    name: 'Mailtrap Test',
  };
  const recipients = [
    {
      email: env.EMAIL_TO,
    },
  ];

  client
    .send({
      from: sender,
      to: recipients,
      subject: 'nota criada!',
      text: `Olá, a nota de título: "${titleNote}" foi criada !`,
      category: 'Integration Test',
    })
    .then(console.log, console.error);
};
