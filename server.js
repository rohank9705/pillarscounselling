const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(__dirname));

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT == 465, // True for port 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Create the endpoint for your frontend form to talk to
app.post("/send-email", async (req, res) => {
  const { name, email, service } = req.body;

  // 1. The Email sent TO the Client (The Business)
  const mailToBusiness = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Sends to their own inbox
    replyTo: email, // CRITICAL: If the client hits "Reply", it goes to the user, not themselves!
    subject: `New Contact Form Enquiry from ${name}`,
    text: `You have a new enquiry!\n\nName: ${name}\nEmail: ${email}\nService Requested: ${service}`,
  };

  // 2. The Auto-Reply sent TO the User (The Patient)
  const autoReplyToUser = {
    from: `"Pillars Counselling Services" <${process.env.EMAIL_USER}>`, // Makes the sender name look professional
    to: email, // Sends to the email address the user typed in the form
    subject: `Thank you for contacting Pillars Counselling`,
    text: `Dear ${name},\n\nThank you for contacting Pillars Counselling Services.\n\nThis is an automated reply to confirm that we have securely received your message. We aim to respond to all inquiries within 1-2 business days.\n\n Please note that this inbox is not monitored continuously and should not be used fir urgennt or emergency support. \n\nIf you are experiencing a mental health crisis or are at immediate risk of harm, please contact your kicak emergency services, your GP, or your local mental health crisis service.\n\Thank you for your patience. I look forward to getting back to you soon.\n\nKind Regards, \n\nDaryl Glover \nPillars Counselling Services`,
  };

  try {
    // Send both emails simultaneously
    await transporter.sendMail(mailToBusiness);
    await transporter.sendMail(autoReplyToUser);

    // If both succeed, tell the frontend it worked
    res.status(200).send("Emails sent successfully!");
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).send("Error sending emails");
  }
});

// 404 Catch-All Middleware
app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + "/404.html");
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
