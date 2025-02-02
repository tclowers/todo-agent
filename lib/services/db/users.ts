import { supabase } from "@/lib/supabase/client"
import type { UserFormValues } from "@/lib/schemas/user"

export async function createUserInDb(user: UserFormValues) {
  const { data, error } = await supabase
    .from("users")
    .insert([user])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getUsersFromDb() {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function updateUserInDb(id: string, user: UserFormValues) {
  const { data, error } = await supabase
    .from("users")
    .update(user)
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteUserFromDb(id: string) {
  const { error } = await supabase
    .from("users")
    .delete()
    .eq("id", id)

  if (error) throw error
} 