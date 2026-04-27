const nodemailer = require('nodemailer');

// Mock or real send email function
// Does not block main thread on error.
const sendEmail = async (options) => {
  try {
    // Create a transporter (defaults to testing/mock log if no ENV vars are set)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'sandbox.smtp.mailtrap.io',
      port: process.env.SMTP_PORT || 2525,
      auth: {
        user: process.env.SMTP_EMAIL || 'user',
        pass: process.env.SMTP_PASSWORD || 'password',
      },
    });

    const message = {
      from: `${process.env.FROM_NAME || 'Flight Booking Admin'} <${process.env.FROM_EMAIL || 'admin@flight.com'}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    // Attempt to send
    await transporter.sendMail(message);
    console.log(`[Email Success] Sent to: ${options.email} - Subject: ${options.subject}`);
  } catch (error) {
    console.error(`[Email Error] Failed to send email to ${options.email}:`, error.message);
    // We swallow the error so it doesn't crash the server or block the API response
  }
};

module.exports = sendEmail;
