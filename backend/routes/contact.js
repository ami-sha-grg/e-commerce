const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Submit contact form
router.post('/', async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const contact = new Contact({ name, email, subject, message });
        await contact.save();

        // Send email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_RECEIVER,
            subject: `Contact Form Submission: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Error submitting the form' });
    }
});

module.exports = router;