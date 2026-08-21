const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
console.log('NavigationItem model exists:', !!prisma.navigationItem);
