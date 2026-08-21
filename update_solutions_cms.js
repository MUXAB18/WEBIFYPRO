const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const page = await prisma.page.findUnique({
    where: { slug: 'solutions' },
    include: { sections: true }
  });

  if (!page) {
    console.log("Solutions page not found");
    return;
  }

  // Delete TECH_STACK
  const techStack = page.sections.find(s => s.type === 'TECH_STACK');
  if (techStack) {
    await prisma.pageSection.delete({
      where: { id: techStack.id }
    });
    console.log("Deleted TECH_STACK section");
  }

  // Add SOLUTIONS_LIST if not present
  const hasSolutionsList = page.sections.find(s => s.type === 'SOLUTIONS_LIST');
  if (!hasSolutionsList) {
    await prisma.pageSection.create({
      data: {
        pageId: page.id,
        type: 'SOLUTIONS_LIST',
        content: JSON.stringify({ hideHeader: false }),
        order: page.sections.length
      }
    });
    console.log("Added SOLUTIONS_LIST section");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
