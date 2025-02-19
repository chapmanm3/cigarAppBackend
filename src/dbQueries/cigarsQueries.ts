import { Cigar } from "@prisma/client";
import { prismaClient } from './db'

export async function getCigarsQuery({ uid }: { uid: string }) {
  const cigars = await prismaClient.cigar.findMany({
    where: {
      userId: uid
    }
  });
  return cigars
}

export async function createCigarQuery({ cigar, uid }: { cigar: Cigar, uid: string }) {
  const createdCigar = await prismaClient.cigar.create({
    data: {
      ...cigar,
      userId: uid
    }
  })
  return createdCigar.id
}
