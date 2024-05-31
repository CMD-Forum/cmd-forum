import { PrismaClient } from '@prisma/client'
import { withOptimize } from "@prisma/extension-optimize";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma