import React, { useState, useEffect, useRef } from 'react';
import { Star, MessageSquare, Quote, Award, X, CheckCircle, ThumbsUp, ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react';
import MagneticCard from './motion/MagneticCard';
import ScrollReveal from './motion/ScrollReveal';

const reviewsData = [
  {
    name: 'Zain Awan',
    role: 'CEO, Awan Digital',
    review: "Webify Pro built our company website and the performance is incredible! The site loads in less than a second and the design is absolutely stunning. Strongly recommended!",
    avatar: 'ZA',
    color: '#00d4ff',
    glow: 'rgba(0,212,255,0.12)',
    border: 'rgba(0,212,255,0.25)',
    rating: 5,
    date: '1 week ago',
    verified: true,
    helpful: 12,
  },
  {
    name: 'Jessica Taylor',
    role: 'E-commerce Brand Owner',
    review: "Our social media engagement grew by 150% under their management. Highly creative posts, perfect branding, and professional delivery. 10/10!",
    avatar: 'JT',
    color: '#06ffa5',
    glow: 'rgba(6,255,165,0.12)',
    border: 'rgba(6,255,165,0.25)',
    rating: 5,
    date: '1 month ago',
    verified: true,
    helpful: 8,
  },
  {
    name: 'Ahmed Raza',
    role: 'Startup Founder',
    review: "The mobile app they built for us exceeded every expectation. Flutter-based, buttery smooth, and deployed to both stores on time. The team is incredibly professional.",
    avatar: 'AR',
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.12)',
    border: 'rgba(168,85,247,0.25)',
    rating: 5,
    date: '2 months ago',
    verified: true,
    helpful: 15,
  },
  {
    name: 'Sara Malik',
    role: 'Digital Marketing Manager',
    review: "Working with Webify Pro on our Google Ads campaigns was a game changer. Our CPC dropped by 40% while conversions doubled. They truly understand data-driven marketing.",
    avatar: 'SM',
    color: '#ff006e',
    glow: 'rgba(255,0,110,0.12)',
    border: 'rgba(255,0,110,0.25)',
    rating: 5,
    date: '3 weeks ago',
    verified: true,
    helpful: 10,
  },
];

const inputStyle = { boxSizing: 'border-box' };

function StarRating({ rating, size = 16 }) {
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          fill={i < rating ? '#f59e0b' : 'transparent'}
          color={i < rating ? '#f59e0b' : 'rgba(255,255,255,0.15)'}
          style={{ filter: i < rating ? 'drop-shadow(0 0 4px rgba(245,158,11,0.5))' : 'none' }}
        />
      ))}
    </div>
  );
}

