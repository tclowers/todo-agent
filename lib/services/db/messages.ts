import { supabase } from "@/lib/supabase/client"

export type Message = {
  id: string
  content: string
  user_id: string
  chat_id: string
  created_at: string
}

export async function getMessagesForChat(chatId: string) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatId)
    .order("created_at", { ascending: true })

  if (error) throw error
  return data
}

export async function createMessageInDb(message: { content: string; user_id: string; chat_id: string }) {
  const { data, error } = await supabase
    .from("messages")
    .insert([message])
    .select()
    .single()

  if (error) throw error
  return data
}