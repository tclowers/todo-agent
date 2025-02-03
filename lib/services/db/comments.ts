import { supabase } from "@/lib/supabase/client"

export type Comment = {
  id: string
  content: string
  user_id: string
  task_id: string
  created_at: string
}

export async function getCommentsForTask(taskId: string) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("task_id", taskId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function createCommentInDb(comment: { content: string; user_id: string; task_id: string }) {
  const { data, error } = await supabase
    .from("comments")
    .insert([comment])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteCommentFromDb(id: string) {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", id)

  if (error) throw error
} 