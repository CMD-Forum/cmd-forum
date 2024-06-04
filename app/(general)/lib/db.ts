import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined;
}

// eslint-disable-next-line no-undef
export const prisma = globalThis.prisma || new PrismaClient();

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma