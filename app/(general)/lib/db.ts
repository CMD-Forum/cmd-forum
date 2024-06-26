import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-unused-vars
  var prisma: PrismaClient | undefined;
}

// eslint-disable-next-line no-undef
export const prisma = globalThis.prisma || new PrismaClient();

export const adapter = new PrismaAdapter(prisma.session, prisma.user);

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma