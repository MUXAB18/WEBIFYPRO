const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const sendEmail = require('../utils/email');
const emailTemplates = require('../utils/emailTemplates');

// POST a new order
router.post('/', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();

        // Send email in background to Admin
        sendEmail(
            'New Order Received - Webify Pro',
            emailTemplates.adminNewOrder(savedOrder)
        );

        // Send confirmation email to the Customer
        sendEmail(
            'Order Confirmation - Webify Pro',
            emailTemplates.customerOrderConfirmation(savedOrder),
            savedOrder.customerEmail
        );

        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
