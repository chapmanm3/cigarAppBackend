import { z } from "zod";

const stringSchema = z.string().min(1);

const createCigarSchema = z.object({
  name: stringSchema,
  brand: stringSchema.optional(),
  description: stringSchema.optional(),
})

const updateCigarSchema = createCigarSchema.extend({
  id: z.number()
})

export type UpdateCigarSchema = z.infer<typeof updateCigarSchema>

export const updateCigarRequestBodySchema = z.object({
  cigar: updateCigarSchema
})

export const createCigarRequestBodySchema = z.object({
  cigar: createCigarSchema
})

export type CreateCigarSchema = z.infer<typeof createCigarSchema>
