import { Cigar, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function getCigarsQuery({ uid }: { uid: string }) {
  const cigars = prisma.cigar.findMany({
    where: {
      userId: uid
    }
  });
  return cigars
}

export async function createCigarQuery({ cigar, uid }: { cigar: Cigar, uid: string }) {
  const createdCigar = await prisma.cigar.create({
    data: {
      ...cigar,
      userId: uid
    }
  })
  return createdCigar.id
}
