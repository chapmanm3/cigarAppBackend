import { prismaClient } from './db'
import { CreateCigarSchema } from "../schemas/cigarSchemas";

export async function getCigarsQuery({ uid }: { uid: string }) {
  const cigars = await prismaClient.cigar.findMany({
    where: {
      userId: uid
    }
  });
  return cigars
}

export async function createCigarQuery({ cigar, uid }: { cigar: CreateCigarSchema, uid: string }) {
  const createdCigar = await prismaClient.cigar.create({
    data: {
      ...cigar,
      userId: uid
    }
  })
  return createdCigar.id
}
