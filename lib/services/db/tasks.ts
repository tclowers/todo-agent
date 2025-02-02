import { supabase } from "@/lib/supabase/client"
import type { TaskFormValues } from "@/lib/schemas/task"

export async function createTaskInDb(task: TaskFormValues) {
  const { data, error } = await supabase
    .from("tasks")
    .insert([task])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getTasksFromDb() {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function updateTaskInDb(id: string, task: TaskFormValues) {
  const { data, error } = await supabase
    .from("tasks")
    .update(task)
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteTaskFromDb(id: string) {
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id)

  if (error) throw error
} 