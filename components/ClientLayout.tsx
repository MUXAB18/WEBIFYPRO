"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import WhatsAppWidget from '@/components/WhatsAppWidget';

export default function ClientLayout({ 
  children, 
  navLinks, 
  dbServices,
  settings 
}: { 
  children: React.ReactNode, 
  navLinks?: any, 
  dbServices?: any,
  settings?: any 
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return (
      <div style={{ position: 'relative', zIndex: 1 }}>
        <main>{children}</main>
      </div>
    );
  }

  return (
    <>
      <CookieBanner />
      <WhatsAppWidget />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar navLinks={navLinks} settings={settings} />
        <main>{children}</main>
        <Footer navLinks={navLinks} dbServices={dbServices} settings={settings} />
      </div>
    </>
  );
}
