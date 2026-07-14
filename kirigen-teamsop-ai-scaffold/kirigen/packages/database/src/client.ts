import { PrismaClient } from '@prisma/client';

/**
 * Shared Prisma client singleton — import this from scripts or
 * anywhere outside the NestJS DI container (the API itself should use
 * apps/api/src/prisma/prisma.service.ts instead, for lifecycle hooks).
 */
declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

export const prisma = global.__prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.__prisma = prisma;
