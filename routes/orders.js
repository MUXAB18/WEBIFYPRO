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

        // Send email to Admin
        await sendEmail(
            `New Order Received from ${savedOrder.customerName} - Webify Pro`,
            emailTemplates.adminNewOrder(savedOrder)
        );

        // Send confirmation email to the Customer
        try {
            await sendEmail(
                `Order Confirmation - Webify Pro (Order #${savedOrder._id.toString().slice(-6)})`,
                emailTemplates.customerOrderConfirmation(savedOrder),
                savedOrder.customerEmail
            );
        } catch (customerEmailErr) {
            console.error("Customer confirmation email failed (Likely due to Resend unverified domain):", customerEmailErr.message);
        }

        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
