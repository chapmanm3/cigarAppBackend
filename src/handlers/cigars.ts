import { Request, Response } from "express";
import { createCigarQuery, getCigarsQuery } from "../dbQueries/cigarsQueries";

export async function getAllCigarsHandler(req: Request, res: Response) {
  const cigars = await getCigarsQuery()
  res.json(cigars)
}

export async function addCigarHandler(req: Request, res: Response) {
  console.log(JSON.stringify(req.body))
  if (!req.body || !req.body.cigar) {
    res.status(400)
    res.send("Request missing or malformed cigar object")
    return;
  }
  const newCigarId = await createCigarQuery(req.body.cigar)
  res.status(200)
  res.send(`Cigar: ${newCigarId} created.`)
}
