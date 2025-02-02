import { supabase } from "@/lib/supabase/client"
import type { TaskFormValues } from "@/lib/schemas/task"

export async function createTask(task: TaskFormValues) {
  const { data, error } = await supabase
    .from("tasks")
    .insert([
      {
        title: task.title,
        description: task.description,
        status: task.status,
        assigned_to: task.assigned_to,
      },
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getTasks() {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
} 