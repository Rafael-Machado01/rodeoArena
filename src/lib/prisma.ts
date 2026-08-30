import { PrismaPg } from "@prisma/adapter-pg"; // Para bancos postgrees
import { PrismaClient } from "@/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const primsa = new PrismaClient({
  adapter,
});
// Isso permite fazermos await prisma.findMany etc..
