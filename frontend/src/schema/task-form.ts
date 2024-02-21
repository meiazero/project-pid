import { z } from "zod"

export const taskFormSchema = z.object({
  title: z.string().min(1, {
    message: "O título da tarefa é obrigatório"
  }),
  deadline: z.date({
    required_error: "A data de entrega é obrigatória"
  }),
  is_completed: z.boolean().optional()
})
