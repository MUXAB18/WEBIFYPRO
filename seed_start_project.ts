import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const page = await prisma.page.upsert({
    where: { slug: 'start-project' },
    update: {},
    create: {
      title: 'Get a Quote',
      slug: 'start-project',
      isPublished: true,
      metaTitle: 'Get a Quote | Webify Pro',
      metaDescription: 'Get a custom quote for your web development or digital marketing project.',
    }
  });

  const existingSections = await prisma.pageSection.count({
    where: { pageId: page.id }
  });

  if (existingSections === 0) {
    await prisma.pageSection.create({
      data: {
        pageId: page.id,
        type: 'HERO',
        order: 0,
        content: JSON.stringify({
          subtitle: 'Project Quote',
          title: 'Start your {Project.}',
          titleAccentColor: 'var(--color-accent)',
          description: "Tell us about your requirements using our wizard, and we'll provide a comprehensive proposal and timeline."
        })
      }
    });
    console.log('Created HERO section for start-project page');
  } else {
    console.log('Sections already exist for start-project page');
  }

  console.log('Done!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
