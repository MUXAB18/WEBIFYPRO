const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - allow all origins (credentials:true + '*' is incompatible, so no credentials)
app.use(cors());
app.use(express.json());

// MongoDB Connection with timeouts so it fails fast instead of hanging
mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,  // Fail fast if Atlas unreachable
    socketTimeoutMS: 10000           // Abort slow operations after 10s
})
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

// Version check - tells us exactly which code Render deployed
app.get('/version', (req, res) => {
    res.json({ version: 'RESEND_v2', emailLib: 'resend', timestamp: '2026-03-10' });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
