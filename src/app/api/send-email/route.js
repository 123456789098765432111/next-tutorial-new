"use client"; // Please note that 'use client' is not a standard Node.js or Express directive. It seems to be mistakenly used here.

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.json());

app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  // Create a transporter using Nodemailer with your email service configuration
  
  const transporter = nodemailer.createTransport({
    service: 'shamshodnurmurodov119@gmail.com', // Use a valid email service like Gmail, Outlook, etc.
    auth: {
      user: 'shamshodnurmurodov119@gmail.com', // Your email address
      pass: 'shamshod01', // Your email password or an App Password for Gmail
    },
  });

  try {
    // Send email using the transporter
    const mailOptions = {
      from: 'shamshodnurmurodov119@gmail.com', // Sender email address
      to: 'shamshodnurmurodov119@gmail.com', // Recipient email address
      subject: 'Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
