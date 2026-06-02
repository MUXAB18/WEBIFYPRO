const nodemailer = require('nodemailer');
require('dotenv').config();

async function main() {
  console.log("Creating transporter...");
  
  // Try iCloud SMTP first (since email is musabiftikhar12@icloud.com)
  const transporter = nodemailer.createTransport({
    host: 'smtp.mail.me.com',
    port: 587,
    secure: false, // TLS requires secure: false for port 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    console.log("Sending email to external address...");
    const info = await transporter.sendMail({
      from: `"Webify Pro" <${process.env.EMAIL_USER}>`,
      to: 'webifypro9@gmail.com',
      subject: 'Test iCloud SMTP',
      text: 'This is a test of sending via iCloud SMTP.',
    });
    console.log("Email sent successfully!", info.messageId);
  } catch (error) {
    console.error("iCloud SMTP failed, trying Gmail SMTP as fallback...");
    console.error(error);
    
    // Fallback to Gmail SMTP
    const gmailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    
    try {
      const info = await gmailTransporter.sendMail({
        from: `"Webify Pro" <${process.env.EMAIL_USER}>`,
        to: 'webifypro9@gmail.com',
        subject: 'Test Gmail SMTP Fallback',
        text: 'This is a test of sending via Gmail SMTP.',
      });
      console.log("Gmail Email sent successfully!", info.messageId);
    } catch (err) {
      console.error("Gmail SMTP also failed:");
      console.error(err);
    }
  }
}

main();
