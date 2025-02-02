import type { UserFormValues } from "@/lib/schemas/user"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || ''

export type User = {
  id: string
  full_name: string
  email: string
  created_at: string
}

export async function createUser(user: UserFormValues) {
  const response = await fetch(`${API_BASE}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
  
  if (!response.ok) throw new Error("Failed to create user")
  return response.json()
}

export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${API_BASE}/api/users`)
  if (!response.ok) throw new Error("Failed to get users")
  return response.json()
}

export async function updateUser(id: string, user: UserFormValues) {
  const response = await fetch(`${API_BASE}/api/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
  
  if (!response.ok) throw new Error("Failed to update user")
  return response.json()
}

export async function deleteUser(id: string) {
  const response = await fetch(`${API_BASE}/api/users/${id}`, {
    method: "DELETE",
  })
  
  if (!response.ok) throw new Error("Failed to delete user")
} 