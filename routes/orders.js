const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const sendEmail = require('../utils/email');

// POST a new order
router.post('/', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();

        // Send notification
        await sendEmail(
            'New Order Received - Webify Pro',
            `You have a new order!\n\nService: ${savedOrder.service}\nCustomer: ${savedOrder.customerName}\nEmail: ${savedOrder.customerEmail}\nPhone: ${savedOrder.customerPhone}\nDetails: ${savedOrder.details}`
        );

        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
