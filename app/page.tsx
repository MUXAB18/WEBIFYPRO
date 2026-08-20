"use client";
import React, { lazy, Suspense, useState, useEffect } from 'react';

import Hero from '@/components/Hero';
import ErrorBoundary from '@/components/ErrorBoundary';

// Lazy load heavy/below-fold components
const Trust = lazy(() => import('@/components/Trust'));
const Services = lazy(() => import('@/components/Services'));
const GrowthCTA = lazy(() => import('@/components/GrowthCTA'));
const FAQ = lazy(() => import('@/components/FAQ'));
const Contact = lazy(() => import('@/components/Contact'));
const WhyUs = lazy(() => import('@/components/WhyUs'));
const Process = lazy(() => import('@/components/Process'));
const TechStack = lazy(() => import('@/components/TechStack'));

function isLowEnd() {
  if (typeof navigator === 'undefined') return false;
  const conn = (navigator as any).connection;
  const slow = conn && (conn.saveData || conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g' || conn.effectiveType === '3g');
  const lowMem = (navigator as any).deviceMemory && (navigator as any).deviceMemory <= 4;
  const lowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobileScreen = window.innerWidth <= 768;
  const isTouch = ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  return slow || lowMem || lowCores || prefersReduced || (mobileScreen && isTouch);
}

export default function MainPage() {
  const [lowEnd, setLowEnd] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    try {
      setLowEnd(isLowEnd());
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

      if (window.location.hash) {
        setTimeout(() => {
          const id = window.location.hash.replace('#', '');
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <>
      <ErrorBoundary>
        <Hero lowEnd={lowEnd} />
        <Suspense fallback={<div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>Loading...</div>}>
          <Trust />
          <Services />
          <TechStack />
          <WhyUs />
          <Process />
          <Contact />
          <FAQ />
          <GrowthCTA />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
