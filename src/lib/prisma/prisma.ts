import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const basePrisma = new PrismaClient();
const prisma = basePrisma.$extends(withAccelerate());

export const prismaForAdapter = basePrisma as PrismaClient;

const globalForPrisma = global as unknown as { prisma: typeof prisma };

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
