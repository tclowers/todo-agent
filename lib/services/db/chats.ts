import { supabase } from "@/lib/supabase/client"

export type Chat = {
  id: string
  user_id: string
  created_at: string
}

export async function getChatsFromDb() {
  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function createChatInDb(chat: { user_id: string }) {
  const { data, error } = await supabase
    .from("chats")
    .insert([chat])
    .select()
    .single()

  if (error) throw error
  return data
} 