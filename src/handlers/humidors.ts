import { Request, Response } from 'express'
import { createHumidorQuery, getHumidorsQuery } from '../dbQueries/humidorsQueries'

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

  if (!req.body || !req.body.humidor) {
    res.status(400)
    res.send("Request missing humidor object")
    return
  }

  const newHumidorId = await createHumidorQuery({
    humidor: req.body.humidor,
    uid: user.id
  })
  res.status(200)
  res.send(`Created Humidor ID: ${newHumidorId}`)
}
