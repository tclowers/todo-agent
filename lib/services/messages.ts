import type { Message } from "./db/messages"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || ''

export async function getMessages(chatId: string): Promise<Message[]> {
  const response = await fetch(`${API_BASE}/api/chats/${chatId}/messages`)
  if (!response.ok) {
    if (response.status === 404) {
      return []
    }
    throw new Error("Failed to fetch messages")
  }
  return response.json()
}

export async function createMessage(chatId: string, content: string): Promise<Message> {
  const response = await fetch(`${API_BASE}/api/chats/${chatId}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  })
  
  if (!response.ok) throw new Error("Failed to create message")
  return response.json()
} 