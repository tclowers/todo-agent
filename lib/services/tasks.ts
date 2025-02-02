import type { TaskFormValues } from "@/lib/schemas/task"
import type { Task } from "@/lib/schemas/task"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || ''

export async function createTask(task: TaskFormValues) {
  const response = await fetch(`${API_BASE}/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  })
  
  if (!response.ok) throw new Error("Failed to create task")
  return response.json()
}

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(`${API_BASE}/api/tasks`)
  if (!response.ok) throw new Error("Failed to get tasks")
  return response.json()
}

export async function updateTask(id: string, task: TaskFormValues) {
  const response = await fetch(`${API_BASE}/api/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  })
  
  if (!response.ok) throw new Error("Failed to update task")
  return response.json()
}

export async function deleteTask(id: string) {
  const response = await fetch(`${API_BASE}/api/tasks/${id}`, {
    method: "DELETE",
  })
  
  if (!response.ok) throw new Error("Failed to delete task")
} 