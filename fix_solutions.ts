import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const solutions = await prisma.solution.findMany();
  for (const sol of solutions) {
    if (sol.seoTitle && sol.seoTitle.includes(',')) {
      await prisma.solution.update({
        where: { id: sol.id },
        data: {
          seoTitle: sol.seoTitle.split(',').map(s => s.trim()).join('\n'),
          seoDescription: sol.seoDescription ? sol.seoDescription.split(',').map(s => s.trim()).join('\n') : null
        }
      });
      console.log(`Updated solution: ${sol.name}`);
    }
  }
  console.log('Fix complete.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
