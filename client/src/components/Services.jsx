import React, { useState, useEffect } from 'react';
import { Code2, Megaphone, Cpu, Smartphone, X, Check, MessageCircle, ArrowRight } from 'lucide-react';
import MagneticCard from './motion/MagneticCard';
import ScrollReveal from './motion/ScrollReveal';

const services = [
  {
    icon: <Code2 size={28} strokeWidth={1.5} />,
    title: 'High-Performance Web Solutions',
    shortDesc: 'Custom websites engineered for speed, scalability, and conversions.',
    desc: 'We build custom, high-performance web applications using React, Node.js, and the MERN stack. From blazing-fast landing pages to complex corporate platforms, our code is optimized for SEO and engineered to turn traffic into paying clients.',
    color: '#00D4FF',
    glow: 'rgba(0,212,255,0.15)',
    border: 'rgba(0,212,255,0.3)',
    tag: 'Web & App Development',
    topPoints: [
      'Pixel-Perfect UI that Converts',
      'Lightning Fast (LCP < 1.5s)',
      'Fully Scalable Backend Architecture'
    ],
    bulletPoints: [
      'Pixel-Perfect UI that Converts',
      'Lightning Fast (LCP < 1.5s) for SEO',
      'Fully Scalable Backend Architecture',
      'Bank-Level Security & Data Protection',
      'Automated Workflows & Integrations',
      '1 Month Post-Launch Growth Support'
    ]
  },
  {
    icon: <Megaphone size={28} strokeWidth={1.5} />,
    title: 'ROI-Driven Digital Marketing',
    shortDesc: 'Data-backed ad campaigns designed to scale your revenue.',
    desc: 'Stop wasting ad spend. We create conversion-optimized Meta Ads, Google Ads, and comprehensive digital strategies. By leveraging data-backed competitor targeting and advanced pixel tracking, we ensure maximum return on every dollar spent.',
    color: '#1E6FEA',
    glow: 'rgba(30,111,234,0.15)',
    border: 'rgba(30,111,234,0.3)',
    tag: 'Growth & Advertising',
    topPoints: [
      'Massive ROAS on Meta Ad Campaigns',
      'Data-Backed Competitor Targeting',
      'Guaranteed Lead Generation'
    ],
    bulletPoints: [
      'Guaranteed Lead Generation Workflows',
      'Massive ROAS on Meta Ad Campaigns',
      'Data-Backed Competitor Targeting',
      'Conversion-Optimized Ad Creatives',
      'Advanced Pixel & Server-Side Tracking',
      'Transparent Weekly KPI Reporting'
    ]
  },
  {
    icon: <Cpu size={28} strokeWidth={1.5} />,
    title: 'Strategic Social Media Management',
    shortDesc: 'Omnichannel brand building and viral content creation.',
    desc: 'We take over your brand presence across all major social media platforms. With viral-engineered short-form content, consistent omnichannel brand voice, and active community management, we turn followers into loyal customers.',
    color: '#10B981',
    glow: 'rgba(16,185,129,0.15)',
    border: 'rgba(16,185,129,0.3)',
    tag: 'Brand Presence',
    topPoints: [
      'Viral-Engineered Short Form Content',
      'Consistent Omnichannel Voice',
      'Algorithmic Trend Riding & SEO'
    ],
    bulletPoints: [
      'Viral-Engineered Short Form Content',
      'Consistent Omnichannel Brand Voice',
      'Active Community Management',
      'Algorithmic Trend Riding & SEO',
      'Premium Visual Identity & Graphics',
      'Monthly Growth & Conversion Analytics'
    ]
  },
  {
    icon: <Smartphone size={28} strokeWidth={1.5} />,
    title: 'Premium Mobile Applications',
    shortDesc: 'Cross-platform iOS and Android apps built with Flutter.',
    desc: 'From concept to App Store, we design and develop performance-driven mobile applications. We deliver premium native UI experiences with offline capabilities, push notifications, and secure in-app payments to drive massive user engagement.',
    color: '#A855F7',
    glow: 'rgba(168,85,247,0.15)',
    border: 'rgba(168,85,247,0.3)',
    tag: 'iOS & Android (Soon)',
    topPoints: [
      'Premium Native iOS & Android UI',
      'Push Notifications to Drive Engagement',
      'Secure In-App Payments'
    ],
    bulletPoints: [
      'Premium Native iOS & Android UI',
      'Offline Capabilities & Background Sync',
      'Push Notifications to Drive Engagement',
      'Secure In-App Payments & Subscriptions',
      'Seamless App Store & Play Store Launch',
      'Automated QA & Crash Analytics'
    ],
    soon: true
  }
];

