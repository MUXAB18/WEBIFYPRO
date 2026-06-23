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
    <div ref={ref}>
      <div className="outfit" style={{
        fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: '800',
        background: 'linear-gradient(135deg, #6366f1, #00d4ff)',
        backgroundClip: 'text', WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginTop: '2px' }}>{label}</div>
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
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '100px 6% 60px',
    }}>
      <div style={{ maxWidth: '720px', width: '100%', position: 'relative', zIndex: 2 }}>
        <ParallaxLayer depth={3}>
          {/* Badge */}
          <div ref={badgeRef} className="hero-badge" style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '8px 18px', borderRadius: '100px',
            background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.3)',
            marginBottom: '28px', fontSize: '0.85rem', fontWeight: '600',
            backdropFilter: 'blur(10px)', opacity: 0,
          }}>
            <span style={{
              display: 'inline-block', width: '8px', height: '8px',
              borderRadius: '50%', background: '#06ffa5',
              boxShadow: '0 0 8px #06ffa5', animation: 'pulse-dot 2s infinite',
            }} />
            Available for new projects
          </div>

          {/* Heading */}
          <h1 ref={headRef} className="outfit" style={{
            fontSize: 'clamp(2.4rem, 7vw, 5.2rem)',
            lineHeight: '1.08', fontWeight: '800',
            marginBottom: '24px', opacity: 0,
            textShadow: '0 0 40px rgba(99,102,241,0.25)',
          }}>
            Building Digital{' '}
            <GlitchText interval={6}>
              <span style={{
                background: 'linear-gradient(135deg, #6366f1, #00d4ff, #a855f7)',
                backgroundClip: 'text', WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%', animation: 'gradient-shift 4s ease infinite',
              }}>Masterpieces</span>
            </GlitchText>{' '}
            That Drive Results.
          </h1>

          {/* Subtext */}
          <p ref={subRef} className="hero-sub" style={{
            fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
            color: 'rgba(255,255,255,0.78)',
            marginBottom: '40px', maxWidth: '560px', lineHeight: '1.75', opacity: 0,
          }}>
            Elevate your brand with high-performance web development and strategic digital marketing.
            We turn your vision into a powerful online presence —{' '}
            <strong style={{ color: '#00d4ff', fontWeight: '600' }}>from Pakistan to the world</strong>.
          </p>
        </ParallaxLayer>

        {/* CTAs */}
        <ParallaxLayer depth={4}>
          <div ref={ctaRef} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', opacity: 0 }}>
            <MagneticCard
              tiltStrength={8}
              scaleHover={1.05}
              zDepth={10}
              glowColor="#6366f1"
              data-cursor-color="#6366f1"
              style={{ display: 'inline-block' }}
            >
              <a href="#order" className="hero-cta-primary">
                <Zap size={17} />
                Start Your Project
                <ChevronRight size={17} />
              </a>
            </MagneticCard>

            <MagneticCard
              tiltStrength={8}
              scaleHover={1.05}
              zDepth={10}
              glowColor="#00d4ff"
              data-cursor-color="#00d4ff"
              style={{ display: 'inline-block' }}
            >
              <a href="#portfolio" className="hero-cta-secondary">
                <Globe size={17} />
                View Our Work
              </a>
            </MagneticCard>
          </div>
        </ParallaxLayer>

        {/* Stats with animated counters */}
        <ParallaxLayer depth={5}>
          <div ref={statsRef} className="hero-stats" style={{
            display: 'flex', gap: '40px', marginTop: '56px',
            flexWrap: 'wrap', opacity: 0,
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
          background: 'linear-gradient(to bottom, rgba(99,102,241,0.8), transparent)',
          animation: 'scroll-line 2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes scroll-line {
          0% { transform: scaleY(0); transform-origin: top; opacity: 1; }
          50% { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
        }
        .hero-cta-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 26px;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          border-radius: 12px; font-weight: 700; font-size: 0.95rem;
          color: white; text-decoration: none;
          box-shadow: 0 8px 28px rgba(99,102,241,0.5);
          transition: all 0.3s ease; position: relative; overflow: hidden;
        }
        .hero-cta-primary::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, #00d4ff, #6366f1);
          opacity: 0; transition: opacity 0.3s ease;
        }
        .hero-cta-primary:hover::before { opacity: 1; }
        .hero-cta-primary:hover {
          box-shadow: 0 16px 36px rgba(99,102,241,0.6);
        }
        .hero-cta-primary > * { position: relative; z-index: 1; }
        .hero-cta-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 26px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(10px); border-radius: 12px;
          font-weight: 600; font-size: 0.95rem;
          color: rgba(255,255,255,0.85); text-decoration: none;
          transition: all 0.3s ease;
        }
        .hero-cta-secondary:hover {
          border-color: rgba(99,102,241,0.6);
          background: rgba(99,102,241,0.1);
          color: white;
        }
        @media (max-width: 480px) {
          .hero-cta-primary, .hero-cta-secondary {
            width: 100%; justify-content: center;
          }
          .hero-stats { gap: 24px !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
