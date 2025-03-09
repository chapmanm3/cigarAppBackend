import { Request, Response } from "express";
import { createCigarQuery, deleteCigarQuery, getCigarDetailsQuery, getCigarsQuery, updateCigarQuery } from "../dbQueries/cigarsQueries";
import { createCigarRequestBodySchema, updateCigarRequestBodySchema } from "../schemas/cigarSchemas";
import invariant from "tiny-invariant";

export async function getAllCigarsHandler(req: Request, res: Response) {
  const user = req.user
  invariant(user, "User should be defined at this point")

  const cigars = await getCigarsQuery({ uid: user.id })
  res.json(cigars)
}

export async function addCigarHandler(req: Request, res: Response) {
  const user = req.user

  invariant(user, "User should be defined at this point")

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

export async function updateCigarHandler(req: Request, res: Response) {
  const user = req.user

  invariant(user, "User should be defined at this point")

  try {
    const parsedCigar = updateCigarRequestBodySchema.parse(req.body)
    const updatedCigar = await updateCigarQuery({
      cigar: parsedCigar.cigar,
      uid: user.id
    })

  } catch (err) {
    res.status(400).json({
      message: "Validation error",
      errors: err
    })
  }

}

export async function getCigarDetailsHandler(req: Request, res: Response) {
  const user = req.user;
  const { cigarId } = req.params;

  invariant(user, "User should be defined at this point")

  const cigar = await getCigarDetailsQuery({
    cigarId: parseInt(cigarId),
    uid: user.id
  })
  res.json(cigar)
}

export async function deleteCigarHandler(req: Request, res: Response) {
  const user = req.user
  const { cigarId } = req.params

  invariant(user, "User should be defined at this point")

  const deletedId = await deleteCigarQuery({
    cigarId: parseInt(cigarId),
    uid: user.id
  })
  res.json(deletedId)
}
