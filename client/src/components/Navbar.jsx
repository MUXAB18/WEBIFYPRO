import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket, Sun, Moon } from 'lucide-react';
import MagneticCard from './motion/MagneticCard';
import { useScrollProgress } from '../hooks/useScrollProgress';

const Navbar = () => {
  const { scrollProgress } = useScrollProgress();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isDark, setIsDark] = useState(() => {
    // Default: light. Only go dark if user explicitly chose dark.
    return localStorage.getItem('webify_theme') === 'dark';
  });

  // Apply theme class on change
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add('theme-switching');
    if (isDark) {
      html.classList.remove('light-mode');
      localStorage.setItem('webify_theme', 'dark');
    } else {
      html.classList.add('light-mode');
      localStorage.setItem('webify_theme', 'light');
    }
    const t = setTimeout(() => html.classList.remove('theme-switching'), 500);
    return () => clearTimeout(t);
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Active section tracking
      const sections = ['home', 'services', 'portfolio', 'reviews', 'order', 'contact'];
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home', id: 'home' },
    { href: '#services', label: 'Services', id: 'services' },
    { href: '#portfolio', label: 'Portfolio', id: 'portfolio' },
    { href: '#reviews', label: 'Reviews', id: 'reviews' },
    { href: '#order', label: 'Order Now', id: 'order' },
  ];

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: isScrolled ? '14px 5%' : '22px 5%',
        background: isScrolled
          ? 'rgba(3, 7, 18, 0.80)'
          : 'rgba(3, 7, 18, 0.80)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: isScrolled
          ? '1px solid rgba(255, 255, 255, 0.1)'
          : '1px solid rgba(255, 255, 255, 0.04)',
        boxShadow: isScrolled
          ? '0 8px 32px rgba(0, 0, 0, 0.6), inset 0 -1px 0 rgba(99,102,241,0.12)'
          : 'none',
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {/* Logo */}
        <a href="#home" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
          cursor: 'pointer',
        }}>
          <div style={{ position: 'relative' }}>
            <Rocket
              size={30}
              color="#6366f1"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(99,102,241,0.8))',
                animation: 'logo-float 3s ease-in-out infinite',
              }}
            />
            <div style={{
              position: 'absolute',
              inset: '-4px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)',
              animation: 'logo-pulse 3s ease-in-out infinite',
            }} />
          </div>
          <span className="outfit" style={{
            fontSize: '1.5rem',
            fontWeight: '900',
            letterSpacing: '-0.6px',
            textTransform: 'uppercase',
            color: '#ffffff',
          }}>
            WEBIFY <span style={{
              background: 'linear-gradient(135deg, #6366f1, #00d4ff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>PRO</span>
          </span>
        </a>

        {/* Desktop nav links */}
        <ul style={{
          display: 'flex',
          gap: '8px',
          fontWeight: '600',
          alignItems: 'center',
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }} className="nav-links">
          {navLinks.map(link => (
            <li key={link.id}>
              <a
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                style={{
                  padding: '8px 15px',
                  borderRadius: '8px',
                  color: activeSection === link.id ? '#00d4ff' : 'rgba(255, 255, 255, 0.92)',
                  background: activeSection === link.id ? 'rgba(0, 212, 255, 0.1)' : 'transparent',
                  border: activeSection === link.id ? '1px solid rgba(0, 212, 255, 0.28)' : '1px solid transparent',
                  fontSize: '0.9rem',
                  fontWeight: activeSection === link.id ? '700' : '500',
                  transition: 'all 0.22s ease',
                  textDecoration: 'none',
                  display: 'block',
                  letterSpacing: '0.01em',
                }}
                className="nav-link"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <MagneticCard
              tiltStrength={8}
              scaleHover={1.06}
              zDepth={10}
              glowColor="#a855f7"
              data-cursor-color="#a855f7"
              style={{ display: 'inline-block' }}
            >
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  padding: '10px 22px',
                  borderRadius: '100px',
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  color: 'white',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 15px rgba(99,102,241,0.35)',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                  display: 'block',
                }}
                className="nav-cta"
              >
                Contact Us
              </a>
            </MagneticCard>
          </li>
        </ul>

          {/* Theme toggle + hamburger wrapper */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Dark / Light toggle */}
            <button
              onClick={() => setIsDark(d => !d)}
              aria-label="Toggle theme"
              id="theme-toggle-btn"
              style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: 'rgba(99,102,241,0.12)',
                border: '1px solid rgba(99,102,241,0.3)',
                color: isDark ? '#f59e0b' : '#6366f1',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.3s ease',
                boxShadow: '0 0 10px rgba(99,102,241,0.2)',
              }}
              className="theme-toggle-btn"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile hamburger */}
            <div
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(true)}
              style={{
                cursor: 'pointer', zIndex: 101,
                display: 'none', alignItems: 'center', justifyContent: 'center',
                width: '44px', height: '44px', borderRadius: '10px',
                background: 'rgba(99,102,241,0.18)', border: '1px solid rgba(99,102,241,0.4)',
                color: '#ffffff', boxShadow: '0 0 14px rgba(99,102,241,0.3)',
              }}
            >
              <Menu size={26} strokeWidth={2.5} />
            </div>
          </div>

        {/* Scroll Progress Bar */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '2.5px',
            background: 'linear-gradient(90deg, #6366f1, #00d4ff, #a855f7)',
            transformOrigin: '0% 50%',
            transform: `scaleX(${scrollProgress})`,
            opacity: isScrolled ? 1 : 0,
            boxShadow: isScrolled ? '0 0 12px rgba(0, 212, 255, 0.7), 0 0 6px rgba(99, 102, 241, 0.5)' : 'none',
            transition: 'opacity 0.3s ease, transform 0.1s ease-out',
            willChange: 'transform',
          }}
        />
      </nav>

      {/* Mobile menu overlay — conditionally rendered sibling to avoid nesting viewport bugs */}
      {isMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          background: '#03070f',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 99999,
          overflowY: 'auto',
          animation: 'mobileSlideIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}>

          {/* Top bar */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '20px 6%',
            borderBottom: '1px solid rgba(99,102,241,0.2)',
            background: 'rgba(99,102,241,0.06)',
            flexShrink: 0,
          }}>
            <a href="#home" onClick={() => setIsMenuOpen(false)} style={{
              display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none',
            }}>
              <Rocket size={28} color="#6366f1" style={{ filter: 'drop-shadow(0 0 6px rgba(99,102,241,0.9))' }} />
              <span className="outfit" style={{ fontSize: '1.4rem', fontWeight: '900', color: '#fff', letterSpacing: '-0.5px' }}>
                WEBIFY <span style={{
                  background: 'linear-gradient(135deg, #6366f1, #00d4ff)',
                  backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>PRO</span>
              </span>
            </a>
            <button
              onClick={() => setIsMenuOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: '10px', width: '42px', height: '42px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#fff', flexShrink: 0,
              }}
            >
              <X size={22} strokeWidth={2.5} />
            </button>
          </div>

          {/* Nav links */}
          <div style={{ display: 'flex', flexDirection: 'column', padding: '28px 6%', gap: '10px', flex: 1 }}>
            {[...navLinks, { href: '#contact', label: 'Contact Us', id: 'contact' }].map((link, idx) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '16px',
                    fontSize: '1.25rem', fontWeight: '700',
                    fontFamily: 'Outfit, sans-serif',
                    color: isActive ? '#00d4ff' : '#ffffff',
                    textDecoration: 'none',
                    padding: '16px 20px', borderRadius: '14px',
                    background: isActive ? 'rgba(0,212,255,0.12)' : 'rgba(255,255,255,0.05)',
                    border: isActive ? '1.5px solid rgba(0,212,255,0.4)' : '1px solid rgba(255,255,255,0.1)',
                    transition: 'all 0.2s ease',
                  }}
                  className="mobile-nav-link"
                >
                  <span style={{
                    fontSize: '0.72rem', fontFamily: 'monospace',
                    color: isActive ? '#00d4ff' : 'rgba(255,255,255,0.45)',
                    fontWeight: '600', minWidth: '22px',
                  }}>{String(idx + 1).padStart(2, '0')}</span>
                  <span>{link.label}</span>
                  {isActive && <span style={{ marginLeft: 'auto', color: '#00d4ff' }}>●</span>}
                </a>
              );
            })}
          </div>

          {/* Contact strip */}
          <div style={{
            padding: '20px 6%', borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', flexDirection: 'column', gap: '10px', flexShrink: 0,
          }}>
            <div style={{ fontSize: '0.62rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', marginBottom: '4px' }}>
              // CONTACT_CHANNELS
            </div>
            <a href="mailto:WEBIFYPRO9@GMAIL.COM" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>
              📧 WEBIFYPRO9@GMAIL.COM
            </a>
            <a href="https://wa.me/923708316591" style={{ fontSize: '0.85rem', color: '#25d366', textDecoration: 'none', fontWeight: '600' }}>
              💬 +92 370 8316591 (WhatsApp)
            </a>
          </div>
        </div>
      )}

      <style>{`
        @keyframes logo-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(5deg); }
        }
        @keyframes logo-pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.4); opacity: 0.2; }
        }
        /* Slides from right with SOLID bg — never see-through */
        @keyframes mobileSlideIn {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
        @keyframes menuItemIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .nav-link:hover {
          color: white !important;
          background: rgba(99,102,241,0.1) !important;
        }
        .nav-cta:hover {
          box-shadow: 0 8px 25px rgba(99,102,241,0.5) !important;
        }
        .mobile-nav-link:hover {
          background: rgba(99,102,241,0.12) !important;
          border-color: rgba(99,102,241,0.35) !important;
          color: #fff !important;
        }
        @media (max-width: 900px) {
          .nav-links { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
