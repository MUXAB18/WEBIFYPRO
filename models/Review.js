const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 80,
  },
  role: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  review: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    default: 5,
  },
  avatar: {
    type: String,
    default: '??',
  },
  color: {
    type: String,
    default: '#6366f1',
  },
  glow: {
    type: String,
    default: 'rgba(99,102,241,0.12)',
  },
  border: {
    type: String,
    default: 'rgba(99,102,241,0.25)',
  },
  verified: {
    type: Boolean,
    default: false,
  },
  helpful: {
    type: Number,
    default: 0,
  },
  approved: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

reviewSchema.index({ approved: 1, createdAt: -1 });

module.exports = mongoose.model('Review', reviewSchema);
