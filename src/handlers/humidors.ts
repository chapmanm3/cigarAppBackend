import { Request, Response } from 'express'
import { createHumidorQuery, getHumidorsQuery } from '../dbQueries/humidorsQueries'
import { createHumidorRequestSchema } from '../schemas/humidorSchemas'

export async function getHumidorsHandler(req: Request, res: Response) {
  const user = req.user
  if (!user) {
    res.status(500).json("Server Error: user not found")
    return
  }
  const cigars = await getHumidorsQuery({ uid: user.id })
  res.json(cigars)
}

export async function addHumidorHandler(req: Request, res: Response) {
  const user = req.user;
  if (!user) {
    res.status(500).json("Server Error: user not found")
    return
  }

  try {
    const parsedHumidor = createHumidorRequestSchema.parse(req.body)
    const newHumidorId = await createHumidorQuery({
      humidor: { ...parsedHumidor.humidor },
      uid: user.id
    })
    res.status(200)
    res.send(`Created Humidor ID: ${newHumidorId}`)

  } catch (err) {
    res.status(400).json({
      message: "Validation failed",
      errors: err
    })
  }
}
