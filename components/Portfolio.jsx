"use client";
import React, { useState } from 'react';
import { ArrowRight, X, Globe } from 'lucide-react';

const projects = [
  {
    title: 'E-Commerce Growth for Luxe Brands',
    category: 'Digital Marketing',
    image: '/images/digital-media-marketing.png',
    link: '#',
    liveUrl: null,
    tags: ['Meta Ads', 'Conversion Rate'],
    desc: 'Completely overhauled their ad strategy and creative. We scaled their ad spend profitably, resulting in a massive increase in revenue and ROI.',
    tech: ['Decreased CPA by 40%', 'Generated 150% more leads', '3.5x ROAS'],
    client: 'Luxe Brands',
    duration: '6 Months',
  },
  {
    title: 'B2B Lead Gen Portal',
    category: 'Web Development',
    image: '/images/web-dev.jpg',
    link: '#',
    liveUrl: 'https://www.webifypro.live',
    tags: ['React', 'MERN Stack'],
    desc: 'Built a lightning-fast custom web application designed specifically to capture high-ticket B2B leads. Optimized for Core Web Vitals to rank higher organically.',
    tech: ['Reduced load time to 1.2s', 'Increased organic traffic by 80%', '99/100 Lighthouse Score'],
    client: 'TechFlow Solutions',
    duration: '4 Weeks',
  },
  {
    title: 'Restaurant Order Management App',
    category: 'Mobile Application',
    image: '/images/app-dev-ui.jpg',
    link: '#',
    liveUrl: null,
    tags: ['iOS', 'Android'],
    desc: 'Cross-platform mobile app for a multi-location restaurant chain, featuring real-time order tracking, push notifications, and seamless payment integration.',
    tech: ['10,000+ Downloads', '4.8 Star App Store Rating', '30% Increase in Online Orders'],
    client: 'Urban Eatery',
    duration: '8 Weeks',
  },
];

const categories = ['All', 'Web Development', 'Digital Marketing', 'Mobile Application'];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxProject, setLightboxProject] = useState(null);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" style={{ padding: 'var(--section-pad-y) var(--section-pad-x)', background: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px', maxWidth: '700px', margin: '0 auto 64px' }}>
          <div style={{
            display: 'inline-block', padding: '6px 14px', borderRadius: '100px',
            background: 'rgba(11, 30, 57, 0.05)', border: '1px solid var(--color-border)',
            color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: '600',
            textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '24px'
          }}>
            Case Studies
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '20px', color: 'var(--color-primary)', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
            Proven <span style={{ color: 'var(--color-accent)' }}>Results.</span>
          </h2>
          <p style={{ color: 'var(--color-text)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '40px' }}>
            We don't just build websites; we build businesses. Here are some recent outcomes we've achieved for our clients.
          </p>

          {/* Filter tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '10px 24px', borderRadius: '100px',
                  border: activeCategory === cat ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                  background: activeCategory === cat ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: activeCategory === cat ? '#fff' : 'var(--color-text)',
                  fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
        }}>
          {filteredProjects.map((project) => (
            <div
              key={project.title}
              className="premium-card portfolio-card"
              onClick={() => setLightboxProject(project)}
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.6s ease',
                  }}
                  className="portfolio-img"
                />
                <div style={{
                  position: 'absolute', top: '16px', right: '16px',
                  padding: '6px 12px', borderRadius: '100px',
                  background: 'var(--color-surface)',
                  color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: '700',
                  boxShadow: '0 4px 12px rgba(11,30,57,0.1)',
                }}>
                  {project.category}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                  {project.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: '0.75rem', padding: '4px 10px',
                      background: 'rgba(11, 30, 57, 0.05)', color: 'var(--color-text)',
                      borderRadius: '100px', fontWeight: '600',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '12px', color: 'var(--color-primary)', lineHeight: '1.2', letterSpacing: '-0.01em' }}>
                  {project.title}
                </h3>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', fontWeight: '600', fontSize: '0.95rem' }} className="portfolio-cta">
                  <span>View Case Study</span>
                  <ArrowRight size={18} className="cta-arrow" style={{ transition: 'transform 0.3s ease' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxProject && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '24px'
        }}>
          <div
            onClick={() => setLightboxProject(null)}
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(11, 30, 57, 0.4)',
              backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
              animation: 'modalFadeIn 0.3s ease',
            }}
          />
          <div style={{
            position: 'relative',
            width: '100%', maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto',
            background: 'var(--color-surface)',
            borderRadius: '24px',
            boxShadow: '0 24px 48px rgba(11, 30, 57, 0.1)',
            animation: 'modalSlideUp 0.3s ease',
            overflow: 'hidden',
          }}>
            {/* Full-width image header */}
            <div style={{ position: 'relative', height: '320px', overflow: 'hidden' }}>
              <img
                src={lightboxProject.image}
                alt={lightboxProject.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <button
                onClick={() => setLightboxProject(null)}
                style={{
                  position: 'absolute', top: '24px', right: '24px',
                  background: 'var(--color-surface)', border: 'none',
                  borderRadius: '50%', width: '40px', height: '40px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'var(--color-primary)',
                  boxShadow: '0 4px 12px rgba(11,30,57,0.1)',
                  transition: 'all 0.2s ease', zIndex: 10,
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '40px', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '40px' }} className="modal-grid">
              {/* Left */}
              <div>
                <div style={{
                  fontSize: '0.8rem', color: 'var(--color-accent)', fontWeight: '700',
                  letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px',
                }}>
                  {lightboxProject.category}
                </div>
                <h3 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '24px', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
                  {lightboxProject.title}
                </h3>
                <p style={{ color: 'var(--color-text)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '32px' }}>
                  {lightboxProject.desc}
                </p>
                
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-primary)', marginBottom: '16px' }}>Key Outcomes</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {lightboxProject.tech.map((t, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-text)' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-accent)' }} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right */}
              <div>
                <div style={{
                  background: 'rgba(11, 30, 57, 0.02)', border: '1px solid var(--color-border)',
                  borderRadius: '16px', padding: '24px', marginBottom: '24px',
                }}>
                  {[
                    { label: 'Client', value: lightboxProject.client },
                    { label: 'Duration', value: lightboxProject.duration },
                  ].map(row => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', marginBottom: '12px', borderBottom: '1px solid var(--color-border)' }}>
                      <span style={{ fontSize: '0.9rem', color: 'var(--color-text)' }}>{row.label}</span>
                      <span style={{ fontSize: '0.95rem', color: 'var(--color-primary)', fontWeight: '600' }}>{row.value}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text)' }}>Services</span>
                    <span style={{ fontSize: '0.95rem', color: 'var(--color-primary)', fontWeight: '600' }}>{lightboxProject.category}</span>
                  </div>
                </div>

                {lightboxProject.liveUrl && (
                  <a
                    href={lightboxProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ textDecoration: 'none', width: '100%', justifyContent: 'center', display: 'flex' }}
                  >
                    <Globe size={18} />
                    View Live Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .portfolio-card:hover {
          border-color: var(--color-accent) !important;
          box-shadow: 0 16px 32px rgba(11, 30, 57, 0.08);
          transform: translateY(-4px);
        }
        .portfolio-card:hover .portfolio-img {
          transform: scale(1.05);
        }
        .portfolio-card:hover .portfolio-cta {
          color: var(--color-accent) !important;
        }
        .portfolio-card:hover .cta-arrow {
          transform: translateX(4px);
        }

        @keyframes modalFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .modal-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
};

export default Portfolio;
