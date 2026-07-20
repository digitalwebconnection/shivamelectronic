import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Read environment variables
dotenv.config();

/**
 * Create transport helper with multiple fallback options for cloud environments like Render
 */
const createTransporter = (user, pass) => {
  // Clean credentials from any accidental whitespace or surrounding quotes
  const cleanUser = user ? user.trim().replace(/^["']|["']$/g, '') : '';
  const cleanPass = pass ? pass.trim().replace(/^["']|["']$/g, '').replace(/\s+/g, '') : '';

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: cleanUser,
      pass: cleanPass,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000, // 10s timeout
  });
};

/**
 * Send OTP email for password reset.
 */
export const sendOtpEmail = async (toEmail, otp) => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.warn('[OTP Email Warning] EMAIL_USER or EMAIL_PASS is missing in environment variables.');
    console.log(`========================================`);
    console.log(`[LIVE RENDER FALLBACK OTP FOR ${toEmail}]: ${otp}`);
    console.log(`========================================`);
    return;
  }

  const cleanUser = user.trim().replace(/^["']|["']$/g, '');

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

  try {
    const transporter = createTransporter(user, pass);
    const info = await transporter.sendMail({
      from: `"Shivam Electronic World" <${cleanUser}>`,
      to: toEmail,
      subject: `${otp} – Your Password Reset OTP`,
      html,
    });

    console.log(`[OTP Email Success] Sent to ${toEmail} | MessageId: ${info.messageId}`);
  } catch (err) {
    console.error(`[OTP Email Warning] Primary Gmail transport failed (${err.message}). Trying fallback port 587...`);
    
    try {
      const fallbackTransporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: cleanUser,
          pass: pass.trim().replace(/^["']|["']$/g, '').replace(/\s+/g, ''),
        },
        tls: { rejectUnauthorized: false },
        connectionTimeout: 10000,
      });

      const fallbackInfo = await fallbackTransporter.sendMail({
        from: `"Shivam Electronic World" <${cleanUser}>`,
        to: toEmail,
        subject: `${otp} – Your Password Reset OTP`,
        html,
      });

      console.log(`[OTP Email Fallback Success] Sent to ${toEmail} | MessageId: ${fallbackInfo.messageId}`);
    } catch (fallbackErr) {
      console.error('[OTP Email Error] All SMTP connections failed on live server:', fallbackErr.message);
      console.log(`========================================`);
      console.log(`[LIVE RENDER FALLBACK OTP FOR ${toEmail}]: ${otp}`);
      console.log(`========================================`);
    }
  }
};