function PremiumServiceCard({ service, onSelect }) {
  return (
    <MagneticCard
      glowColor={service.color}
      data-cursor-color={service.color}
      tiltStrength={8}
      scaleHover={1.02}
      zDepth={20}
      style={{ height: '100%' }}
    >
      <div
        className="premium-service-card"
        onClick={() => onSelect(service)}
        style={{
          background: 'rgba(10, 12, 25, 0.7)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '24px',
          padding: '36px 32px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          cursor: 'pointer',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Animated Background Gradient on Hover */}
        <div className="card-hover-gradient" style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${service.glow}, transparent 40%)`,
          opacity: 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>
          {/* Header Area */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '58px', height: '58px', borderRadius: '16px',
              background: `linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))`,
              border: `1px solid rgba(255,255,255,0.08)`,
              color: service.color,
              boxShadow: `inset 0 0 20px ${service.glow}, 0 8px 16px rgba(0,0,0,0.4)`,
            }}>
              {service.icon}
            </div>
            
            <div style={{
              padding: '6px 12px',
              borderRadius: '100px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              fontSize: '0.7rem',
              fontWeight: '600',
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              {service.tag}
            </div>
          </div>

          {/* Titles & Desc */}
          <h3 className="outfit card-title" style={{ 
            fontSize: '1.25rem', fontWeight: '700', color: '#fff', marginBottom: '12px', lineHeight: '1.3', letterSpacing: '-0.01em',
            transition: 'color 0.3s ease'
          }}>
            {service.title}
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
            {service.shortDesc}
          </p>

          {/* Key Bullet Points directly on the card */}
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
            {service.topPoints.map((point, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Check size={16} color={service.color} style={{ marginTop: '2px', flexShrink: 0 }} strokeWidth={2.5} />
                <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem', lineHeight: '1.4' }}>{point}</span>
              </li>
            ))}
          </ul>

          {/* Bottom CTA */}
          <div className="card-cta" style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            color: service.color, fontSize: '0.9rem', fontWeight: '600',
            marginTop: 'auto',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255,255,255,0.05)'
          }}>
            <span>View full details</span>
            <ArrowRight size={16} className="cta-arrow" style={{ transition: 'transform 0.3s ease' }} />
          </div>
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

  // Handle mouse move for gradient effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll('.premium-service-card');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="services" style={{ position: 'relative', zIndex: 2 }}>
      {/* Header */}
      <ScrollReveal direction="up">
        <div style={{ textAlign: 'center', marginBottom: '70px', maxWidth: '800px', margin: '0 auto 70px auto' }}>
          <div style={{
            display: 'inline-block', padding: '6px 16px', borderRadius: '100px',
            border: '1px solid rgba(0, 212, 255, 0.25)', color: '#00D4FF',
            fontSize: '0.78rem', fontWeight: '700', letterSpacing: '0.12em',
            textTransform: 'uppercase', marginBottom: '22px', background: 'rgba(0, 212, 255, 0.05)',
          }}>◈ Core Capabilities</div>
          
          <h2 className="outfit" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: '800', marginBottom: '20px', color: '#fff', lineHeight: '1.2' }}>
            Solutions engineered to scale your{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00D4FF 0%, #1E6FEA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>Revenue</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '640px', margin: '0 auto', lineHeight: '1.7', fontSize: '1.05rem' }}>
            We don't just build websites; we build high-converting digital assets that turn traffic into paying clients and drive measurable business growth.
          </p>
        </div>
      </ScrollReveal>

      {/* Grid */}
      <ScrollReveal
        direction="up"
        stagger={0.15}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: '28px',
        }}
      >
        {services.map((service) => (
          <PremiumServiceCard key={service.title} service={service} onSelect={setSelectedService} />
        ))}
      </ScrollReveal>

      {/* Premium Detail Modal */}
      {selectedService && (
        <>
          <div
            onClick={() => setSelectedService(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 99999,
              background: 'rgba(2, 3, 10, 0.88)',
              backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
              animation: 'modalFadeIn 0.3s ease',
            }}
          />
          <div
            style={{
              position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              zIndex: 100000, width: 'min(860px, 95vw)', maxHeight: '95vh', overflowY: 'auto',
              background: 'linear-gradient(145deg, rgba(12,14,28,0.95), rgba(8,10,20,0.98))',
              border: `1px solid ${selectedService.border}`,
              borderRadius: '24px', padding: '32px',
              boxShadow: `0 40px 100px rgba(0,0,0,0.8), 0 0 80px ${selectedService.glow}`,
              animation: 'modalSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
              boxSizing: 'border-box',
            }}
            className="service-modal-scroll"
          >
            <button
              onClick={() => setSelectedService(null)}
              style={{
                position: 'absolute', top: '24px', right: '24px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px', width: '42px', height: '42px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'rgba(255,255,255,0.6)',
                transition: 'all 0.2s ease', zIndex: 10,
              }}
              className="modal-close-btn"
            >
              <X size={20} />
            </button>

            <div className="modal-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', alignItems: 'start' }}>
              <div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: '52px', height: '52px', borderRadius: '14px',
                  background: `linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))`,
                  border: `1px solid ${selectedService.border}`,
                  color: selectedService.color, marginBottom: '16px',
                  boxShadow: `inset 0 0 24px ${selectedService.glow}, 0 12px 24px rgba(0,0,0,0.5)`,
                }}>
                  {selectedService.icon}
                </div>
                
                <h3 className="outfit" style={{ fontSize: '1.7rem', fontWeight: '800', color: '#fff', marginBottom: '10px', lineHeight: '1.15' }}>
                  {selectedService.title}
                </h3>
                
                <div style={{
                  display: 'inline-block', padding: '6px 14px', borderRadius: '100px',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  fontSize: '0.75rem', color: selectedService.color, fontWeight: '700',
                  letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '16px',
                }}>
                  {selectedService.tag}
                </div>

                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '16px' }}>
                  {selectedService.desc}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)', padding: '24px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.03)' }}>
                <div>
                  <h4 className="outfit" style={{ fontSize: '1rem', fontWeight: '700', color: '#fff', marginBottom: '16px' }}>
                    What You Get:
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                    {selectedService.bulletPoints.map((point, index) => (
                      <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <div style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          width: '20px', height: '20px', borderRadius: '50%',
                          background: `${selectedService.color}15`,
                          border: `1px solid ${selectedService.color}40`,
                          color: selectedService.color, flexShrink: 0, marginTop: '2px'
                        }}>
                          <Check size={12} strokeWidth={3} />
                        </div>
                        <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)', lineHeight: '1.4' }}>
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('select-service', { detail: selectedService.title }));
                      setSelectedService(null);
                    }}
                    style={{
                      width: '100%', padding: '14px',
                      background: `linear-gradient(135deg, ${selectedService.color}, ${selectedService.color}cc)`,
                      border: 'none', borderRadius: '12px',
                      color: selectedService.title === 'Premium Mobile Applications' || selectedService.title === 'ROI-Driven Digital Marketing' ? '#fff' : '#000',
                      fontWeight: '800', fontSize: '0.95rem', fontFamily: 'Outfit, sans-serif',
                      cursor: 'pointer', boxShadow: `0 12px 28px ${selectedService.glow}`,
                      transition: 'all 0.3s ease',
                    }}
                    className="modal-order-btn"
                  >
                    Start Project
                  </button>

                  <button
                    onClick={() => {
                      const waText = `Hi! I am interested in your ${selectedService.title} service. Can you share more details?`;
                      const waUrl = `https://wa.me/923708316591?text=${encodeURIComponent(waText)}`;
                      window.open(waUrl, '_blank');
                    }}
                    style={{
                      width: '100%', padding: '12px',
                      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px', color: '#fff', fontWeight: '700', fontSize: '0.9rem',
                      fontFamily: 'Outfit, sans-serif', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.3s ease',
                    }}
                    className="modal-wa-btn"
                  >
                    <MessageCircle size={16} color="#25d366" />
                    <span>Chat on WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        .premium-service-card:hover {
          border-color: rgba(255, 255, 255, 0.15) !important;
          transform: translateY(-4px);
        }
        .premium-service-card:hover .card-hover-gradient { opacity: 1 !important; }
        .premium-service-card:hover .card-title { color: #00D4FF !important; }
        .premium-service-card:hover .cta-arrow { transform: translateX(6px); }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translate(-50%, calc(-50% + 40px)) scale(0.95); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }

        .modal-close-btn:hover {
          background: rgba(255,255,255,0.15) !important;
          color: #fff !important;
          transform: rotate(90deg);
        }
        .modal-order-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }
        .modal-wa-btn:hover {
          background: rgba(255,255,255,0.08) !important;
          border-color: rgba(255,255,255,0.2) !important;
        }

        @media (max-width: 900px) {
          .modal-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .service-modal-scroll { padding: 32px 24px !important; }
        }
        @media (max-width: 600px) {
          .premium-service-card { padding: 28px 24px !important; }
          .modal-close-btn { top: 16px !important; right: 16px !important; }
        }
      `}</style>
    </section>
  );
};

export default Services;
