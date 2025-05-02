import { resend } from './resend';
import Email from './emails/MyEmail';

const send = async () => {
  const res = await resend.emails.send({
    from: 'you@example.com',
    to: 'user@gmail.com',
    subject: 'hello world',
    react: Email({ url: 'https://example.com' }),
  });
};

send();
