"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Code2, Megaphone, Cpu, Smartphone, X, Check, MessageCircle, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: <Code2 size={24} strokeWidth={1.5} />,
    title: 'Web & App Development',
    shortDesc: 'Custom websites and web applications engineered for speed, scalability, and conversions.',
    desc: 'We build custom, high-performance web applications using modern tech stacks. From blazing-fast landing pages to complex corporate platforms, our code is optimized for SEO and engineered to turn traffic into paying clients.',
    topPoints: [
      'Pixel-Perfect UI that Converts',
      'Lightning Fast Performance',
      'Fully Scalable Architecture'
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
    icon: <Megaphone size={24} strokeWidth={1.5} />,
    title: 'Digital Marketing & SEO',
    shortDesc: 'Data-backed ad campaigns and search optimization designed to scale your revenue.',
    desc: 'Stop wasting ad spend. We create conversion-optimized Meta Ads, Google Ads, and comprehensive digital strategies. By leveraging data-backed competitor targeting and advanced pixel tracking, we ensure maximum return on every dollar spent.',
    topPoints: [
      'Data-Backed Competitor Targeting',
      'Guaranteed Lead Generation',
      'Search Engine Dominance'
    ],
    bulletPoints: [
      'Guaranteed Lead Generation Workflows',
      'High-ROI Ad Campaigns (Google, Meta)',
      'Data-Backed Competitor Targeting',
      'Conversion-Optimized Ad Creatives',
      'Advanced Pixel & Server-Side Tracking',
      'Technical SEO & Content Strategy'
    ]
  },
  {
    icon: <Cpu size={24} strokeWidth={1.5} />,
    title: 'Business Automation',
    shortDesc: 'Streamline your operations with intelligent software and automated workflows.',
    desc: 'We eliminate manual tasks and bottlenecks in your business. By integrating intelligent software and building custom automation workflows, we help you save time, reduce errors, and focus on scaling your business.',
    topPoints: [
      'Custom CRM & ERP Integrations',
      'Automated Lead Nurturing',
      'Operational Efficiency'
    ],
    bulletPoints: [
      'Custom CRM & ERP Integrations',
      'Automated Lead Nurturing Sequences',
      'Payment Gateway Integrations',
      'Inventory & Order Management Systems',
      'Zapier & Custom API Connections',
      'Ongoing Technical Support'
    ]
  },
  {
    icon: <Smartphone size={24} strokeWidth={1.5} />,
    title: 'Mobile Applications',
    shortDesc: 'Cross-platform iOS and Android apps built with modern frameworks.',
    desc: 'From concept to App Store, we design and develop performance-driven mobile applications. We deliver premium native UI experiences with offline capabilities, push notifications, and secure in-app payments to drive massive user engagement.',
    topPoints: [
      'Premium Native iOS & Android UI',
      'Push Notifications for Engagement',
      'Secure In-App Payments'
    ],
    bulletPoints: [
      'Premium Native iOS & Android UI',
      'Offline Capabilities & Background Sync',
      'Push Notifications to Drive Engagement',
      'Secure In-App Payments & Subscriptions',
      'Seamless App Store & Play Store Launch',
      'Automated QA & Crash Analytics'
    ]
  }
];

