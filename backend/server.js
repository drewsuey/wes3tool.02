require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// API endpoint for sending emails
app.post('/api/send-estimate', async (req, res) => {
  try {
    const {
      name,
      companyName,
      email,
      phone,
      siteSize,
      floors,
      stairs,
      constructionType,
      constructionPhase,
      coverageLevel,
      smokeDetectors,
      heatDetectors,
      callPoints,
      totalDevices,
      interfaceIntegration,
      interfaceDetails,
      reactIntegration,
      reactAnnualCost
    } = req.body;

    const emailContent = `
      New Budget Estimate Request

      Contact Information:
      Name: ${name}
      Company: ${companyName}
      Email: ${email}
      Phone: ${phone || 'Not provided'}

      Site Details:
      Site Size: ${siteSize} sq. ft
      Number of Floors: ${floors}
      Number of Staircases: ${stairs}
      Construction Type: ${constructionType}
      Construction Phase: ${constructionPhase}
      Coverage Level: ${coverageLevel}
      
      Device Estimate:
      Smoke Detectors: ${smokeDetectors}
      Heat Detectors: ${heatDetectors}
      Call Points: ${callPoints}
      Total Devices: ${totalDevices}

      Additional Services:
      Interface Integration: ${interfaceIntegration ? 'Yes' : 'No'}
      ${interfaceIntegration ? `Interface Details: ${interfaceDetails}` : ''}
      REACT Integration: ${reactIntegration ? 'Yes' : 'No'}
      ${reactIntegration ? `REACT Subscription: $${reactAnnualCost}/year` : ''}
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: 'New WES3 Budget Estimate Request',
      text: emailContent,
      replyTo: email // Set reply-to as the customer's email
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Estimate sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send estimate' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 