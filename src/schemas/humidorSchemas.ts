import { z } from "zod";

const createHumidorSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1)
})

export const createHumidorRequestSchema = z.object({
  humidor: createHumidorSchema
})

export type CreateHumidorSchema = z.infer<typeof createHumidorSchema>
