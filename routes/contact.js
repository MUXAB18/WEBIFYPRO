const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const sendEmail = require('../utils/email');

// POST a new message
router.post('/', async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        const savedMessage = await newMessage.save();

        // Send email in background to Admin
        sendEmail(
            'New Contact Message - Webify Pro',
            `New message!\n\nFrom: ${savedMessage.name}\nEmail: ${savedMessage.email}\nPhone: ${savedMessage.phone}\nSubject: ${savedMessage.subject}\nMessage: ${savedMessage.message}`
        );

        // Send confirmation email to the Customer
        sendEmail(
            'We Received Your Message - Webify Pro',
            `Hi ${savedMessage.name},\n\nThank you for reaching out to Webify Pro!\n\nWe have received your message regarding "${savedMessage.subject}" and our team will get back to you within 2 hours.\n\nBest regards,\nWebify Pro Team`,
            savedMessage.email
        );

        res.status(201).json(savedMessage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
