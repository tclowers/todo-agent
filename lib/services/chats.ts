import type { Chat } from "./db/chats"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || ''

export async function getChats(): Promise<Chat[]> {
  const response = await fetch(`${API_BASE}/api/chats`)
  if (!response.ok) throw new Error("Failed to fetch chats")
  return response.json()
}

export async function createChat(): Promise<Chat> {
  const response = await fetch(`${API_BASE}/api/chats`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
  
  if (!response.ok) throw new Error("Failed to create chat")
  return response.json()
}

export async function updateChat(id: string, completed: boolean): Promise<Chat> {
  const response = await fetch(`${API_BASE}/api/chats/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
  })
  
  if (!response.ok) throw new Error("Failed to update chat")
  return response.json()
}

export async function evaluateChats(): Promise<void> {
  const response = await fetch(`${API_BASE}/api/chats/evaluate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
  
  if (!response.ok) throw new Error("Failed to evaluate chats")
} 