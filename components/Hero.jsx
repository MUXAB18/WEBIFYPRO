"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowRight, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';

const Hero = ({ lowEnd, hero = {} }) => {
  const leftRef = useRef();
  const rightRef = useRef();
  const badgeRef = useRef();

  useEffect(() => {
    if (lowEnd) return;
    
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(leftRef.current, 
        { opacity: 0, x: -30 }, 
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo(rightRef.current, 
        { opacity: 0, scale: 0.95 }, 
        { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }, 
        '-=0.4'
      );
      
    // Floating animation for abstract elements
    gsap.to('.float-el-1', {
      y: -15, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut'
    });
    gsap.to('.float-el-2', {
      y: 10, duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1
    });
    gsap.to('.float-el-3', {
      rotation: 5, duration: 5, yoyo: true, repeat: -1, ease: 'sine.inOut'
    });
  }, [lowEnd]);

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

  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--color-bg)',
      paddingTop: '140px', // account for navbar
      paddingBottom: '60px',
    }}>
      {/* Background subtle grid */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        backgroundImage: 'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        opacity: 0.3,
        zIndex: 0,
      }} />

      <div style={{
        maxWidth: '1280px',
        width: '100%',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        gap: '40px',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2,
      }} className="hero-grid">
        
        {/* LEFT COLUMN: Copy & CTAs */}
        <div ref={leftRef} style={{ opacity: lowEnd ? 1 : 0 }} className="hero-left">
          
          {/* Trust Badge */}
          {hero.subtitle && (
            <div ref={badgeRef} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              background: 'rgba(11, 30, 57, 0.05)',
              border: '1px solid var(--color-border)',
              borderRadius: '100px',
              color: 'var(--color-primary)',
              fontSize: '0.85rem',
              fontWeight: '600',
              marginBottom: '24px',
            }}>
              <ShieldCheck size={16} color="var(--color-accent)" />
              <span>{hero.subtitle}</span>
            </div>
          )}

          <h1 style={{
            fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
            fontWeight: '800',
            color: 'var(--color-primary)',
            lineHeight: '1.05',
            letterSpacing: '-0.03em',
            marginBottom: '24px',
          }}>
            {hero.title ? renderTitle(hero.title, hero.titleAccentColor) : (
              <>We build digital experiences that <span style={{ color: 'var(--color-accent)' }}>grow businesses.</span></>
            )}
          </h1>

          <p style={{
            fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
            color: 'var(--color-text)',
            lineHeight: '1.6',
            marginBottom: '40px',
            maxWidth: '540px',
          }}>
            {hero.description || 'Web development, software solutions, digital marketing and SEO designed to turn your online presence into a growth engine.'}
          </p>

          <div style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
          }}>
            {hero.button1Text && (
              <Link href={hero.button1Link || '#'} className="btn-primary" style={{ textDecoration: 'none', outline: 'none' }}>
                {hero.button1Text}
              </Link>
            )}
            {!hero.button1Text && (
              <Link href="/start-project" className="btn-primary" style={{ textDecoration: 'none', outline: 'none' }}>
                Start Your Project
              </Link>
            )}

            {hero.button2Text && (
              <Link href={hero.button2Link || '#'} className="btn-secondary" style={{ textDecoration: 'none', outline: 'none' }}>
                {hero.button2Text}
              </Link>
            )}
            {!hero.button2Text && !hero.button1Text && (
              <Link href="/services" className="btn-secondary" style={{ textDecoration: 'none', outline: 'none' }}>
                View Services
              </Link>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Abstract Visual */}
        <div ref={rightRef} style={{ opacity: lowEnd ? 1 : 0, position: 'relative', height: '100%', minHeight: '500px' }} className="hero-right">
          
          {/* Main geometric container */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%', height: '100%',
            maxWidth: '500px', maxHeight: '500px',
          }}>
            {/* Navy abstract base */}
            <div className="float-el-3" style={{
              position: 'absolute',
              top: '10%', right: '10%',
              width: '80%', height: '80%',
              background: 'var(--color-primary)',
              borderRadius: '24px',
              transform: 'rotate(4deg)',
              opacity: 0.05,
            }} />
            <div className="float-el-3" style={{
              position: 'absolute',
              top: '10%', right: '10%',
              width: '80%', height: '80%',
              border: '2px solid var(--color-primary)',
              borderRadius: '24px',
              transform: 'rotate(-3deg)',
              opacity: 0.1,
            }} />

            {/* Glowing Orange Dot */}
            <div className="float-el-1" style={{
              position: 'absolute',
              top: '25%', right: '15%',
              width: '12px', height: '12px',
              background: 'var(--color-accent)',
              borderRadius: '50%',
              boxShadow: '0 0 20px var(--color-accent), 0 0 40px var(--color-accent)',
            }} />

            {/* Floating UI Card 1 (Analytics) */}
            <div className="premium-card float-el-1" style={{
              position: 'absolute',
              top: '20%', left: '0',
              width: '280px',
              padding: '20px',
              background: 'var(--color-surface)',
              boxShadow: '0 20px 40px rgba(11, 30, 57, 0.08)',
              zIndex: 3,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '8px', background: 'var(--color-border)', borderRadius: '4px' }} />
                <div style={{ width: '20px', height: '8px', background: 'var(--color-accent)', borderRadius: '4px' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '60px' }}>
                {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                  <div key={i} style={{
                    flex: 1,
                    height: `${h}%`,
                    background: i === 5 ? 'var(--color-accent)' : 'var(--color-primary)',
                    borderRadius: '2px 2px 0 0',
                    opacity: i === 5 ? 1 : 0.8
                  }} />
                ))}
              </div>
            </div>

            {/* Floating UI Card 2 (Code/Structure) */}
            <div className="premium-card float-el-2" style={{
              position: 'absolute',
              bottom: '15%', right: '0',
              width: '260px',
              padding: '24px',
              background: 'var(--color-surface)',
              boxShadow: '0 20px 40px rgba(11, 30, 57, 0.08)',
              zIndex: 4,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-primary)', opacity: 0.1 }} />
                <div style={{ width: '100px', height: '10px', background: 'var(--color-primary)', borderRadius: '4px' }} />
              </div>
              <div style={{ width: '100%', height: '6px', background: 'var(--color-border)', borderRadius: '4px', marginBottom: '12px' }} />
              <div style={{ width: '80%', height: '6px', background: 'var(--color-border)', borderRadius: '4px', marginBottom: '12px' }} />
              <div style={{ width: '60%', height: '6px', background: 'var(--color-accent)', borderRadius: '4px' }} />
            </div>

            {/* Navy Connecting Lines */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2, pointerEvents: 'none' }}>
              <path d="M 50 150 C 150 150, 150 350, 350 350" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.2" />
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-left {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-left h1 {
            font-size: clamp(2.5rem, 8vw, 3.5rem) !important;
          }
          .hero-left p {
            margin: 0 auto 32px !important;
          }
          .hero-right {
            min-height: 280px !important;
          }
          #home {
            padding-top: 100px !important;
            padding-bottom: 40px !important;
            min-height: auto !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
