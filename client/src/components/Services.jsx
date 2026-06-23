import React, { useState, useEffect } from 'react';
import { Code2, Megaphone, Cpu, Smartphone, X, Check, MessageCircle } from 'lucide-react';
import MagneticCard from './motion/MagneticCard';
import ScrollReveal from './motion/ScrollReveal';

const services = [
  {
    icon: <Code2 size={26} />,
    title: 'Web Development',
    desc: 'Custom high-performance websites built with React, Node.js, and the full MERN stack. Java-powered backends, blazing-fast frontends.',
    color: '#00d4ff',
    glow: 'rgba(0,212,255,0.12)',
    border: 'rgba(0,212,255,0.25)',
    tag: 'React · Node.js · MERN',
    bulletPoints: [
      'Custom React Frontend & UI/UX Design',
      'Production-Ready Backend & Databases',
      'Full Search Engine Optimization (SEO)',
      'Highly Secure Architecture & User Auth',
      'Ultra-Fast Load Times (95+ Lighthouse)',
      '1 Month of Free Maintenance & Updates'
    ]
  },
  {
    icon: <Megaphone size={26} />,
    title: 'Digital Marketing',
    desc: 'Meta Ads, Facebook Page growth, and comprehensive digital strategies to boost your online presence and ROI.',
    color: '#ff006e',
    glow: 'rgba(255,0,110,0.12)',
    border: 'rgba(255,0,110,0.25)',
    tag: 'Meta Ads · Facebook · Growth',
    bulletPoints: [
      'High-Converting Meta Ads Campaigns',
      'Facebook & Instagram Organic Growth',
      'Precision Demographics & Competitor Target',
      'High-ROI Copywriting & Creative Design',
      'Pixel Tracking & Conversions API Setup',
      'Weekly In-Depth Performance Audits'
    ]
  },
  {
    icon: <Smartphone size={26} />,
    title: 'Mobile Application',
    desc: 'Performance-driven cross-platform mobile apps built with Flutter for both iOS and Android — concept to App Store.',
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.12)',
    border: 'rgba(168,85,247,0.25)',
    tag: 'Flutter · Dart · Firebase',
    bulletPoints: [
      'Cross-Platform iOS & Android App',
      'Interactive, Native Fluid UI/UX',
      'Firebase Cloud Infrastructure Sync',
      'Push Notifications & App Settings',
      'App Store & Play Store Submissions',
      'Custom REST API & Web Server Integrations'
    ]
  },
  {
    icon: <Cpu size={26} />,
    title: 'Social Media Management',
    desc: 'Building and managing your brand presence across all major social media platforms with data-driven content strategies.',
    color: '#06ffa5',
    glow: 'rgba(6,255,165,0.12)',
    border: 'rgba(6,255,165,0.25)',
    tag: 'Instagram · TikTok · Strategy',
    bulletPoints: [
      'Curated Reels, Carousels & Posts',
      'Brand Tone Strategy & High-value Copy',
      'Hashtag & SEO Algorithm Research',
      'Professional Logo / Theme Coherence',
      'Engaging Community Reply Management',
      'Monthly Growth Metrics & Competitor Audits'
    ]
  },
];

