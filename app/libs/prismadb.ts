import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();

/* 
  This fix NextJS 13 Hot reload issue 
  with regards to re-creating 
  PrismaClient instance every time 
*/
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client;
