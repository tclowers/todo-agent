import { z } from "zod"

export const userSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  user_type: z.enum(["human", "AI"]).default("human"),
})

export type UserFormValues = z.infer<typeof userSchema> 