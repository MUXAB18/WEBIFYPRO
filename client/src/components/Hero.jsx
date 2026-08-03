import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, Globe, Zap } from 'lucide-react';
import gsap from 'gsap';
import GlitchText from './motion/GlitchText';
import ParallaxLayer from './motion/ParallaxLayer';
import MagneticCard from './motion/MagneticCard';

// Animated count-up stat component
function CountUpStat({ target, suffix, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1600;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + increment, target);
          setCount(Math.round(current));
          if (current >= target) clearInterval(timer);
        }, duration / steps);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="stat-item" style={{ 
      flex: '1 1 auto',
      minWidth: '140px',
      padding: '8px',
    }}>
      <div className="outfit" style={{
        fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', 
        fontWeight: '800',
        background: 'linear-gradient(135deg, #4c9aff, #00d4ff)',
        backgroundClip: 'text', 
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '4px',
        lineHeight: '1',
      }}>
        {count}{suffix}
      </div>
      <div style={{ 
        fontSize: 'clamp(0.75rem, 1.8vw, 0.9rem)', 
        color: 'rgba(255,255,255,0.55)', 
        fontWeight: '500',
        lineHeight: '1.3',
      }}>{label}</div>
    </div>
  );
}

const Hero = () => {
  const headRef = useRef();
  const subRef = useRef();
  const ctaRef = useRef();
  const badgeRef = useRef();
  const statsRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 });
    tl.fromTo(badgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .fromTo(headRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.2')
      .fromTo(subRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .fromTo(statsRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2');
  }, []);

  return (
    <section id="home" style={{
      minHeight: '95vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '120px 6% 60px',
    }}>
      {/* Gradient orbs background */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '10%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(30,111,234,0.15) 0%, transparent 70%)',
        filter: 'blur(80px)',
        animation: 'float-orb 20s ease-in-out infinite',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)',
        filter: 'blur(70px)',
        animation: 'float-orb 25s ease-in-out infinite reverse',
        zIndex: 0,
      }} />

      <div className="hero-container" style={{ maxWidth: '800px', width: '100%', position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <ParallaxLayer depth={3}>
          {/* Badge */}
          <div ref={badgeRef} className="hero-badge" style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '10px 22px', borderRadius: '100px',
            background: 'rgba(0,212,255,0.08)',
            border: '1px solid rgba(0,212,255,0.3)',
            marginBottom: '32px', fontSize: '0.88rem', fontWeight: '600',
            backdropFilter: 'blur(12px)', 
            WebkitBackdropFilter: 'blur(12px)',
            opacity: 0,
            boxShadow: '0 4px 24px rgba(0,212,255,0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}>
            <span style={{
              display: 'inline-block', width: '9px', height: '9px',
              borderRadius: '50%', background: '#06ffa5',
              boxShadow: '0 0 12px #06ffa5, 0 0 24px rgba(6,255,165,0.4)',
              animation: 'pulse-dot 2s infinite',
            }} />
            <span style={{ letterSpacing: '0.02em' }}>Available for New Projects</span>
          </div>

          {/* Heading */}
          <h1 ref={headRef} className="outfit" style={{
            fontSize: 'clamp(1.75rem, 5.5vw, 4.5rem)',
            lineHeight: '1.15', fontWeight: '900',
            marginBottom: '20px', opacity: 0,
            textShadow: '0 0 60px rgba(0,212,255,0.25)',
            letterSpacing: '-0.02em',
          }}>
            Building Digital{' '}
            <br />
            <GlitchText interval={6}>
              <span style={{
                background: 'linear-gradient(135deg, #4c9aff 0%, #00d4ff 50%, #00fff2 100%)',
                backgroundClip: 'text', WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%', 
                animation: 'gradient-shift 4s ease infinite',
                display: 'inline-block',
                position: 'relative',
              }}>Masterpieces</span>
            </GlitchText>{' '}
            <br />
            <span style={{ 
              background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>That Drive Results</span>
          </h1>

          {/* Subtext */}
          <p ref={subRef} className="hero-sub" style={{
            fontSize: 'clamp(0.9rem, 1.6vw, 1.15rem)',
            color: 'rgba(255,255,255,0.72)',
            marginBottom: '36px', 
            maxWidth: '620px', 
            lineHeight: '1.7', 
            opacity: 0,
            margin: '0 auto 36px',
          }}>
            Elevate your brand with <strong style={{ color: '#00d4ff', fontWeight: '600' }}>high-performance web development</strong> and strategic digital marketing.
            We turn your vision into a powerful online presence —{' '}
            <span style={{ 
              background: 'linear-gradient(135deg, #00d4ff, #06ffa5)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: '700',
            }}>from Pakistan to the world</span>.
          </p>
        </ParallaxLayer>

        {/* CTAs */}
        <ParallaxLayer depth={4}>
          <div ref={ctaRef} style={{ 
            display: 'flex', 
            gap: '16px', 
            flexWrap: 'wrap', 
            opacity: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <MagneticCard
              tiltStrength={8}
              scaleHover={1.06}
              zDepth={12}
              glowColor="#00d4ff"
              data-cursor-color="#00d4ff"
              style={{ display: 'inline-block' }}
            >
              <a href="#order" className="hero-cta-primary">
                <Zap size={18} />
                Start Your Project
                <ChevronRight size={18} />
              </a>
            </MagneticCard>

            <MagneticCard
              tiltStrength={8}
              scaleHover={1.06}
              zDepth={12}
              glowColor="#6366f1"
              data-cursor-color="#6366f1"
              style={{ display: 'inline-block' }}
            >
              <a href="#portfolio" className="hero-cta-secondary">
                <Globe size={18} />
                View Our Work
              </a>
            </MagneticCard>
          </div>
        </ParallaxLayer>

        {/* Stats with animated counters */}
        <ParallaxLayer depth={5}>
          <div ref={statsRef} className="hero-stats" style={{
            display: 'flex', 
            gap: 'clamp(12px, 3vw, 32px)', 
            marginTop: 'clamp(32px, 6vw, 48px)',
            flexWrap: 'wrap', 
            opacity: 0,
            justifyContent: 'center',
            padding: 'clamp(18px, 4vw, 28px) clamp(14px, 3vw, 20px)',
            borderRadius: 'clamp(14px, 2.5vw, 18px)',
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}>
            {[
              { target: 50, suffix: '+', label: 'Projects Launched' },
              { target: 100, suffix: '%', label: 'Client Satisfaction' },
              { target: 24, suffix: '/7', label: 'Support Available' },
            ].map(stat => (
              <CountUpStat key={stat.label} target={stat.target} suffix={stat.suffix} label={stat.label} />
            ))}
          </div>
        </ParallaxLayer>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '36px', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '8px', color: 'rgba(255,255,255,0.35)',
        fontSize: '0.7rem', letterSpacing: '0.1em', zIndex: 2,
      }}>
        <span>SCROLL</span>
        <div style={{
          width: '1px', height: '36px',
          background: 'linear-gradient(to bottom, rgba(0,212,255,0.8), transparent)',
          animation: 'scroll-line 2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float-orb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.7; }
        }
        @keyframes scroll-line {
          0% { transform: scaleY(0); transform-origin: top; opacity: 1; }
          50% { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
        }
        .hero-cta-primary {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 32px;
          background: linear-gradient(135deg, #0066ff 0%, #00d4ff 100%);
          background-size: 200% 200%;
          border-radius: 14px; 
          font-weight: 700; 
          font-size: 1rem;
          font-family: 'Outfit', sans-serif;
          color: white; 
          text-decoration: none;
          box-shadow: 0 10px 35px rgba(0,212,255,0.35), 0 0 0 1px rgba(0,212,255,0.2), inset 0 1px 0 rgba(255,255,255,0.15);
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1); 
          position: relative; 
          overflow: hidden;
          animation: gradient-shift 3s ease infinite;
        }
        .hero-cta-primary::before {
          content: ''; 
          position: absolute; 
          inset: 0;
          background: linear-gradient(135deg, #00e5ff 0%, #0066ff 100%);
          opacity: 0; 
          transition: opacity 0.35s ease;
        }
        .hero-cta-primary:hover::before { opacity: 1; }
        .hero-cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 50px rgba(0,212,255,0.5), 0 0 0 1px rgba(0,212,255,0.4), inset 0 1px 0 rgba(255,255,255,0.2);
        }
        .hero-cta-primary:active {
          transform: translateY(-1px);
        }
        .hero-cta-primary > * { position: relative; z-index: 1; }
        
        .hero-cta-secondary {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 32px;
          background: rgba(255,255,255,0.05);
          border: 1.5px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(12px); 
          WebkitBackdropFilter: blur(12px);
          border-radius: 14px;
          font-weight: 600; 
          font-size: 1rem;
          font-family: 'Outfit', sans-serif;
          color: rgba(255,255,255,0.9); 
          text-decoration: none;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1);
        }
        .hero-cta-secondary:hover {
          border-color: rgba(99,102,241,0.5);
          background: rgba(99,102,241,0.12);
          color: white;
          box-shadow: 0 8px 30px rgba(99,102,241,0.25), inset 0 1px 0 rgba(255,255,255,0.15);
          transform: translateY(-3px);
        }
        .hero-cta-secondary:active {
          transform: translateY(-1px);
        }
        
        @media (max-width: 768px) {
          .hero-container {
            padding: 0 4%;
          }
          .hero-cta-primary, .hero-cta-secondary {
            width: 100%; 
            justify-content: center;
            padding: 13px 26px;
            font-size: 0.92rem;
          }
          .hero-stats { 
            gap: 18px !important;
            padding: 20px 16px !important;
            margin-top: 32px !important;
          }
          .stat-item {
            min-width: 110px !important;
            padding: 8px 6px !important;
          }
        }
        
        @media (max-width: 480px) {
          #home {
            padding: 100px 5% 50px !important;
            min-height: 92vh !important;
          }
          .hero-badge {
            font-size: 0.72rem !important;
            padding: 6px 13px !important;
            margin-bottom: 18px !important;
            gap: 7px !important;
          }
          .hero-badge span:first-child {
            width: 7px !important;
            height: 7px !important;
          }
          h1 {
            font-size: clamp(1.6rem, 6vw, 4.5rem) !important;
            margin-bottom: 16px !important;
            line-height: 1.2 !important;
          }
          h1 br {
            display: inline;
          }
          .hero-sub {
            font-size: 0.85rem !important;
            margin-bottom: 26px !important;
            padding: 0 4px !important;
            line-height: 1.65 !important;
          }
          .hero-cta-primary, .hero-cta-secondary {
            padding: 12px 20px !important;
            font-size: 0.85rem !important;
            gap: 7px !important;
          }
          .hero-cta-primary svg, .hero-cta-secondary svg {
            width: 16px !important;
            height: 16px !important;
          }
          .hero-stats {
            padding: 18px 14px !important;
            gap: 22px !important;
            margin-top: 30px !important;
            border-radius: 16px !important;
          }
          .stat-item {
            flex: 1 1 100% !important;
            min-width: 100% !important;
            padding: 14px 12px !important;
            text-align: center !important;
          }
          .stat-item:not(:last-child) {
            border-bottom: 1px solid rgba(255,255,255,0.06);
            padding-bottom: 18px !important;
            margin-bottom: 4px;
          }
        }
        
        @media (max-width: 380px) {
          #home {
            padding: 95px 4% 45px !important;
            min-height: 90vh !important;
          }
          .hero-badge {
            font-size: 0.68rem !important;
            padding: 5px 11px !important;
            margin-bottom: 16px !important;
          }
          h1 {
            font-size: 1.5rem !important;
            margin-bottom: 14px !important;
          }
          .hero-sub {
            font-size: 0.82rem !important;
            margin-bottom: 24px !important;
          }
          .hero-cta-primary, .hero-cta-secondary {
            padding: 11px 18px !important;
            font-size: 0.82rem !important;
          }
          .hero-stats {
            padding: 16px 12px !important;
            gap: 20px !important;
            margin-top: 26px !important;
            border-radius: 14px !important;
          }
          .stat-item {
            padding: 12px 10px !important;
          }
          .stat-item:not(:last-child) {
            padding-bottom: 16px !important;
          }
        }
        
        html.light-mode .hero-cta-secondary {
          background: rgba(0,0,0,0.04);
          border-color: rgba(0,0,0,0.1);
          color: rgba(0,0,0,0.85);
        }
        html.light-mode .hero-cta-secondary:hover {
          background: rgba(99,102,241,0.08);
          border-color: rgba(99,102,241,0.3);
          color: #000;
        }
        html.light-mode .hero-stats {
          background: rgba(255,255,255,0.6);
          border-color: rgba(0,0,0,0.08);
        }
      `}</style>
    </section>
  );
};

export default Hero;
