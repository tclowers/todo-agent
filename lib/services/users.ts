import { supabase } from "@/lib/supabase/client"

export async function getUsers() {
  const { data, error } = await supabase
    .from("users")
    .select("id, full_name")
    .order("full_name")

  if (error) throw error
  return data
} 