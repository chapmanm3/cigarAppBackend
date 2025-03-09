import { prismaClient } from './db'
import { CreateCigarSchema, UpdateCigarSchema } from "../schemas/cigarSchemas";

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

export async function updateCigarQuery({ cigar, uid }: { cigar: UpdateCigarSchema, uid: string}) {
  const updatedCigar = await prismaClient.cigar.update({
    where: {
      id: cigar.id,
      userId: uid
    },
    data: {
      ...cigar
    }
  })

  return updatedCigar.id
}

export async function getCigarDetailsQuery({ cigarId, uid }: { cigarId: number, uid: string }) {

  const cigarDetails = await prismaClient.cigar.findUnique({
    where: {
      userId: uid,
      id: cigarId
    }
  })

  return cigarDetails
}

export async function deleteCigarQuery({ cigarId, uid }: { cigarId: number, uid: string }) {
  const deletedCigar = await prismaClient.cigar.delete({
    where: {
      id: cigarId,
      userId: uid
    }
  })

  return deletedCigar.id
}
