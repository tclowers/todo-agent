import { z } from "zod"

export const userSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
})

export type UserFormValues = z.infer<typeof userSchema> 