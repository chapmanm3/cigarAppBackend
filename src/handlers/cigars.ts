import { Request, Response } from "express";
import { createCigarQuery, getCigarsQuery } from "../dbQueries/cigarsQueries";
import { createCigarRequestBodySchema } from "../schemas/cigarSchemas";

export async function getAllCigarsHandler(req: Request, res: Response) {
  const user = req.user
  if (!user) {
    res.status(500).json("Server Error: user not found")
    return
  }

  const cigars = await getCigarsQuery({ uid: user.id })
  res.json(cigars)
}

export async function addCigarHandler(req: Request, res: Response) {
  const user = req.user

  if (!user) {
    res.status(500).json("Server Error: user not found")
    return
  }

  try {
    const parsedCigar = createCigarRequestBodySchema.parse(req.body);
    const newCigarId = await createCigarQuery({
      cigar: { ...parsedCigar.cigar },
      uid: user.id
    })

    res.status(200)
    res.send(`Cigar: ${newCigarId} created.`)

  } catch (error) {
    res.status(400).json({
      message: 'Validation error',
      errors: error,
    });
  }
}