function ReviewCard({ item, onHelpful }) {
  const [liked, setLiked] = useState(false);
  const [helpCount, setHelpCount] = useState(item.helpful || 0);

  const handleHelpful = () => {
    if (liked) return;
    setLiked(true);
    setHelpCount(c => c + 1);
    onHelpful?.();
  };

  return (
    <MagneticCard
      glowColor={item.color}
      data-cursor-color={item.color}
      tiltStrength={12}
      scaleHover={1.03}
      zDepth={20}
      style={{ height: '100%' }}
    >
      <div
        style={{
          background: 'rgba(5,5,20,0.85)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${item.border}`,
          borderRadius: '22px',
          padding: '32px 28px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          boxSizing: 'border-box',
          transition: 'all 0.3s ease',
        }}
        className="review-card-inner"
      >
        {/* Quote Icon BG */}
        <Quote size={80} style={{
          position: 'absolute', right: '16px', top: '16px',
          color: 'rgba(255,255,255,0.02)', pointerEvents: 'none',
        }} />

        <div>
          {/* Stars, Date, Verified */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '8px' }}>
            <StarRating rating={item.rating} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {item.verified && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '3px',
                  fontSize: '0.64rem', color: '#06ffa5', fontWeight: '700',
                  padding: '2px 7px', borderRadius: '100px',
                  background: 'rgba(6,255,165,0.08)', border: '1px solid rgba(6,255,165,0.2)',
                }}>
                  <BadgeCheck size={10} /> Verified
                </span>
              )}
              <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>
                {item.date}
              </span>
            </div>
          </div>

          {/* Review text */}
          <p style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '0.92rem', lineHeight: '1.7',
            marginBottom: '24px', fontStyle: 'italic',
          }}>
            "{item.review}"
          </p>
        </div>

        {/* Footer: Avatar + Helpful */}
        <div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '14px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '16px', marginBottom: '14px',
          }}>
            {/* Avatar */}
            <div style={{
              width: '44px', height: '44px', borderRadius: '50%',
              background: `linear-gradient(135deg, ${item.color}33, ${item.color}11)`,
              border: `1.5px solid ${item.color}66`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.9rem', fontWeight: '800', color: item.color,
              boxShadow: `0 0 12px ${item.color}25`, fontFamily: 'Outfit, sans-serif',
            }}>
              {item.avatar}
            </div>
            <div style={{ minWidth: 0 }}>
              <h4 className="outfit" style={{ fontSize: '0.96rem', fontWeight: '700', color: '#fff', margin: 0, marginBottom: '2px' }}>
                {item.name}
              </h4>
              <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {item.role}
              </p>
            </div>
          </div>

          {/* Helpful button */}
          <button
            onClick={handleHelpful}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '6px 14px', borderRadius: '100px', cursor: liked ? 'default' : 'pointer',
              background: liked ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${liked ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.08)'}`,
              color: liked ? '#f59e0b' : 'rgba(255,255,255,0.4)',
              fontSize: '0.72rem', fontWeight: '600',
              transition: 'all 0.25s ease',
              fontFamily: 'Outfit, sans-serif',
            }}
            className="helpful-btn"
          >
            <ThumbsUp size={12} />
            Helpful {helpCount > 0 && `(${helpCount})`}
          </button>
        </div>
      </div>
    </MagneticCard>
  );
}

