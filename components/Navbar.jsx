"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useScrollProgress } from '../hooks/useScrollProgress';

const Navbar = () => {
  const { scrollProgress } = useScrollProgress();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname();
  
  // Set active section based on current path
  useEffect(() => {
    if (pathname === '/') {
      setActiveSection('home');
    } else {
      const path = pathname.replace('/', '');
      setActiveSection(path);
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home', id: 'home' },
    { href: '/services', label: 'Services', id: 'services' },
    { href: '/solutions', label: 'Solutions', id: 'solutions' },
    { href: '/about', label: 'About', id: 'about' },
    { href: '/blog', label: 'Blog', id: 'blog' },
    { href: '/contact', label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: isScrolled ? '20px' : '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: isScrolled ? '90%' : '100%',
        maxWidth: isScrolled ? '1200px' : '100%',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: isScrolled ? '12px 24px' : '20px 5%',
        background: isScrolled
          ? 'rgba(255, 255, 255, 0.85)'
          : 'var(--color-bg)',
        backdropFilter: isScrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(24px)' : 'none',
        border: isScrolled
          ? '1px solid rgba(11, 30, 57, 0.08)'
          : '1px solid transparent',
        borderRadius: isScrolled ? '100px' : '0',
        boxShadow: isScrolled
          ? '0 10px 40px -10px rgba(11, 30, 57, 0.1)'
          : 'none',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden',
      }}>
        {/* Logo */}
        <Link href="/" aria-label="Webify Pro Home" style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          cursor: 'pointer',
          outline: 'none',
        }}>
          <img
            src="/webifylogo-new-withname.png"
            height="48"
            alt="Webify Pro Logo"
            style={{
              height: '48px',
              width: 'auto',
              objectFit: 'contain',
            }}
          />
        </Link>

        {/* Desktop nav links */}
        <ul style={{
          display: 'flex',
          gap: '4px',
          fontWeight: '600',
          alignItems: 'center',
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }} className="nav-links">
          {navLinks.map(link => (
            <li key={link.id}>
              <Link
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                style={{
                  position: 'relative',
                  padding: '8px 16px',
                  borderRadius: '100px',
                  color: activeSection === link.id ? 'var(--color-accent)' : 'var(--color-primary)',
                  background: activeSection === link.id ? 'rgba(255, 107, 53, 0.08)' : 'transparent',
                  border: '1px solid transparent',
                  fontSize: '0.95rem',
                  fontWeight: activeSection === link.id ? '700' : '600',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  textDecoration: 'none',
                  display: 'block',
                  overflow: 'hidden',
                  outline: 'none',
                }}
                className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right - CTA & Mobile hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="nav-cta-container">
            <Link
              href="/start-project"
              onClick={() => setIsMenuOpen(false)}
              className="btn-premium-nav"
            >
              Start Your Project
            </Link>
          </div>
          <button
            className="mobile-menu-btn"
            aria-label="Open mobile menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(true)}
            style={{
              cursor: 'pointer', zIndex: 101,
              display: 'none', alignItems: 'center', justifyContent: 'center',
              width: '44px', height: '44px', borderRadius: '8px',
              background: 'transparent', border: '1px solid var(--color-border)',
              color: 'var(--color-primary)',
              outline: 'none',
            }}
          >
            <Menu size={24} strokeWidth={2.5} />
          </button>
        </div>

        {/* Scroll Progress Bar */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '2px',
            background: 'var(--color-accent)',
            transformOrigin: '0% 50%',
            transform: `scaleX(${scrollProgress})`,
            opacity: isScrolled ? 1 : 0,
            transition: 'opacity 0.3s ease, transform 0.1s ease-out',
            willChange: 'transform',
          }}
        />
      </nav>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          background: 'var(--color-bg)',
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
            borderBottom: '1px solid var(--color-border)',
            background: 'var(--color-surface)',
            flexShrink: 0,
          }}>
            <Link href="/" aria-label="Webify Pro Home" onClick={() => setIsMenuOpen(false)} style={{
              display: 'flex', alignItems: 'center', textDecoration: 'none',
            }}>
              <img src="/webifylogo-new-withname.png" height="40" alt="Webify Pro Logo" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close mobile menu"
              style={{
                background: 'transparent', border: '1px solid var(--color-border)',
                borderRadius: '8px', width: '40px', height: '40px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--color-primary)', flexShrink: 0,
              }}
            >
              <X size={22} strokeWidth={2.5} />
            </button>
          </div>

          {/* Nav links */}
          <div style={{ display: 'flex', flexDirection: 'column', padding: '28px 6%', gap: '10px', flex: 1 }}>
            {navLinks.map((link, idx) => {
              const isActive = activeSection === link.id;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '16px',
                    fontSize: '1.25rem', fontWeight: '700',
                    fontFamily: 'Inter, sans-serif',
                    color: isActive ? 'var(--color-accent)' : 'var(--color-primary)',
                    textDecoration: 'none',
                    padding: '16px 20px', borderRadius: '12px',
                    background: isActive ? 'rgba(11, 30, 57, 0.04)' : 'transparent',
                    border: '1px solid transparent',
                    transition: 'all 0.2s ease',
                  }}
                  className="mobile-nav-link"
                >
                  <span style={{
                    fontSize: '0.8rem', fontFamily: 'monospace',
                    color: isActive ? 'var(--color-accent)' : 'var(--color-text)',
                    fontWeight: '600', minWidth: '22px',
                  }}>{String(idx + 1).padStart(2, '0')}</span>
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <div style={{ marginTop: '20px' }}>
              <Link href="/start-project" onClick={() => setIsMenuOpen(false)} className="btn-premium-nav" style={{ display: 'flex', width: '100%', textAlign: 'center', textDecoration: 'none' }}>
                Start Your Project
              </Link>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes mobileSlideIn {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
        .nav-link {
          position: relative;
        }
        .nav-link::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: var(--color-accent);
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          border-radius: 2px;
          opacity: 0;
        }
        .nav-link:hover::before {
          width: 40%;
          opacity: 1;
        }
        .nav-link.active::before {
          display: none;
        }
        .nav-link:hover {
          color: var(--color-accent) !important;
          background: rgba(255, 107, 53, 0.04) !important;
        }
        .btn-premium-nav {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 28px;
          font-size: 0.95rem;
          font-weight: 700;
          color: #fff;
          border-radius: 100px;
          text-decoration: none;
          background: var(--color-primary);
          box-shadow: 0 4px 15px rgba(11, 30, 57, 0.15);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }
        .btn-premium-nav::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 50%; height: 100%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%);
          transform: skewX(-20deg);
          animation: sweep 4s infinite;
        }
        .btn-premium-nav:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 10px 25px rgba(11, 30, 57, 0.25);
        }
        @keyframes gradientFlow {
          to { background-position: 200% center; }
        }
        @keyframes sweep {
          0% { left: -100%; }
          15% { left: 200%; }
          100% { left: 200%; }
        }
        .mobile-nav-link:hover {
          background: rgba(11, 30, 57, 0.04) !important;
          color: var(--color-accent) !important;
        }
        @media (max-width: 900px) {
          .nav-links { display: none !important; }
          .nav-cta-container { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
