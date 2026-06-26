import React, { lazy, Suspense, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import { PhysicsProvider } from './context/PhysicsContext';
import CursorFX from './components/motion/CursorFX';
import MagneticCard from './components/motion/MagneticCard';

import BackToTop from './components/BackToTop';
import CookieBanner from './components/CookieBanner';
import WhatsAppWidget from './components/WhatsAppWidget';
import ChatBot from './components/ChatBot';
import SEO from './seo/SEO';
import ErrorBoundary from './components/ErrorBoundary';


import Services from './components/Services';
import TechStrip from './components/TechStrip';
import Portfolio from './components/Portfolio';
import Reviews from './components/Reviews';
import OrderForm from './components/OrderForm';
import Contact from './components/Contact';

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



  return (
    <PhysicsProvider>
      <div className="App">
        <SEO />

        {/* Premium cursor effects — skip on touch/low-end */}
        {!isTouchDevice && !lowEnd && <CursorFX />}

        {/* 3D Canvas — skip on very small/low-end to save GPU */}
        {!lowEnd && (
          <ErrorBoundary>
            <Suspense fallback={null}>
              <SpaceScene />
            </Suspense>
          </ErrorBoundary>
        )}

        {/* WhatsApp Chat Widget */}
        <WhatsAppWidget />
        <ChatBot />

        {/* Back to top (bottom-left) */}
        <BackToTop />

        {/* GDPR Cookie Banner */}
        <CookieBanner />

        {/* Page content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Navbar />
          <main>
            <ErrorBoundary>
              <Hero lowEnd={lowEnd} />
              <TechStrip />
              <Services />
              <Portfolio />
              <Reviews />
              <OrderForm />
              <Contact />
            </ErrorBoundary>
          </main>
          <Footer />
        </div>

        <style>{`
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
