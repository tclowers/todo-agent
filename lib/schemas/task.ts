import * as z from "zod"

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  assigned_to: z.string().optional(),
  status: z.enum(["pending", "in_progress", "completed"]).default("pending"),
})

export type TaskFormValues = z.infer<typeof taskSchema> 