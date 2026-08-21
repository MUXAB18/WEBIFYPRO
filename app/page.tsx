import React from 'react';
import prisma from '@/lib/prisma';
import ClientHomePage from './ClientHomePage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function MainPage() {
  const dbServices = await prisma.service.findMany({
    orderBy: { order: 'asc' }
  });

  const pageData = await prisma.page.findUnique({
    where: { slug: 'home' },
    include: { sections: { orderBy: { order: 'asc' } } }
  });

  return <ClientHomePage dbServices={dbServices} pageData={pageData} />;
}
