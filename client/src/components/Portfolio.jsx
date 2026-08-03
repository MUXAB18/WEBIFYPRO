import React, { useState } from 'react';
import { ExternalLink, X, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import MagneticCard from './motion/MagneticCard';
import ScrollReveal from './motion/ScrollReveal';

const projects = [
  {
    title: 'E-Commerce Growth for Luxe Brands',
    category: 'Digital Marketing',
    image: '/images/digital-media-marketing.png',
    link: '#',
    liveUrl: null,
    tags: ['Meta Ads', 'Conversion Rate'],
    color: '#00D4FF',
    glow: 'rgba(0,212,255,0.18)',
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
    color: '#1E6FEA',
    glow: 'rgba(30,111,234,0.18)',
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
    color: '#00D4FF',
    glow: 'rgba(168,85,247,0.18)',
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

  const lightboxIndex = lightboxProject ? projects.indexOf(lightboxProject) : -1;

  const navLightbox = (dir) => {
    const newIndex = lightboxIndex + dir;
    if (newIndex >= 0 && newIndex < projects.length) {
      setLightboxProject(projects[newIndex]);
    }
  };

  return (
    <section id="portfolio" style={{ position: 'relative', zIndex: 2 }}>
      {/* Header */}
      <ScrollReveal direction="up">
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '100px',
            background: 'rgba(30, 111, 234, 0.1)', border: '1px solid rgba(30, 111, 234, 0.2)',
            color: '#00d4ff', fontSize: '0.85rem', fontWeight: '600', letterSpacing: '0.05em',
            textTransform: 'uppercase', marginBottom: '18px'
          }}>
            Case Studies
          </div>

          <h2 className="outfit" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: '800', marginBottom: '14px', color: '#fff' }}>
            Proven{' '}
            <span style={{ color: '#00d4ff' }}>Results</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '560px', margin: '0 auto 36px', lineHeight: '1.7', fontSize: '0.95rem' }}>
            We don't just build websites; we build businesses. Here are some recent outcomes we've achieved for our clients.
          </p>

          {/* Filter tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`portfolio-cat-btn ${activeCategory === cat ? 'active' : ''}`}
                style={{
                  padding: '9px 20px', borderRadius: '100px',
                  border: activeCategory === cat ? '1px solid rgba(30,111,234,0.55)' : '1px solid rgba(255,255,255,0.1)',
                  background: activeCategory === cat
                    ? 'linear-gradient(135deg, rgba(30,111,234,0.28), rgba(168,85,247,0.28))'
                    : 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(10px)',
                  color: activeCategory === cat ? '#fff' : 'rgba(255,255,255,0.5)',
                  fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: activeCategory === cat ? '0 0 18px rgba(30,111,234,0.3)' : 'none',
                }}
              >{cat}</button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Cards */}
      <ScrollReveal
        direction="up"
        stagger={0.12}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))',
          gap: '28px',
        }}
      >
        {filteredProjects.map((project, index) => (
          <MagneticCard
            key={project.title}
            glowColor={project.color}
            data-cursor-color={project.color}
            tiltStrength={12}
            scaleHover={1.02}
            zDepth={15}
            onClick={() => setLightboxProject(project)}
          >
            <div
              className="galaxy-card"
              style={{
                position: 'relative', borderRadius: '26px', overflow: 'hidden',
                background: 'rgba(5,5,20,0.8)',
                border: `1px solid ${project.color}25`,
                height: '400px',
                transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
                boxShadow: `0 0 18px ${project.glow}44`,
                cursor: 'pointer',
              }}
            >
              {/* Glow bg */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `radial-gradient(circle at 75% 15%, ${project.glow} 0%, transparent 55%)`,
                pointerEvents: 'none',
              }} />

              {/* Image */}
              <div style={{ height: '55%', overflow: 'hidden', position: 'relative' }}>
                <picture>
                  <source srcSet={project.image.replace(/\.(png|jpe?g)$/i, '.webp')} type="image/webp" />
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    width="800"
                    height="600"
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      aspectRatio: '800 / 600',
                      transition: 'transform 0.6s ease, filter 0.4s ease',
                      filter: 'brightness(0.65)',
                    }}
                    className="galaxy-img"
                  />
                </picture>
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
                  background: 'linear-gradient(to top, rgba(5,5,20,0.95), transparent)',
                }} />
                <div style={{
                  position: 'absolute', top: '14px', right: '14px',
                  padding: '4px 12px', borderRadius: '20px',
                  background: `${project.color}20`, border: `1px solid ${project.color}44`,
                  color: project.color, fontSize: '0.66rem', fontWeight: '700',
                  backdropFilter: 'blur(8px)',
                }}>{project.category}</div>
              </div>

              {/* Content */}
              <div style={{ padding: '22px 24px', position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
                  {project.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: '0.62rem', padding: '3px 8px',
                      background: `${project.color}15`, color: project.color,
                      border: `1px solid ${project.color}30`, borderRadius: '6px', fontWeight: '700',
                    }}>{tag}</span>
                  ))}
                </div>
                <h3 className="outfit" style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '8px', color: '#fff', letterSpacing: '0.04em' }}>
                  {project.title}
                </h3>
                <h4 style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  Key Outcomes
                </h4>
                <ul style={{ padding: '0 0 0 16px', margin: '0 0 14px', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>
                    {project.tech.map((t, i) => <li key={i} style={{ marginBottom: '4px' }}>{t}</li>)}
                </ul>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: project.color, fontSize: '0.8rem', fontWeight: '600' }}>
                  <ExternalLink size={13} />
                  Click to view details
                  <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${project.color}55, transparent)` }} />
                </div>
              </div>

              {/* Border glow */}
              <div style={{
                position: 'absolute', inset: 0, borderRadius: '26px',
                border: `1px solid ${project.color}`,
                opacity: 0, transition: 'opacity 0.4s ease', pointerEvents: 'none',
              }} className="galaxy-card-border" />
            </div>
          </MagneticCard>
        ))}
      </ScrollReveal>

      {/* Lightbox Modal */}
      {lightboxProject && (
        <>
          <div
            onClick={() => setLightboxProject(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 99999,
              background: 'rgba(2,3,10,0.92)', backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)', animation: 'modalFadeIn 0.3s ease',
            }}
          />
          <div style={{
            position: 'fixed', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 100000, width: 'min(820px, 94vw)',
            maxHeight: '88vh', overflowY: 'auto',
            background: 'linear-gradient(135deg, rgba(8,8,24,0.99), rgba(12,12,35,0.99))',
            border: `1px solid ${lightboxProject.color}44`,
            borderRadius: '28px', padding: '0',
            boxShadow: `0 40px 100px rgba(0,0,0,0.8), 0 0 60px ${lightboxProject.glow}`,
            animation: 'modalSlideUp 0.35s cubic-bezier(0.16,1,0.3,1) both',
            boxSizing: 'border-box',
          }}>
            {/* Full-width image header */}
            <div style={{ position: 'relative', height: '280px', overflow: 'hidden', borderRadius: '28px 28px 0 0' }}>
              <picture>
                <source srcSet={lightboxProject.image.replace(/\.(png|jpe?g)$/i, '.webp')} type="image/webp" />
                <img
                  src={lightboxProject.image}
                  alt={lightboxProject.title}
                  loading="lazy"
                  width="1200"
                  height="675"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', aspectRatio: '16 / 9', filter: 'brightness(0.7)' }}
                />
              </picture>
              <div style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(to bottom, transparent 30%, rgba(8,8,24,0.98) 100%)`,
              }} />
              {/* Close */}
              <button
                onClick={() => setLightboxProject(null)}
                style={{
                  position: 'absolute', top: '16px', right: '16px',
                  background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '10px', width: '38px', height: '38px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: '#fff', transition: 'all 0.2s ease',
                  backdropFilter: 'blur(8px)',
                }}
                className="modal-close-btn"
              >
                <X size={18} />
              </button>
              {/* Prev/Next arrows */}
              {lightboxIndex > 0 && (
                <button onClick={() => navLightbox(-1)} className="lightbox-nav-btn" style={{
                  position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '50%', width: '40px', height: '40px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: '#fff', backdropFilter: 'blur(8px)',
                }}>
                  <ChevronLeft size={20} />
                </button>
              )}
              {lightboxIndex < projects.length - 1 && (
                <button onClick={() => navLightbox(1)} className="lightbox-nav-btn" style={{
                  position: 'absolute', right: '60px', top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '50%', width: '40px', height: '40px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: '#fff', backdropFilter: 'blur(8px)',
                }}>
                  <ChevronRight size={20} />
                </button>
              )}
              {/* Title overlay */}
              <div style={{ position: 'absolute', bottom: '20px', left: '32px' }}>
                <div style={{
                  fontSize: '0.7rem', color: lightboxProject.color, fontWeight: '700',
                  letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px',
                }}>
                  {lightboxProject.category}
                </div>
                <h3 className="outfit" style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: '800', color: '#fff' }}>
                  {lightboxProject.title}
                </h3>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: '28px 32px 32px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '32px' }} className="lightbox-body">
              {/* Left */}
              <div>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.92rem', lineHeight: '1.75', marginBottom: '24px' }}>
                  {lightboxProject.desc}
                </p>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace', marginBottom: '10px', letterSpacing: '0.08em' }}>
                    KEY OUTCOMES
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {lightboxProject.tech.map(t => (
                      <span key={t} style={{
                        padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '700',
                        background: `${lightboxProject.color}15`,
                        border: `1px solid ${lightboxProject.color}35`,
                        color: lightboxProject.color,
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right */}
              <div>
                <div style={{
                  background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px', padding: '20px', marginBottom: '20px',
                }}>
                  {[
                    { label: 'Client', value: lightboxProject.client },
                    { label: 'Duration', value: lightboxProject.duration },
                    { label: 'Category', value: lightboxProject.category },
                  ].map(row => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>{row.label}</span>
                      <span style={{ fontSize: '0.78rem', color: '#fff', fontWeight: '600' }}>{row.value}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {lightboxProject.liveUrl && (
                    <a
                      href={lightboxProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        padding: '13px', borderRadius: '12px',
                        background: `linear-gradient(135deg, ${lightboxProject.color}, ${lightboxProject.color}cc)`,
                        color: '#000', fontWeight: '800', fontSize: '0.88rem',
                        textDecoration: 'none', transition: 'all 0.3s ease',
                        boxShadow: `0 6px 20px ${lightboxProject.glow}`,
                        fontFamily: 'Outfit, sans-serif',
                      }}
                      className="lightbox-live-btn"
                    >
                      <Globe size={16} /> View Live Demo
                    </a>
                  )}
                  <button
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('select-service', { detail: lightboxProject.category }));
                      setLightboxProject(null);
                    }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      padding: '13px', borderRadius: '12px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: '#fff', fontWeight: '700', fontSize: '0.88rem', cursor: 'pointer',
                      transition: 'all 0.3s ease', fontFamily: 'Outfit, sans-serif',
                    }}
                    className="lightbox-order-btn"
                  >
                    Order Similar Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translate(-50%, calc(-50% + 30px)) scale(0.96); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        .galaxy-card:hover .galaxy-img { transform: scale(1.05); filter: brightness(0.85) !important; }
        .galaxy-card:hover .galaxy-card-border { opacity: 0.35 !important; }
        .lightbox-nav-btn:hover { background: rgba(255,255,255,0.15) !important; }
        .lightbox-live-btn:hover { transform: translateY(-2px); }
        .lightbox-order-btn:hover { background: rgba(255,255,255,0.1) !important; border-color: rgba(255,255,255,0.25) !important; }
        .modal-close-btn:hover { background: rgba(255,255,255,0.15) !important; }
        @media (max-width: 600px) {
          .lightbox-body { grid-template-columns: 1fr !important; }
          .portfolio-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Portfolio;
