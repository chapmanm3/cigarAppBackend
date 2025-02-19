import { Request, Response } from "express";
import { createCigarQuery, getCigarsQuery } from "../dbQueries/cigarsQueries";

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
  if (!req.body || !req.body.cigar) {
    res.status(400)
    res.send("Request missing or malformed cigar object")
    return;
  }

  if (!user) {
    res.status(500).json("Server Error: user not found")
    return
  }

  const newCigarId = await createCigarQuery({
    cigar: req.body.cigar,
    uid: user.id
  })
  res.status(200)
  res.send(`Cigar: ${newCigarId} created.`)
}
