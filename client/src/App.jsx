import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServiceMarquee from './components/ServiceMarquee';
import Footer from './components/Footer';
import { PhysicsProvider } from './context/PhysicsContext';
import CursorFX from './components/motion/CursorFX';

import BackToTop from './components/BackToTop';
import CookieBanner from './components/CookieBanner';
import ChatBot from './components/ChatBot';
import WhatsAppWidget from './components/WhatsAppWidget';
import SEO from './seo/SEO';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load heavy components to drastically reduce initial JS payload
const Services = lazy(() => import('./components/Services'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Reviews = lazy(() => import('./components/Reviews'));
const OrderForm = lazy(() => import('./components/OrderForm'));
const Contact = lazy(() => import('./components/Contact'));

const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// Lazy-load heavy 3D scene
const SpaceScene = lazy(() => import('./components/three/SpaceScene'));

// Detect low-end devices
function isLowEnd() {
  if (typeof navigator === 'undefined') return false;
  const conn = navigator.connection;
  const slow = conn && (conn.saveData || conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g' || conn.effectiveType === '3g');
  const lowMem = navigator.deviceMemory && navigator.deviceMemory <= 4;
  const lowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobileScreen = window.innerWidth <= 768;
  const isTouch = ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  
  return slow || lowMem || lowCores || prefersReduced || (mobileScreen && isTouch);
}

function MainPage({ lowEnd, isTouchDevice }) {
  useEffect(() => {
    // Attempt smooth scroll to hash if present on mount
    if (window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.replace('#', '');
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, []);

  return (
    <>
      <SEO 
        title="Webify Pro | Web Development & Digital Marketing"
        description="Premium React, MERN stack web development and growth-driven digital marketing agency. We build fast, high-converting digital experiences."
        keywords={['web development', 'digital marketing', 'react agency', 'MERN stack', 'seo services', 'webify pro']}
      />

      <PhysicsProvider>
        {!isTouchDevice && <CursorFX />}
        
        {/* Background 3D Scene */}
        {!lowEnd && (
          <ErrorBoundary>
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
              <Suspense fallback={null}>
                <SpaceScene />
              </Suspense>
            </div>
          </ErrorBoundary>
        )}

        {/* New Popup WhatsApp Widget */}
        <WhatsAppWidget isTouchDevice={isTouchDevice} />

        {/* Back to top (bottom-left) */}
        <BackToTop />

        {/* GDPR Cookie Banner */}
        <CookieBanner />

        {/* AI ChatBot */}
        <ChatBot />

        {/* Page content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Navbar />
          <main>
            <ErrorBoundary>
              <Hero lowEnd={lowEnd} />
              <ServiceMarquee />
              
              <Suspense fallback={<div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a5b4fc' }}>Loading...</div>}>
                <Services />
                <Portfolio />
                <Reviews />
                <OrderForm />
                <Contact />
              </Suspense>
            </ErrorBoundary>
          </main>
          <Footer />
        </div>
      </PhysicsProvider>
    </>
  );
}

function App() {
  const [lowEnd] = useState(() => isLowEnd());
  const [isTouchDevice] = useState(() => ('ontouchstart' in window || navigator.maxTouchPoints > 0));

  return (
    <Router>
      <Routes>
        {/* Main Website Route */}
        <Route path="/" element={<MainPage lowEnd={lowEnd} isTouchDevice={isTouchDevice} />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={
          <Suspense fallback={<div style={{height: '100vh', display: 'grid', placeItems: 'center', color: '#fff'}}>Loading Admin...</div>}>
            <AdminLogin />
          </Suspense>
        } />
        <Route path="/admin/dashboard" element={
          <Suspense fallback={<div style={{height: '100vh', display: 'grid', placeItems: 'center', color: '#fff'}}>Loading Dashboard...</div>}>
            <AdminDashboard />
          </Suspense>
        } />
        <Route path="/admin" element={
          <Suspense fallback={null}>
            <AdminLogin />
          </Suspense>
        } />
      </Routes>
    </Router>
  );
}

export default App;
