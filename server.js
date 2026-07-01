const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); 

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Create the endpoint for your frontend form to talk to
app.post('/send-email', (req, res) => {
  const { name, email, service } = req.body;

  // Define the email sent to the business
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'hello@pillars.com', // The destination inbox
    subject: `New Contact Form Enquiry from ${name}`,
    text: `You have a new enquiry!\n\nName: ${name}\nEmail: ${email}\nService Requested: ${service}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      res.status(200).send('Email sent successfully!');
    }
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});