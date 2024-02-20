import { z } from "zod"

export const taskFormSchema = z.object({
  title: z.string().min(1, {
    message: "O titulo é obrigatório"
  }),
  description: z.string().optional(),
  deadline: z.date().optional(),
  isCompleted: z.boolean().optional()
})
