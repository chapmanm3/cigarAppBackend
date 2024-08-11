import { Cigar, PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export function getCigarsQuery() {
  const cigars = prisma.cigar.findMany();
  return cigars
}

export async function createCigarQuery(data: Cigar) {
  const cigar = await prisma.cigar.create({ data })
  return cigar.id
}