function ServiceCard({ service, onSelect }) {
  return (
    <div
      className="premium-card service-card"
      onClick={() => onSelect(service)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        cursor: 'pointer',
        padding: '32px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Header Area */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '52px', height: '52px', borderRadius: '12px',
            background: 'rgba(11, 30, 57, 0.05)',
            color: 'var(--color-primary)',
          }}>
            {service.icon}
          </div>
        </div>

        {/* Titles & Desc */}
        <h3 style={{ 
          fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-primary)', marginBottom: '12px', lineHeight: '1.3', letterSpacing: '-0.01em',
          transition: 'color 0.3s ease'
        }}>
          {service.title}
        </h3>
        <p style={{ color: 'var(--color-text)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
          {service.shortDesc}
        </p>

        {/* Key Bullet Points directly on the card */}
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
          {service.topPoints.map((point, idx) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <Check size={16} color="var(--color-accent)" style={{ marginTop: '2px', flexShrink: 0 }} strokeWidth={2.5} />
              <span style={{ color: 'var(--color-text)', fontSize: '0.9rem', lineHeight: '1.4' }}>{point}</span>
            </li>
          ))}
        </ul>

        {/* Bottom CTA */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: 'auto',
          paddingTop: '20px',
          borderTop: '1px solid var(--color-border)',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            color: 'var(--color-primary)', fontSize: '0.9rem', fontWeight: '600',
            transition: 'color 0.3s ease'
          }} className="card-cta">
            <span>View details</span>
          </div>
          <Link 
            href="/start-project" 
            onClick={(e) => e.stopPropagation()}
            style={{
              padding: '8px 16px', borderRadius: '8px', background: 'var(--color-primary)', 
              color: '#fff', fontSize: '0.85rem', fontWeight: '600', textDecoration: 'none',
              transition: 'opacity 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            Start Project
          </Link>
        </div>
      </div>
    </div>
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
    <section id="services" style={{ padding: '100px 6%', background: 'var(--color-bg)', position: 'relative' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px', maxWidth: '700px', margin: '0 auto 64px' }}>
          <div style={{
            display: 'inline-block', padding: '6px 14px', borderRadius: '100px',
            background: 'rgba(11, 30, 57, 0.05)', border: '1px solid var(--color-border)',
            color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: '600',
            textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '24px'
          }}>
            Services
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '20px', color: 'var(--color-primary)', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
            Everything you need to <span style={{ color: 'var(--color-accent)' }}>grow online.</span>
          </h2>
          <p style={{ color: 'var(--color-text)', fontSize: '1.1rem', lineHeight: '1.6' }}>
            We provide end-to-end digital solutions designed for performance, scalability, and measurable business growth.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} onSelect={setSelectedService} />
          ))}
        </div>
      </div>

      {/* Premium Detail Modal */}
      {selectedService && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '24px'
        }}>
          <div
            onClick={() => setSelectedService(null)}
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(11, 30, 57, 0.4)',
              backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
              animation: 'modalFadeIn 0.3s ease',
            }}
          />
          <div
            style={{
              position: 'relative',
              width: '100%', maxWidth: '860px', maxHeight: '90vh', overflowY: 'auto',
              background: 'var(--color-surface)',
              borderRadius: '24px', padding: '40px',
              boxShadow: '0 24px 48px rgba(11, 30, 57, 0.1)',
              animation: 'modalSlideUp 0.3s ease',
            }}
          >
            <button
              onClick={() => setSelectedService(null)}
              style={{
                position: 'absolute', top: '24px', right: '24px',
                background: 'rgba(11, 30, 57, 0.05)', border: 'none',
                borderRadius: '50%', width: '40px', height: '40px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--color-primary)',
                transition: 'all 0.2s ease', zIndex: 10,
              }}
              className="modal-close-btn"
            >
              <X size={20} />
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', alignItems: 'start' }} className="modal-grid">
              <div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: '56px', height: '56px', borderRadius: '14px',
                  background: 'rgba(11, 30, 57, 0.05)',
                  color: 'var(--color-primary)', marginBottom: '24px',
                }}>
                  {selectedService.icon}
                </div>
                
                <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '16px', lineHeight: '1.15', letterSpacing: '-0.02em' }}>
                  {selectedService.title}
                </h3>

                <p style={{ color: 'var(--color-text)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px' }}>
                  {selectedService.desc}
                </p>
              </div>

              <div style={{ background: 'rgba(11, 30, 57, 0.02)', border: '1px solid var(--color-border)', padding: '32px', borderRadius: '16px' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-primary)', marginBottom: '20px' }}>
                  What's Included:
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {selectedService.bulletPoints.map((point, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <Check size={16} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '2px' }} strokeWidth={2.5} />
                      <span style={{ fontSize: '0.95rem', color: 'var(--color-text)', lineHeight: '1.4' }}>
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <a
                    href={`https://wa.me/923708316591?text=${encodeURIComponent(`Hi! I am interested in your ${selectedService.title} service. Can you share more details?`)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ textDecoration: 'none', width: '100%', justifyContent: 'center' }}
                  >
                    <MessageCircle size={18} />
                    Discuss on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .service-card:hover {
          border-color: var(--color-accent) !important;
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(11, 30, 57, 0.05);
        }
        .service-card:hover .card-cta {
          color: var(--color-accent) !important;
        }
        .service-card:hover .cta-arrow {
          transform: translateX(4px);
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .modal-close-btn:hover {
          background: rgba(11, 30, 57, 0.1) !important;
        }

        @media (max-width: 900px) {
          .modal-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 600px) {
          .service-card { padding: 24px !important; }
        }
      `}</style>
    </section>
  );
};

export default Services;
