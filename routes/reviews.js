const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

let reviewsCache = {
  data: null,
  timestamp: 0
};
const CACHE_DURATION = 60000; // 60 seconds

// GET all approved reviews
router.get('/', async (req, res) => {
  try {
    const now = Date.now();
    if (reviewsCache.data && (now - reviewsCache.timestamp < CACHE_DURATION)) {
      return res.json({ success: true, reviews: reviewsCache.data });
    }

    const reviews = await Review.find({ approved: true })
      .sort({ createdAt: -1 })
      .limit(50);
      
    reviewsCache.data = reviews;
    reviewsCache.timestamp = now;
    
    res.json({ success: true, reviews });
  } catch (err) {
    console.error('Review fetch error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch reviews' });
  }
});

// POST a new review
router.post('/', async (req, res) => {
  try {
    const { name, role, review, rating, avatar, color, glow, border } = req.body;

    if (!name || !role || !review || !rating) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const newReview = new Review({
      name: name.slice(0, 80),
      role: role.slice(0, 100),
      review: review.slice(0, 1000),
      rating: Math.min(5, Math.max(1, Number(rating))),
      avatar: avatar || name.slice(0, 2).toUpperCase(),
      color: color || '#6366f1',
      glow: glow || 'rgba(99,102,241,0.12)',
      border: border || 'rgba(99,102,241,0.25)',
      verified: false,
      approved: true,
    });

    await newReview.save();
    reviewsCache.data = null; // Clear cache so new review appears immediately
    res.status(201).json({ success: true, review: newReview });
  } catch (err) {
    console.error('Review save error:', err);
    res.status(500).json({ success: false, message: 'Failed to save review' });
  }
});

// PATCH — increment helpful count
router.patch('/:id/helpful', async (req, res) => {
  try {
    const updated = await Review.findByIdAndUpdate(
      req.params.id,
      { $inc: { helpful: 1 } },
      { new: true }
    );
    if (!updated) return res.status(404).json({ success: false, message: 'Review not found' });
    res.json({ success: true, helpful: updated.helpful });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Update failed' });
  }
});

module.exports = router;
