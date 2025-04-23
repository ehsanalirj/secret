// Nodemailer-based email notification service (demo)
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.SMTP_USER || 'demo',
    pass: process.env.SMTP_PASS || 'demo',
  },
});

async function sendFlaggedReviewEmail({ to, review, reason }) {
  const info = await transporter.sendMail({
    from: 'admin@yourplatform.com',
    to,
    subject: 'Flagged Review Alert',
    text: `Review flagged: ${review.comment}\nReason: ${reason}`,
  });
  return info;
}

export { sendFlaggedReviewEmail };
