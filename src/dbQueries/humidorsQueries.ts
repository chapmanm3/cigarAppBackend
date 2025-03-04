import { Humidor } from '@prisma/client'
import { prismaClient } from './db'
import { CreateHumidorSchema } from '../schemas/humidorSchemas'

export async function getHumidorsQuery({ uid }: { uid: string }) {
  const humidors = await prismaClient.humidor.findMany({
    where: {
      userId: uid
    }
  })

  return humidors
}

export async function createHumidorQuery({ humidor, uid }: { humidor: CreateHumidorSchema, uid: string }) {
  const createdHumidor = await prismaClient.humidor.create({
    data: {
      ...humidor,
      userId: uid
    }
  })
  return createdHumidor.id
}
