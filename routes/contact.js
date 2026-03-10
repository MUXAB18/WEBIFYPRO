const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const sendEmail = require('../utils/email');

// POST a new message
router.post('/', async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        const savedMessage = await newMessage.save();

        // Send notification
        await sendEmail(
            'New Contact Message - Webify Pro',
            `You have a new message!\n\nFrom: ${savedMessage.name}\nEmail: ${savedMessage.email}\nPhone: ${savedMessage.phone}\nSubject: ${savedMessage.subject}\nMessage: ${savedMessage.message}`
        );

        res.status(201).json(savedMessage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
