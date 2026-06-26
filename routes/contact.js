const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const sendEmail = require('../utils/email');
const emailTemplates = require('../utils/emailTemplates');

// POST a new message
router.post('/', async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        const savedMessage = await newMessage.save();

        // Send email in background to Admin
        sendEmail(
            'New Contact Message - Webify Pro',
            emailTemplates.adminNewMessage(savedMessage)
        );

        // Send confirmation email to the Customer
        sendEmail(
            'We Received Your Message - Webify Pro',
            emailTemplates.customerMessageConfirmation(savedMessage),
            savedMessage.email
        );

        res.status(201).json(savedMessage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
