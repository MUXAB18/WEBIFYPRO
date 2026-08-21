const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const page = await prisma.page.findUnique({
    where: { slug: 'blog' },
    include: { sections: true }
  });

  if (!page) {
    console.log("Blog page not found");
    return;
  }

  console.log("Current sections:", page.sections.map(s => s.type));

  const hasBlogList = page.sections.find(s => s.type === 'BLOG_LIST');
  if (!hasBlogList) {
    await prisma.pageSection.create({
      data: {
        pageId: page.id,
        type: 'BLOG_LIST',
        content: JSON.stringify({ hideHeader: false }),
        order: page.sections.length
      }
    });
    console.log("Added BLOG_LIST to Blog page");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
