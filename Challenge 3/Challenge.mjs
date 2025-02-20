import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,       
    pass: process.env.PASSWORD               
  }
});

const mailOptions = {
  from: process.env.EMAIL,          
  to: 'hr@ignitershub.com',
  subject: 'Challenge 3 Completed',
  text: `Name: Deepak Singh
Semester: 8th
Branch: Computer Science
Roll Number: 210180101017`, 
  attachments: [
    {
      filename: 'attachment.jpg',               
      path: 'Challenge 3\\attachment.jpeg',
      contentType: 'image/jpeg'                    
    }
  ]
};

// Send the email using the defined transporter and mail options.
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email:', error);
  } else {
    console.log('Email sent successfully:', info.response);
  }
});
