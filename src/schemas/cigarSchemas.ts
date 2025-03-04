import { z } from "zod";

const stringSchema = z.string().min(1);

const createCigarSchema = z.object({
  name: stringSchema,
  brand: stringSchema.optional(),
  description: stringSchema.optional(),
})

export const createCigarRequestBodySchema = z.object({
  cigar: createCigarSchema
})

export type CreateCigarSchema = z.infer<typeof createCigarSchema>
