"use client";
import React, { useState, useEffect } from 'react';
import { Briefcase, ShoppingBag, Landmark, Stethoscope, ArrowRight, Check, X, MessageCircle, Code, GraduationCap, Truck, Plane } from 'lucide-react';

const solutions = [
  {
    icon: <ShoppingBag size={24} strokeWidth={1.5} />,
    title: 'E-Commerce Solutions',
    shortDesc: 'Scalable online stores engineered to maximize conversion rates and average order value.',
    desc: 'We build high-performance e-commerce ecosystems. From blazing-fast custom web development to abandoned cart automations and high-ROI digital marketing campaigns, we scale your online sales.',
    topPoints: [
      'Custom Web & Mobile Storefronts',
      'E-Commerce SEO & Performance Ads',
      'Inventory & ERP Automation'
    ],
    bulletPoints: [
      'Custom Web & Mobile Storefront Development',
      'E-Commerce SEO & High-ROI Meta/Google Ads',
      'Automated Abandoned Cart & Email Workflows',
      'Seamless Inventory & ERP Integrations',
      'Headless Architecture for Lightning Speed',
      'Secure Payment Gateway Integrations'
    ]
  },
  {
    icon: <Briefcase size={24} strokeWidth={1.5} />,
    title: 'Corporate & B2B',
    shortDesc: 'Professional digital presence that establishes authority and generates qualified B2B leads.',
    desc: 'Your corporate website should be your best salesperson. We design high-authority B2B web apps, automate your lead generation workflows, and run targeted B2B marketing to capture high-ticket clients.',
    topPoints: [
      'High-Authority Web Development',
      'B2B SEO & Targeted Marketing',
      'CRM & Lead Gen Automation'
    ],
    bulletPoints: [
      'High-Authority Corporate Web Development',
      'B2B SEO & Targeted Digital Marketing',
      'Automated Lead Generation Workflows',
      'Direct CRM Integration (Salesforce, HubSpot)',
      'Client Portals & Secure Document Sharing',
      'Custom Mobile Apps for Internal Teams'
    ]
  },
  {
    icon: <Stethoscope size={24} strokeWidth={1.5} />,
    title: 'Healthcare & Wellness',
    shortDesc: 'HIPAA-compliant platforms with intuitive patient portals and appointment scheduling.',
    desc: 'We empower healthcare providers with secure web and mobile applications. We automate patient onboarding and booking, while leveraging local SEO to drive new patient acquisitions.',
    topPoints: [
      'HIPAA-Compliant Web & Mobile Apps',
      'Automated Appointment Booking',
      'Local SEO for Clinics'
    ],
    bulletPoints: [
      'HIPAA-Compliant Web & Mobile App Development',
      'Local SEO & Digital Marketing for Clinics',
      'Automated Appointment Booking & Reminders',
      'Secure Patient Portals & Telehealth Integrations',
      'Automated Patient Onboarding Workflows',
      'Electronic Health Record (EHR) Integrations'
    ]
  },
  {
    icon: <Landmark size={24} strokeWidth={1.5} />,
    title: 'Real Estate & Property',
    shortDesc: 'Immersive property listings, interactive maps, and automated lead capture for realtors.',
    desc: 'Transform how you showcase properties. We build premium real estate web apps, automate your lead routing to agents, and run targeted ad campaigns to find qualified buyers faster.',
    topPoints: [
      'Premium Real Estate Web Apps',
      'Targeted Buyer Ad Campaigns',
      'Smart Lead Routing Automation'
    ],
    bulletPoints: [
      'Premium Real Estate Web & Mobile Apps',
      'Targeted Digital Marketing for Property Buyers',
      'Smart Lead Routing & CRM Automation',
      'Seamless IDX/MLS Property Integrations',
      'Interactive Neighborhood Maps & 3D Tours',
      'Automated Viewing Scheduling Systems'
    ]
  },
  {
    icon: <Code size={24} strokeWidth={1.5} />,
    title: 'SaaS & Web Apps',
    shortDesc: 'Custom software, dashboards, and scalable SaaS platforms built for high user retention.',
    desc: 'We architect robust web and mobile applications from the ground up. We automate your backend billing operations and implement growth-marketing strategies to acquire and retain software users.',
    topPoints: [
      'Custom Web & Mobile Apps',
      'SaaS Growth Marketing',
      'Billing & Onboarding Automation'
    ],
    bulletPoints: [
      'Custom Web & Mobile App Development',
      'SaaS Growth Marketing & SEO',
      'Automated User Onboarding & Billing Workflows',
      'Scalable Multi-Tenant Backend Architecture',
      'Custom Analytics & Data Dashboards',
      'Third-Party API Integrations (Stripe, Twilio)'
    ]
  },
  {
    icon: <GraduationCap size={24} strokeWidth={1.5} />,
    title: 'EdTech & E-Learning',
    shortDesc: 'Engaging digital learning platforms, LMS integrations, and student management systems.',
    desc: 'Empower educators and students with seamless digital learning experiences. We build custom Learning Management Systems (web/mobile), automate enrollments, and market your courses to a global audience.',
    topPoints: [
      'Custom LMS Web & Mobile Apps',
      'Course Marketing & SEO',
      'Automated Enrollment Workflows'
    ],
    bulletPoints: [
      'Custom LMS Web & Mobile App Development',
      'Digital Marketing to Drive Course Sales',
      'Automated Enrollment & Certification Workflows',
      'Secure Video Streaming & DRM',
      'Interactive Quizzes & Assessments',
      'Student Progress & Analytics Dashboards'
    ]
  },
  {
    icon: <Truck size={24} strokeWidth={1.5} />,
    title: 'Logistics & Supply',
    shortDesc: 'Streamlined operational dashboards, fleet tracking, and inventory management systems.',
    desc: 'Modernize your logistics operations with custom software. We develop web portals and driver mobile apps, while heavily automating dispatch and inventory workflows to reduce overhead.',
    topPoints: [
      'Operations Web Dashboards',
      'Driver & Vendor Mobile Apps',
      'Dispatch & Inventory Automation'
    ],
    bulletPoints: [
      'Custom Web Dashboards for Operations',
      'Native Mobile Apps for Drivers & Vendors',
      'Automated Dispatching & Routing Algorithms',
      'Warehouse & Inventory Automation Integrations',
      'Real-Time Fleet & Asset Tracking',
      'Digital Bill of Lading & Invoicing'
    ]
  },
  {
    icon: <Plane size={24} strokeWidth={1.5} />,
    title: 'Hospitality & Travel',
    shortDesc: 'Direct booking engines, property management, and immersive digital travel experiences.',
    desc: 'Drive direct bookings and elevate the guest experience. We build highly visual hospitality web and mobile apps, run direct-booking ad campaigns, and automate guest communications.',
    topPoints: [
      'Hospitality Web & Mobile Apps',
      'Direct-Booking Ad Campaigns',
      'Automated Guest Communications'
    ],
    bulletPoints: [
      'Hospitality Web & Mobile App Development',
      'High-ROI Ads & SEO for Direct Bookings',
      'Automated Guest Communication (WhatsApp/Email)',
      'Commission-Free Direct Booking Engines',
      'Channel Manager & PMS Integrations',
      'Virtual Tours & Immersive Galleries'
    ]
  }
];

