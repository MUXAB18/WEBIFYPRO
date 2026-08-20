import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Webify Pro | Web Development & Digital Marketing',
  description: 'Premium React, MERN stack web development and growth-driven digital marketing agency. We build fast, high-converting digital experiences.',
  keywords: ['web design Sialkot', 'web developer Pakistan', 'MERN stack developer', 'digital marketing Sialkot', 'Webify Pro']
};

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import WhatsAppWidget from '@/components/WhatsAppWidget';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="App">
          <CookieBanner />
          <WhatsAppWidget />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Navbar />
            <main>
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
