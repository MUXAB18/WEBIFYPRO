import React, { lazy, Suspense, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Reviews from './components/Reviews';
import OrderForm from './components/OrderForm';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { PhysicsProvider } from './context/PhysicsContext';
import CursorFX from './components/motion/CursorFX';
import CursorTrail from './components/motion/CursorTrail';
import MagneticCard from './components/motion/MagneticCard';

import BackToTop from './components/BackToTop';
import CookieBanner from './components/CookieBanner';
import { MessageCircle } from 'lucide-react';
import SEO from './seo/SEO';

const WA_URL = `https://wa.me/923708316591?text=${encodeURIComponent("Hello Webify Pro! I'd like to start a project with you.")}`;

// Lazy-load heavy 3D scene
const SpaceScene = lazy(() => import('./components/three/SpaceScene'));

// Detect low-end devices: older Android, low memory, reduced-motion preference
function isLowEnd() {
  if (typeof navigator === 'undefined') return false;
  const conn = navigator.connection;
  const slow = conn && (conn.saveData || conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g' || conn.effectiveType === '3g');
  const lowMem = navigator.deviceMemory && navigator.deviceMemory <= 4;
  const lowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobileScreen = window.innerWidth <= 768;
  const isTouch = ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  
  // Aggressively disable heavy 3D/FX if memory is low, CPU is weak, connection is slow, or it's a mobile touch device.
  return slow || lowMem || lowCores || prefersReduced || (mobileScreen && isTouch);
}

function App() {
  const [lowEnd] = useState(() => isLowEnd());
  const [isTouchDevice] = useState(() => ('ontouchstart' in window || navigator.maxTouchPoints > 0));

  // Re-check on resize (phone rotating to tablet etc)
  const [smallScreen, setSmallScreen] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e) => setSmallScreen(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const waButtonStyle = {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: '8px',
    padding: '12px',
    borderRadius: '50px',
    background: 'var(--surface-card, rgba(3,7,18,0.82))',
    border: '1.5px solid #25d366',
    color: '#25d366',
    boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 16px rgba(37,211,102,0.35)',
    backdropFilter: 'blur(10px)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    width: '48px',
    height: '48px',
    overflow: 'hidden',
    boxSizing: 'border-box',
  };

  return (
    <PhysicsProvider>
      <div className="App">
        <SEO />

        {/* Premium cursor effects — skip on touch/low-end */}
        {!isTouchDevice && !lowEnd && <CursorFX />}
        {!isTouchDevice && !lowEnd && <CursorTrail />}

        {/* 3D Canvas — skip on very small/low-end to save GPU */}
        {!lowEnd && (
          <Suspense fallback={null}>
            <SpaceScene />
          </Suspense>
        )}

        {/* Floating WhatsApp Button */}
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 999 }}>
          <MagneticCard
            tiltStrength={isTouchDevice ? 0 : 15}
            scaleHover={1.06}
            zDepth={10}
            glowColor="#25d366"
            data-cursor-color="#25d366"
          >
            <div
              onClick={() => window.open(WA_URL, '_blank')}
              style={waButtonStyle}
              className="floating-wa-btn"
              role="button"
              aria-label="Chat on WhatsApp"
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px', flexShrink: 0 }}>
                <MessageCircle size={20} />
              </div>
              <span className="floating-wa-text" style={{
                fontSize: '0.78rem',
                fontWeight: '700',
                whiteSpace: 'nowrap',
                fontFamily: 'Outfit, sans-serif',
                opacity: 0,
                transform: 'translateX(10px)',
                transition: 'all 0.3s ease',
              }}>
                Chat on WhatsApp
              </span>
            </div>
          </MagneticCard>
        </div>

        {/* Back to top (bottom-left) */}
        <BackToTop />

        {/* GDPR Cookie Banner */}
        <CookieBanner />

        {/* Page content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Navbar />
          <main>
            <Hero lowEnd={lowEnd} />

            <Services />
            <Portfolio />
            <Reviews />
            <OrderForm />
            <Contact />
          </main>
          <Footer />
        </div>

        <style>{`
          /* WA button expand on hover — desktop only */
          @media (hover: hover) {
            .floating-wa-btn:hover {
              width: 178px !important;
              box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 24px rgba(37,211,102,0.5) !important;
            }
            .floating-wa-btn:hover .floating-wa-text {
              opacity: 1 !important;
              transform: translateX(0) !important;
            }
          }
          /* Smooth theme colour transitions — but keep interactions snappy */
          html:not(.theme-switching) body,
          html:not(.theme-switching) section,
          html:not(.theme-switching) nav,
          html:not(.theme-switching) footer,
          html:not(.theme-switching) .wizard-shell,
          html:not(.theme-switching) .review-card-inner,
          html:not(.theme-switching) .galaxy-card {
            transition: background 0.4s ease, background-color 0.4s ease,
                        border-color 0.3s ease, color 0.3s ease,
                        box-shadow 0.3s ease !important;
          }
          button, a, [role="button"] {
            transition: all 0.18s ease !important;
          }
        `}</style>

      </div>
    </PhysicsProvider>
  );
}

export default App;
