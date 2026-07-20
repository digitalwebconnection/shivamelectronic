import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import dotenv from 'dotenv';

// Resolve .env from the backend root (two levels up from utils/)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../../.env') });

/**
 * Send OTP email for password reset.
 * Uses explicit Gmail SMTP (port 587 + STARTTLS) — more reliable than service:'gmail'.
 */
export const sendOtpEmail = async (toEmail, otp) => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error('EMAIL_USER or EMAIL_PASS is not set in environment variables.');
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,          // true for port 465, false for 587
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false,  // avoid cert errors on some networks
    },
  });

  // Verify connection before sending
  await transporter.verify();

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; background: #f8fafc; border-radius: 16px;">
      <div style="background: linear-gradient(135deg, #2563eb, #4f46e5); border-radius: 12px; padding: 28px; text-align: center; margin-bottom: 24px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">Shivam Electronic World</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 6px 0 0; font-size: 13px;">Password Reset OTP</p>
      </div>
      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px; text-align: center;">
        <p style="color: #475569; font-size: 14px; margin: 0 0 20px;">Use the OTP below to reset your password. It expires in <strong>60 seconds</strong>.</p>
        <div style="background: #f1f5f9; border: 2px dashed #cbd5e1; border-radius: 10px; padding: 18px 32px; display: inline-block; margin: 0 auto 20px;">
          <span style="font-size: 36px; font-weight: 900; letter-spacing: 10px; color: #1e293b; font-family: monospace;">${otp}</span>
        </div>
        <p style="color: #94a3b8; font-size: 12px; margin: 0;">If you didn't request this, you can safely ignore this email.</p>
      </div>
    </div>
  `;

  const info = await transporter.sendMail({
    from: `"Shivam Electronic World" <${user}>`,
    to: toEmail,
    subject: `${otp} – Your Password Reset OTP`,
    html,
  });

  console.log(`[OTP Email] Sent to ${toEmail} | MessageId: ${info.messageId}`);
};
