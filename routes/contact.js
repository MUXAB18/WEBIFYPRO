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

        // Send email to Admin
        await sendEmail(
            'New Contact Message - Webify Pro',
            emailTemplates.adminNewMessage(savedMessage)
        );

        // Send confirmation email to the Customer
        try {
            await sendEmail(
                'We Received Your Message - Webify Pro',
                emailTemplates.customerMessageConfirmation(savedMessage),
                savedMessage.email
            );
        } catch (customerEmailErr) {
            console.error("Customer confirmation email failed (Likely due to Resend unverified domain):", customerEmailErr.message);
        }

        res.status(201).json(savedMessage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