function SolutionCard({ solution, onSelect }) {
  return (
    <div
      className="premium-card service-card"
      onClick={() => onSelect(solution)}
      style={{
        display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer',
        padding: '32px', position: 'relative', overflow: 'hidden', transition: 'all 0.3s ease',
      }}
    >
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '52px', height: '52px', borderRadius: '12px',
            background: 'rgba(11, 30, 57, 0.05)', color: 'var(--color-primary)',
          }}>
            {solution.icon}
          </div>
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-primary)', marginBottom: '12px', lineHeight: '1.3', letterSpacing: '-0.01em', transition: 'color 0.3s ease' }}>
          {solution.title}
        </h3>
        <p style={{ color: 'var(--color-text)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
          {solution.shortDesc}
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
          {solution.topPoints.map((point, idx) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <Check size={16} color="var(--color-accent)" style={{ marginTop: '2px', flexShrink: 0 }} strokeWidth={2.5} />
              <span style={{ color: 'var(--color-text)', fontSize: '0.9rem', lineHeight: '1.4' }}>{point}</span>
            </li>
          ))}
        </ul>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', fontSize: '0.9rem', fontWeight: '600',
          marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--color-border)', transition: 'color 0.3s ease'
        }} className="card-cta">
          <span>View details</span>
          <ArrowRight size={16} className="cta-arrow" style={{ transition: 'transform 0.3s ease' }} />
        </div>
      </div>
    </div>
  );
}

