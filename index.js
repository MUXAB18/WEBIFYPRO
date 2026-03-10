const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dns = require('dns');
require('dotenv').config();

// Force IPv4 DNS resolution for Nodemailer bypass
dns.setDefaultResultOrder('ipv4first');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Routes
const orderRoutes = require('./routes/orders');
const contactRoutes = require('./routes/contact');

app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Webify Pro API is running');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
