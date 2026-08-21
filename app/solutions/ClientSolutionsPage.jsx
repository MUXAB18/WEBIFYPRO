"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Briefcase, ShoppingBag, Landmark, Stethoscope, ArrowRight, Check, X, MessageCircle, Code, GraduationCap, Truck, Plane } from 'lucide-react';
import * as LucideIcons from 'lucide-react';



function SolutionCard({ solution, onSelect }) {
  return (
    <div
      className="premium-card service-card"
      onClick={() => onSelect(solution)}
      style={{
        display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer',
        padding: '32px', position: 'relative', overflow: 'hidden', transition: 'all 0.3s ease',
        background: 'var(--color-surface)',
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
        {/* Key Bullet Points directly on the card */}
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

export default function ClientSolutionsPage({ dbSolutions, sections = [] }) {
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

  const getIcon = (iconName) => {
    if (!iconName) return <Briefcase size={24} strokeWidth={1.5} />;
    const IconComponent = LucideIcons[iconName];
    return IconComponent ? <IconComponent size={24} strokeWidth={1.5} /> : <Briefcase size={24} strokeWidth={1.5} />;
  };

  const solutions = dbSolutions && dbSolutions.length > 0 ? dbSolutions.map(s => ({
    icon: getIcon(s.icon),
    title: s.name,
    shortDesc: s.shortDescription || '',
    desc: s.content || '',
    topPoints: s.seoTitle ? s.seoTitle.split('\n').filter(Boolean) : [],
    bulletPoints: s.seoDescription ? s.seoDescription.split('\n').filter(Boolean) : []
  })) : [];

  const renderTitle = (title, accentColor = 'var(--color-accent)') => {
    if (!title) return null;
    const parts = title.split(/(\{.*?\})/g);
    return (
      <>
        {parts.map((part, i) => {
          if (part.startsWith('{') && part.endsWith('}')) {
            return <span key={i} style={{ color: accentColor }}>{part.slice(1, -1)}</span>;
          }
          return <span key={i} dangerouslySetInnerHTML={{ __html: part }} />;
        })}
      </>
    );
  };

  const getSection = (type) => sections.find(s => s.type === type)?.parsed || {};

  const hero = getSection('HERO');
  const techStack = getSection('TECH_STACK');
  const cta = getSection('CTA');

  return (
    <div>
      <section style={{ padding: '80px 6%', position: 'relative' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px', maxWidth: '700px', margin: '0 auto 64px' }}>
            <div style={{
              display: 'inline-block', padding: '6px 14px', borderRadius: '100px',
              background: 'rgba(11, 30, 57, 0.05)', border: '1px solid var(--color-border)',
              color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: '600',
              textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '24px'
            }}>
              {hero.subtitle || 'INDUSTRY SOLUTIONS'}
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '20px', color: 'var(--color-primary)', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
              {hero.title ? renderTitle(hero.title, hero.titleAccentColor) : (
                <>Tailored technology for <span style={{ color: 'var(--color-accent)' }}>your industry.</span></>
              )}
            </h1>
            <p style={{ color: 'var(--color-text)', fontSize: '1.1rem', lineHeight: '1.6' }}>
              {hero.description || 'We build specialized digital platforms that solve unique industry challenges and drive measurable growth.'}
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