export default function SolutionsPage() {
  const [selectedSolution, setSelectedSolution] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedSolution(null);
    };
    if (selectedSolution) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedSolution]);

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--color-bg)' }}>
      <section style={{ padding: '80px 6%', position: 'relative' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px', maxWidth: '700px', margin: '0 auto 64px' }}>
            <div style={{
              display: 'inline-block', padding: '6px 14px', borderRadius: '100px',
              background: 'rgba(11, 30, 57, 0.05)', border: '1px solid var(--color-border)',
              color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: '600',
              textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '24px'
            }}>
              Industry Solutions
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '20px', color: 'var(--color-primary)', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
              Tailored technology for <span style={{ color: 'var(--color-accent)' }}>your industry.</span>
            </h1>
            <p style={{ color: 'var(--color-text)', fontSize: '1.1rem', lineHeight: '1.6' }}>
              We build specialized digital platforms that solve unique industry challenges and drive measurable growth.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {solutions.map((solution) => (
              <SolutionCard key={solution.title} solution={solution} onSelect={setSelectedSolution} />
            ))}
          </div>
        </div>
      </section>

      {selectedSolution && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'
        }}>
          <div onClick={() => setSelectedSolution(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(11, 30, 57, 0.4)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', animation: 'modalFadeIn 0.3s ease' }} />
          <div style={{ position: 'relative', width: '100%', maxWidth: '860px', maxHeight: '90vh', overflowY: 'auto', background: 'var(--color-surface)', borderRadius: '24px', padding: '40px', boxShadow: '0 24px 48px rgba(11, 30, 57, 0.1)', animation: 'modalSlideUp 0.3s ease' }}>
            <button onClick={() => setSelectedSolution(null)} className="modal-close-btn" style={{ position: 'absolute', top: '24px', right: '24px', background: 'rgba(11, 30, 57, 0.05)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-primary)', transition: 'all 0.2s ease', zIndex: 10 }}>
              <X size={20} />
            </button>
            <div className="modal-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', alignItems: 'start' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(11, 30, 57, 0.05)', color: 'var(--color-primary)', marginBottom: '24px' }}>
                  {selectedSolution.icon}
                </div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '16px', lineHeight: '1.15', letterSpacing: '-0.02em' }}>
                  {selectedSolution.title}
                </h3>
                <p style={{ color: 'var(--color-text)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px' }}>
                  {selectedSolution.desc}
                </p>
              </div>
              <div style={{ background: 'rgba(11, 30, 57, 0.02)', border: '1px solid var(--color-border)', padding: '32px', borderRadius: '16px' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-primary)', marginBottom: '20px' }}>What's Included:</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {selectedSolution.bulletPoints.map((point, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <Check size={16} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '2px' }} strokeWidth={2.5} />
                      <span style={{ fontSize: '0.95rem', color: 'var(--color-text)', lineHeight: '1.4' }}>{point}</span>
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <a href={`https://wa.me/923708316591?text=${encodeURIComponent(`Hi! I am interested in your ${selectedSolution.title} solutions. Can you share more details?`)}`} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textDecoration: 'none', width: '100%', justifyContent: 'center' }}>
                    <MessageCircle size={18} /> Discuss on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .service-card:hover { border-color: var(--color-accent) !important; transform: translateY(-4px); box-shadow: 0 12px 24px rgba(11, 30, 57, 0.05); }
        .service-card:hover .card-cta { color: var(--color-accent) !important; }
        .service-card:hover .cta-arrow { transform: translateX(4px); }
        @keyframes modalFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .modal-close-btn:hover { background: rgba(11, 30, 57, 0.1) !important; }
        @media (max-width: 900px) { .modal-grid { grid-template-columns: 1fr !important; gap: 32px !important; } }
        @media (max-width: 600px) { .service-card { padding: 24px !important; } }
      `}</style>
    </div>
  );
}
