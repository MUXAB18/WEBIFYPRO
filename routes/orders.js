const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const sendEmail = require('../utils/email');

// POST a new order
router.post('/', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();

        // Send email in background to Admin
        sendEmail(
            'New Order Received - Webify Pro',
            `New order!\n\nService: ${savedOrder.service}\nCustomer: ${savedOrder.customerName}\nEmail: ${savedOrder.customerEmail}\nPhone: ${savedOrder.customerPhone}\nDetails: ${savedOrder.details}`
        );

        // Send confirmation email to the Customer
        sendEmail(
            'Order Confirmation - Webify Pro',
            `Hi ${savedOrder.customerName},\n\nThank you for placing your order with Webify Pro!\n\nHere are your order details:\n- Service: ${savedOrder.service}\n- Phone: ${savedOrder.customerPhone}\n- Details: ${savedOrder.details}\n\nWe have received your order and will contact you shortly.\n\nBest regards,\nWebify Pro Team`,
            savedOrder.customerEmail
        );

        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
