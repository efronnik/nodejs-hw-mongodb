import nodemailer from 'nodemailer';
import { env } from '../utils/env.js';
import { SMTP } from '../constants/index.js';

const transporter = nodemailer.createTransport({
  host: env(SMTP.SMTP_HOST),
  port: Number(env(SMTP.SMTP_PORT)),
  auth: {
    user: env(SMTP.SMTP_USER),
    pass: env(SMTP.SMTP_PASSWORD),
  },
});

export const sendEmail = async (options) => {
  try {
    await transporter.sendMail(options);
  } catch (error) {
    throw new Error('Failed to send email');
  }
};
