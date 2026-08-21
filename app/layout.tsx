import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Webify Pro | Web Development & Digital Marketing',
  description: 'Premium React, MERN stack web development and growth-driven digital marketing agency. We build fast, high-converting digital experiences.',
  keywords: ['web design Sialkot', 'web developer Pakistan', 'MERN stack developer', 'digital marketing Sialkot', 'Webify Pro']
};

import ClientLayout from '@/components/ClientLayout';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let navLinks: any[] = [];
  let dbServices: any[] = [];
  let settings: any = null;

  try {
    navLinks = await prisma.navigationItem.findMany({
      orderBy: { order: 'asc' }
    });
    
    dbServices = await prisma.service.findMany({
      orderBy: { order: 'asc' }
    });
    
    settings = await prisma.websiteSettings.findFirst();
  } catch (error: any) {
    console.warn("Prisma connection failed (expected during build without DB):", error.message);
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="App">
          <ClientLayout navLinks={navLinks} dbServices={dbServices} settings={settings}>{children}</ClientLayout>
        </div>
      </body>
    </html>
  );
}