function ServiceCard({ service, onSelect }) {
  return (
    <MagneticCard
      glowColor={service.color}
      data-cursor-color={service.color}
      tiltStrength={15}
      scaleHover={1.03}
      zDepth={25}
      style={{ height: '100%' }}
    >
      <div
        style={{
          background: 'rgba(5,5,20,0.85)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${service.border}`,
          borderRadius: '22px',
          padding: '32px 28px',
          position: 'relative',
          overflow: 'hidden',
          transformStyle: 'preserve-3d',
          transition: 'box-shadow 0.4s ease, border-color 0.3s ease',
          height: '100%',
          cursor: 'pointer',
        }}
        onClick={() => onSelect(service)}
        className="service-card-3d"
      >
        {/* Scan line */}
        <div className="scan-line" style={{ '--sc': service.color }} />

        {/* BG glow */}
        <div style={{
          position: 'absolute', top: '-25%', right: '-15%',
          width: '160px', height: '160px',
          background: `radial-gradient(circle, ${service.glow} 0%, transparent 70%)`,
          borderRadius: '50%', pointerEvents: 'none',
        }} />

        {/* Corner accents */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: '50px', height: '50px',
          borderTop: `2px solid ${service.color}`,
          borderRight: `2px solid ${service.color}`,
          borderRadius: '0 22px 0 0', opacity: 0.45,
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          width: '36px', height: '36px',
          borderBottom: `2px solid ${service.color}`,
          borderLeft: `2px solid ${service.color}`,
          borderRadius: '0 0 0 22px', opacity: 0.25,
        }} />

        {/* Icon */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '52px', height: '52px', borderRadius: '14px',
          background: service.glow, border: `1px solid ${service.border}`,
          color: service.color, marginBottom: '20px',
          boxShadow: `0 0 18px ${service.glow}`,
        }}>{service.icon}</div>

        {/* Tag */}
        <div style={{
          fontSize: '0.67rem', color: service.color, fontWeight: '700',
          letterSpacing: '0.07em', marginBottom: '10px',
          textTransform: 'uppercase', opacity: 0.8,
        }}>{service.tag}</div>

        {/* Title */}
        <h3 className="outfit" style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '10px', color: '#fff' }}>
          {service.title}
        </h3>

        {/* Desc */}
        <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.9rem', lineHeight: '1.65' }}>
          {service.desc}
        </p>

        {/* Bottom CTA */}
        <div style={{
          marginTop: '24px', display: 'flex', alignItems: 'center', gap: '8px',
          color: service.color, fontSize: '0.8rem', fontWeight: '600',
        }}>
          <span>Learn more</span>
          <span className="arrow-line" style={{
            display: 'inline-block', width: '22px', height: '1px',
            background: service.color, transition: 'width 0.3s ease',
          }} />
        </div>
      </div>
    </MagneticCard>
  );
}

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedService(null);
    };
    if (selectedService) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedService]);

  return (
    <section id="services" style={{ position: 'relative', zIndex: 2 }}>
      {/* Header */}
      <ScrollReveal direction="up">
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            display: 'inline-block', padding: '6px 16px', borderRadius: '100px',
            border: '1px solid rgba(99,102,241,0.3)', color: '#6366f1',
            fontSize: '0.76rem', fontWeight: '700', letterSpacing: '0.12em',
            textTransform: 'uppercase', marginBottom: '18px', background: 'rgba(99,102,241,0.07)',
          }}>◈ What We Offer</div>
          <h2 className="outfit" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: '800', marginBottom: '14px', color: '#fff' }}>
            Our Professional{' '}
            <span style={{
              background: 'linear-gradient(135deg, #6366f1, #00d4ff)',
              backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Services</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '560px', margin: '0 auto', lineHeight: '1.7', fontSize: '0.95rem' }}>
            A comprehensive range of digital solutions tailored to your business needs — from web to your customers' pockets.
          </p>
        </div>
      </ScrollReveal>

      {/* Grid */}
      <ScrollReveal
        direction="up"
        stagger={0.12}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
          gap: '24px',
        }}
      >
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} onSelect={setSelectedService} />
        ))}
      </ScrollReveal>

      {/* Premium Detail Modal */}
      {selectedService && (
        <>
          {/* Modal Backdrop */}
          <div
            onClick={() => setSelectedService(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              background: 'rgba(2, 3, 10, 0.88)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              animation: 'modalFadeIn 0.3s ease',
            }}
          />
          {/* Modal Card */}
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 100000,
              width: 'min(780px, 92vw)',
              maxHeight: '85vh',
              overflowY: 'auto',
              background: 'linear-gradient(135deg, rgba(8,8,24,0.98), rgba(12,12,35,0.98))',
              border: `1px solid ${selectedService.border}`,
              borderRadius: '28px',
              padding: '36px',
              boxShadow: '0 40px 100px rgba(0,0,0,0.8), 0 0 60px rgba(99,102,241,0.15)',
              animation: 'modalSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
              boxSizing: 'border-box',
            }}
            className="service-modal-scroll"
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedService(null)}
              style={{
                position: 'absolute', top: '20px', right: '20px',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px', width: '38px', height: '38px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'rgba(255,255,255,0.5)',
                transition: 'all 0.2s ease',
                zIndex: 10,
              }}
              className="modal-close-btn"
            >
              <X size={18} />
            </button>

            {/* Content layout */}
            <div className="modal-grid" style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.1fr',
              gap: '36px',
              alignItems: 'start',
            }}>
              {/* Left Column: Details */}
              <div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: '56px', height: '56px', borderRadius: '16px',
                  background: selectedService.glow, border: `1px solid ${selectedService.border}`,
                  color: selectedService.color, marginBottom: '24px',
                  boxShadow: `0 0 20px ${selectedService.glow}`,
                }}>
                  {selectedService.icon}
                </div>
                
                <h3 className="outfit" style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fff', marginBottom: '8px', lineHeight: '1.2' }}>
                  {selectedService.title}
                </h3>
                
                <div style={{
                  fontSize: '0.72rem', color: selectedService.color, fontWeight: '700',
                  letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '18px',
                }}>
                  {selectedService.tag}
                </div>

                <p style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.94rem',
                  lineHeight: '1.75',
                  marginBottom: '28px',
                }}>
                  {selectedService.desc}
                </p>
              </div>

              {/* Right Column: Checklist & CTAs */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'space-between',
              }}>
                <div>
                  <h4 className="outfit" style={{ fontSize: '1.05rem', fontWeight: '700', color: '#fff', marginBottom: '16px' }}>
                    What's Included:
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                    {selectedService.bulletPoints.map((point, index) => (
                      <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          width: '20px', height: '20px', borderRadius: '50%',
                          background: `${selectedService.color}18`,
                          border: `1px solid ${selectedService.color}40`,
                          color: selectedService.color,
                          flexShrink: 0,
                        }}>
                          <Check size={11} strokeWidth={3} />
                        </div>
                        <span style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.4' }}>
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTAs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <button
                    onClick={() => {
                      // Dispatch custom event to select service in form and scroll to order form
                      window.dispatchEvent(new CustomEvent('select-service', { detail: selectedService.title }));
                      setSelectedService(null);
                    }}
                    style={{
                      width: '100%',
                      padding: '15px',
                      background: `linear-gradient(135deg, ${selectedService.color}, ${selectedService.color}dd)`,
                      border: 'none',
                      borderRadius: '12px',
                      color: selectedService.title === 'Web Development' || selectedService.title === 'Social Media Management' ? '#000' : '#fff',
                      fontWeight: '800',
                      fontSize: '0.95rem',
                      fontFamily: 'Outfit, sans-serif',
                      cursor: 'pointer',
                      boxShadow: `0 8px 24px ${selectedService.glow}`,
                      transition: 'all 0.3s ease',
                    }}
                    className="modal-order-btn"
                  >
                    Order {selectedService.title}
                  </button>

                  <button
                    onClick={() => {
                      const waText = `Hi! I am interested in your ${selectedService.title} service. Can you share more details?`;
                      const waUrl = `https://wa.me/923708316591?text=${encodeURIComponent(waText)}`;
                      window.open(waUrl, '_blank');
                    }}
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontWeight: '700',
                      fontSize: '0.9rem',
                      fontFamily: 'Outfit, sans-serif',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                    className="modal-wa-btn"
                  >
                    <MessageCircle size={16} color="#25d366" />
                    <span>Inquire on WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        .scan-line {
          position: absolute; top: -100%; left: 0; width: 100%; height: 2px;
          background: linear-gradient(90deg, transparent, var(--sc, #6366f1), transparent);
          opacity: 0; pointer-events: none;
        }
        .service-card-3d:hover .scan-line { animation: scan 3.5s ease-in-out; opacity: 1; }
        @keyframes scan {
          0% { top: -5%; opacity: 0; }
          20% { opacity: 0.6; }
          100% { top: 110%; opacity: 0; }
        }
        .service-card-3d:hover { box-shadow: 0 24px 50px rgba(0,0,0,0.5); }
        .service-card-3d:hover .arrow-line { width: 38px !important; }
        
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translate(-50%, calc(-50% + 30px)) scale(0.96); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }

        .modal-close-btn:hover {
          background: rgba(255,255,255,0.12) !important;
          color: rgba(255,255,255,0.85) !important;
        }
        .modal-order-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(255,255,255,0.1) !important;
        }
        .modal-wa-btn:hover {
          background: rgba(255,255,255,0.08) !important;
          border-color: rgba(255,255,255,0.2) !important;
        }

        @media (max-width: 720px) {
          .modal-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
          .modal-close-btn { top: 14px !important; right: 14px !important; }
          .service-modal-scroll { padding: 28px 20px !important; }
        }
        @media (max-width: 600px) {
          .service-card-3d { transform: none !important; }
        }
      `}</style>
    </section>
  );
};

export default Services;
