import { z } from "zod"

export const customerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().optional(),
  phone_number: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  preferred_medium: z.enum(["phone", "text", "email"]).default("email"),
})

export type CustomerFormValues = z.infer<typeof customerSchema> 