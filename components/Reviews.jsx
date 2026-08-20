"use client";
import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const reviewsData = [
  {
    name: 'Zain Awan',
    role: 'CEO, Awan Digital',
    review: "Webify Pro built our company website and the performance is incredible! The site loads in less than a second and the design is absolutely stunning. Strongly recommended!",
    avatar: 'ZA',
    rating: 5,
  },
  {
    name: 'Jessica Taylor',
    role: 'Founder, Luxe Brands',
    review: "Our social media engagement grew by 150% under their management. Highly creative posts, perfect branding, and professional delivery. 10/10!",
    avatar: 'JT',
    rating: 5,
  },
  {
    name: 'Ahmed Raza',
    role: 'E-commerce Store Owner',
    review: "Webify Pro built our complete e-commerce website with payment integration and product management. Sales doubled within the first month. Incredibly fast, beautiful design, and top-tier support!",
    avatar: 'AR',
    rating: 5,
  },
  {
    name: 'Sara Malik',
    role: 'Marketing Director, TechFlow',
    review: "Working with Webify Pro on our Google Ads campaigns was a game changer. Our CPC dropped by 40% while conversions doubled. They truly understand data-driven marketing.",
    avatar: 'SM',
    rating: 5,
  },
];

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviewsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviewsData.length - 1 ? 0 : prev + 1));
  };

  const currentReview = reviewsData[currentIndex];

  return (
    <section id="reviews" style={{ padding: '120px 6%', background: 'var(--color-bg)', position: 'relative' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        
        <div style={{
          display: 'inline-block', padding: '6px 14px', borderRadius: '100px',
          background: 'rgba(11, 30, 57, 0.05)', border: '1px solid var(--color-border)',
          color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: '600',
          textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '40px'
        }}>
          Client Testimonials
        </div>

        <div style={{ position: 'relative', padding: '40px 0' }}>
          <Quote size={80} color="var(--color-border)" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', opacity: 0.5, zIndex: 0 }} />
          
          <div style={{ position: 'relative', zIndex: 1, minHeight: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              color: 'var(--color-primary)',
              fontWeight: '500',
              lineHeight: '1.4',
              fontStyle: 'italic',
              margin: 0
            }}>
              "{currentReview.review}"
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
          <button onClick={handlePrev} style={{
            width: '48px', height: '48px', borderRadius: '50%',
            background: 'var(--color-surface)', border: '1px solid var(--color-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--color-primary)', transition: 'all 0.2s ease'
          }} className="review-nav-btn">
            <ChevronLeft size={24} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              background: 'var(--color-primary)', color: 'var(--color-bg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.2rem', fontWeight: '700'
            }}>
              {currentReview.avatar}
            </div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--color-primary)' }}>{currentReview.name}</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--color-text)' }}>{currentReview.role}</div>
              <div style={{ display: 'flex', gap: '2px', marginTop: '4px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < currentReview.rating ? 'var(--color-accent)' : 'none'} color={i < currentReview.rating ? 'var(--color-accent)' : 'var(--color-border)'} />
                ))}
              </div>
            </div>
          </div>

          <button onClick={handleNext} style={{
            width: '48px', height: '48px', borderRadius: '50%',
            background: 'var(--color-surface)', border: '1px solid var(--color-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--color-primary)', transition: 'all 0.2s ease'
          }} className="review-nav-btn">
            <ChevronRight size={24} />
          </button>
        </div>

      </div>

      <style>{`
        .review-nav-btn:hover {
          background: rgba(11, 30, 57, 0.05) !important;
        }
      `}</style>
    </section>
  );
};

export default Reviews;