const Reviews = () => {
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('webify_pro_reviews');
    if (saved) {
      try {
        const localRevs = JSON.parse(saved);
        const combined = [...localRevs, ...reviewsData];
        // deduplicate by name
        const seen = new Set();
        return combined.filter(r => {
          if (seen.has(r.name)) return false;
          seen.add(r.name);
          return true;
        });
      } catch { return reviewsData; }
    }
    return reviewsData;
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerRole, setCustomerRole] = useState('');
  const [customerRating, setCustomerRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [filterRating, setFilterRating] = useState(0); // 0 = all
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  // Close form on Escape
  useEffect(() => {
    const handle = (e) => { if (e.key === 'Escape') setIsFormOpen(false); };
    if (isFormOpen) {
      window.addEventListener('keydown', handle);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handle);
      document.body.style.overflow = 'unset';
    };
  }, [isFormOpen]);

  const filteredReviews = filterRating === 0
    ? reviews
    : reviews.filter(r => r.rating === filterRating);

  const averageRating = (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1);
  const reviewsCount = reviews.length;

  // Carousel helpers
  const maxSlide = Math.max(0, filteredReviews.length - 2);

  const slideLeft = () => setCurrentSlide(s => Math.max(s - 1, 0));
  const slideRight = () => setCurrentSlide(s => Math.min(s + 1, maxSlide));

  useEffect(() => {
    setCurrentSlide(0);
  }, [filterRating]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !customerRole || !reviewText) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const colors = ['#00d4ff', '#ff006e', '#a855f7', '#06ffa5'];
      const randomColor = colors[reviews.length % colors.length];
      const parts = customerName.trim().split(' ');
      const avatarInitials = parts.length > 1
        ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
        : parts[0].slice(0, 2).toUpperCase();

      const newReview = {
        name: customerName,
        role: customerRole,
        review: reviewText,
        avatar: avatarInitials,
        color: randomColor,
        glow: `${randomColor}1f`,
        border: `${randomColor}40`,
        rating: customerRating,
        date: 'Just now',
        verified: false,
        helpful: 0,
      };

      const localRevs = JSON.parse(localStorage.getItem('webify_pro_reviews') || '[]');
      localStorage.setItem('webify_pro_reviews', JSON.stringify([newReview, ...localRevs]));

      setReviews([newReview, ...reviews]);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setCustomerName('');
      setCustomerRole('');
      setCustomerRating(5);
      setReviewText('');
    }, 1000);
  };

  return (
    <section id="reviews" style={{ position: 'relative', zIndex: 2 }}>

      {/* Header */}
      <ScrollReveal direction="up">
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '100px',
            border: '1px solid rgba(245,158,11,0.3)', color: '#f59e0b',
            fontSize: '0.76rem', fontWeight: '700', letterSpacing: '0.12em',
            textTransform: 'uppercase', marginBottom: '18px', background: 'rgba(245,158,11,0.06)',
          }}>
            <Award size={13} /> Verified Reviews
          </div>

          <h2 className="outfit" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: '800', marginBottom: '14px', color: '#fff' }}>
            What Our Clients{' '}
            <span style={{
              background: 'linear-gradient(135deg, #f59e0b, #ff006e)',
              backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Say About Us</span>
          </h2>

          {/* Trust badge + Write button */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginTop: '8px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
              padding: '8px 16px', borderRadius: '100px',
            }}>
              <StarRating rating={Math.round(parseFloat(averageRating))} size={14} />
              <span style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.85)', fontWeight: '700', fontFamily: 'Outfit, sans-serif' }}>
                {averageRating}/5 Rating
              </span>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', fontFamily: 'monospace' }}>
                ({reviewsCount} reviews)
              </span>
            </div>

            {/* Filter chips */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {[{ label: 'All', value: 0 }, { label: '⭐⭐⭐⭐⭐', value: 5 }, { label: '⭐⭐⭐⭐', value: 4 }, { label: '⭐⭐⭐', value: 3 }].map(f => (
                <button
                  key={f.value}
                  onClick={() => setFilterRating(f.value)}
                  style={{
                    padding: '6px 14px', borderRadius: '100px', cursor: 'pointer',
                    background: filterRating === f.value ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${filterRating === f.value ? 'rgba(245,158,11,0.5)' : 'rgba(255,255,255,0.1)'}`,
                    color: filterRating === f.value ? '#f59e0b' : 'rgba(255,255,255,0.55)',
                    fontSize: '0.78rem', fontWeight: '600', fontFamily: 'Outfit, sans-serif',
                    transition: 'all 0.2s ease',
                    boxShadow: filterRating === f.value ? '0 0 14px rgba(245,158,11,0.2)' : 'none',
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => { setSubmitSuccess(false); setIsFormOpen(true); }}
              className="write-review-btn"
              style={{
                background: 'rgba(245,158,11,0.08)', border: '1.5px solid rgba(245,158,11,0.4)',
                color: '#f59e0b', padding: '10px 24px', borderRadius: '100px',
                fontWeight: '700', fontSize: '0.88rem', cursor: 'pointer',
                fontFamily: 'Outfit, sans-serif', transition: 'all 0.3s ease',
                boxShadow: '0 0 15px rgba(245,158,11,0.15)',
              }}
            >
              ★ Write a Review
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* Carousel / Grid */}
      <ScrollReveal direction="up">
        {filteredReviews.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>
            No reviews with that rating yet.
          </div>
        ) : (
          <>
            {/* Desktop Grid (≥768px) */}
            <div
              className="reviews-grid-desktop"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: '24px',
              }}
            >
              {filteredReviews.map((item, idx) => (
                <div key={item.name + idx} className={`review-card-float-${idx % 4}`} style={{ height: '100%' }}>
                  <ReviewCard item={item} />
                </div>
              ))}
            </div>

            {/* Mobile Carousel (< 768px) */}
            <div className="reviews-carousel-mobile">
              <div
                ref={sliderRef}
                style={{
                  display: 'flex',
                  gap: '16px',
                  overflowX: 'auto',
                  scrollSnapType: 'x mandatory',
                  scrollBehavior: 'smooth',
                  paddingBottom: '8px',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                {filteredReviews.map((item, idx) => (
                  <div key={item.name + idx} style={{
                    flex: '0 0 85vw',
                    maxWidth: '340px',
                    scrollSnapAlign: 'start',
                  }}>
                    <ReviewCard item={item} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </ScrollReveal>

      {/* Review Modal Form */}
      {isFormOpen && (
        <>
          <div
            onClick={() => setIsFormOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 99999,
              background: 'rgba(2,3,10,0.88)', backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)', animation: 'modalFadeIn 0.3s ease',
            }}
          />
          <div style={{
            position: 'fixed', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 100000, width: 'min(480px, 92vw)',
            background: 'var(--surface-card)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(245,158,11,0.3)',
            borderRadius: '28px',
            padding: '36px',
            boxShadow: '0 40px 100px rgba(0,0,0,0.8), 0 0 60px rgba(245,158,11,0.12)',
            animation: 'modalSlideUp 0.35s cubic-bezier(0.16,1,0.3,1) both',
            boxSizing: 'border-box', textAlign: 'center',
            maxHeight: '90vh', overflowY: 'auto',
          }}>
            <button
              onClick={() => setIsFormOpen(false)}
              style={{
                position: 'absolute', top: '16px', right: '16px',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px', width: '34px', height: '34px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'rgba(255,255,255,0.5)', transition: 'all 0.2s ease', zIndex: 10,
              }}
              className="modal-close-btn"
            >
              <X size={16} />
            </button>

            {submitSuccess ? (
              <div style={{ padding: '20px 0 10px' }}>
                <div style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: '20px' }}>
                  <CheckCircle size={64} color="#06ffa5" style={{ filter: 'drop-shadow(0 0 12px rgba(6,255,165,0.4))' }} />
                </div>
                <h3 className="outfit" style={{ fontSize: '1.6rem', fontWeight: '800', color: '#fff', marginBottom: '12px' }}>
                  Review Published!
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '28px' }}>
                  Thank you for sharing your experience. Your review is now visible on our page.
                </p>
                <button
                  onClick={() => setIsFormOpen(false)}
                  style={{
                    background: 'linear-gradient(135deg, #f59e0b, #ff006e)', border: 'none',
                    borderRadius: '12px', color: '#fff', padding: '14px 28px',
                    fontWeight: '700', fontSize: '0.92rem', cursor: 'pointer', width: '100%',
                    boxShadow: '0 8px 24px rgba(245,158,11,0.3)', transition: 'all 0.3s ease',
                  }}
                  className="success-dismiss-btn"
                >
                  Return to Dashboard
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                <h3 className="outfit" style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', marginBottom: '6px', textAlign: 'center' }}>
                  Write a Review
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.84rem', textAlign: 'center', marginBottom: '24px' }}>
                  Share your experience working with Webify Pro.
                </p>

                {/* Stars */}
                <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {'>'} rating_stars
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[1, 2, 3, 4, 5].map(starVal => {
                      const isActive = hoveredRating !== null ? starVal <= hoveredRating : starVal <= customerRating;
                      return (
                        <Star
                          key={starVal}
                          size={28}
                          fill={isActive ? '#f59e0b' : 'transparent'}
                          color={isActive ? '#f59e0b' : 'rgba(255,255,255,0.25)'}
                          style={{
                            cursor: 'pointer', transition: 'all 0.15s ease',
                            filter: isActive ? 'drop-shadow(0 0 6px rgba(245,158,11,0.6))' : 'none',
                            transform: isActive ? 'scale(1.1)' : 'scale(1)',
                          }}
                          onMouseEnter={() => setHoveredRating(starVal)}
                          onMouseLeave={() => setHoveredRating(null)}
                          onClick={() => setCustomerRating(starVal)}
                        />
                      );
                    })}
                  </div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={labelStyle}>{'>'} customer_name</label>
                  <input type="text" required placeholder="e.g. John Doe"
                    value={customerName} onChange={e => setCustomerName(e.target.value)}
                    style={inputStyle} className="review-form-input" />
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={labelStyle}>{'>'} role_or_company</label>
                  <input type="text" required placeholder="e.g. CEO, Awan Ventures"
                    value={customerRole} onChange={e => setCustomerRole(e.target.value)}
                    style={inputStyle} className="review-form-input" />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={labelStyle}>{'>'} review_text</label>
                  <textarea required rows={4}
                    placeholder="Tell us about the launch... what stood out?"
                    value={reviewText} onChange={e => setReviewText(e.target.value)}
                    style={{ ...inputStyle, resize: 'none' }} className="review-form-input" />
                </div>

                <button type="submit" disabled={isSubmitting}
                  style={{
                    width: '100%', padding: '15px',
                    background: 'linear-gradient(135deg, #f59e0b, #ff006e)',
                    border: 'none', borderRadius: '12px', color: '#fff',
                    fontWeight: '800', fontSize: '0.95rem', fontFamily: 'Outfit, sans-serif',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    boxShadow: '0 8px 24px rgba(245,158,11,0.3)',
                    transition: 'all 0.3s ease', opacity: isSubmitting ? 0.75 : 1,
                  }}
                  className="review-submit-btn"
                >
                  {isSubmitting ? 'Transmitting Data...' : 'Transmit Review'}
                </button>
              </form>
            )}
          </div>
        </>
      )}

      <style>{`
        @keyframes floatCard {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .review-card-float-0 { animation: floatCard 6.5s ease-in-out infinite; }
        .review-card-float-1 { animation: floatCard 7.5s ease-in-out infinite 1.2s; }
        .review-card-float-2 { animation: floatCard 6.0s ease-in-out infinite 0.6s; }
        .review-card-float-3 { animation: floatCard 7.0s ease-in-out infinite 1.8s; }

        .review-card-inner:hover {
          box-shadow: 0 24px 50px rgba(0,0,0,0.5);
          transform: translateY(-2px);
        }
        .helpful-btn:hover:not(:disabled) {
          background: rgba(245,158,11,0.1) !important;
          border-color: rgba(245,158,11,0.3) !important;
          color: #f59e0b !important;
        }
        .write-review-btn:hover {
          box-shadow: 0 0 25px rgba(245,158,11,0.35) !important;
          transform: translateY(-1px);
          background: rgba(245,158,11,0.12) !important;
          border-color: rgba(245,158,11,0.6) !important;
        }
        .review-form-input {
          width: 100%; padding: 12px 14px;
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(245,158,11,0.25);
          border-radius: 10px; color: #fff; outline: none;
          font-family: 'Courier New', monospace; font-size: 15px;
          box-sizing: border-box;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .review-form-input:focus {
          border-color: rgba(245,158,11,0.6) !important;
          box-shadow: 0 0 15px rgba(245,158,11,0.15) !important;
        }
        .review-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(245,158,11,0.45) !important;
        }
        .success-dismiss-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(245,158,11,0.45) !important;
        }
        @keyframes modalFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translate(-50%, calc(-50% + 30px)) scale(0.96); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }

        /* Desktop: grid, hide mobile carousel */
        .reviews-grid-desktop { display: grid; }
        .reviews-carousel-mobile { display: none; }

        /* Mobile: hide grid, show carousel */
        @media (max-width: 640px) {
          .reviews-grid-desktop { display: none !important; }
          .reviews-carousel-mobile { display: block; }
          .reviews-carousel-mobile > div::-webkit-scrollbar { display: none; }
          .reviews-carousel-mobile > div { scrollbar-width: none; }
          .review-card-float-0, .review-card-float-1,
          .review-card-float-2, .review-card-float-3 { animation: none !important; }
        }
      `}</style>
    </section>
  );
};

const labelStyle = {
  display: 'block', marginBottom: '6px',
  fontSize: '0.7rem', color: 'rgba(245,158,11,0.7)',
  fontFamily: 'monospace', letterSpacing: '0.05em',
};

export default Reviews;
