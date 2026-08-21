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

export default function ClientHomePage({ dbServices, pageData }: { dbServices?: any, pageData?: any }) {
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
        {pageData?.sections && pageData.sections.length > 0 ? (
          pageData.sections.map((section: any) => {
            let content = {};
            try { content = JSON.parse(section.content); } catch (e) {}

            switch (section.type) {
              case 'HERO':
                return <Hero key={section.id} lowEnd={lowEnd} hero={content} />;
              case 'STATS':
                return <Suspense key={section.id} fallback={<div />}><Trust stats={content} /></Suspense>;
              case 'SERVICES_LIST':
                return <Suspense key={section.id} fallback={<div />}><Services dbServices={dbServices} hero={content} /></Suspense>;
              case 'TECH_STACK':
                return <Suspense key={section.id} fallback={<div />}><TechStack techStack={content} /></Suspense>;
              case 'VALUES':
                return <Suspense key={section.id} fallback={<div />}><WhyUs values={content} /></Suspense>;
              case 'PROCESS':
                return <Suspense key={section.id} fallback={<div />}><Process data={content} /></Suspense>;
              case 'CONTACT_FORM':
                return <Suspense key={section.id} fallback={<div />}><Contact /></Suspense>;
              case 'FAQ':
                return <Suspense key={section.id} fallback={<div />}><FAQ data={content} /></Suspense>;
              case 'CTA':
                return <Suspense key={section.id} fallback={<div />}><GrowthCTA cta={content} /></Suspense>;
              default:
                return null;
            }
          })
        ) : (
          <>
            <Hero lowEnd={lowEnd} />
            <Suspense fallback={<div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>Loading...</div>}>
              <Trust />
              <Services dbServices={dbServices} />
              <TechStack />
              <WhyUs />
              <Process />
              <Contact />
              <FAQ />
              <GrowthCTA />
            </Suspense>
          </>
        )}
      </ErrorBoundary>
    </>
  );
}
