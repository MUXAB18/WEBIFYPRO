const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    service: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    customerPhone: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
    developmentStage: {
        type: String,
        enum: ['Pending', 'Planning', 'Design', 'Development', 'Testing', 'Completed'],
        default: 'Pending'
    },
    assignedBudget: {
        type: Number,
        default: 0
    },
    tasks: [{
        name: String,
        completed: { type: Boolean, default: false }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ developmentStage: 1 });

module.exports = mongoose.model('Order', orderSchema);
