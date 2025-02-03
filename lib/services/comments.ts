import type { Comment } from "./db/comments"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || ''

export async function getComments(taskId: string): Promise<Comment[]> {
  const response = await fetch(`${API_BASE}/api/tasks/${taskId}/comments`)
  if (!response.ok) {
    if (response.status === 404) {
      return []
    }
    throw new Error("Failed to fetch comments")
  }
  return response.json()
}

export async function createComment(taskId: string, content: string) {
  const response = await fetch(`${API_BASE}/api/tasks/${taskId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  })
  
  if (!response.ok) throw new Error("Failed to create comment")
  return response.json()
}

export async function deleteComment(taskId: string, commentId: string) {
  const response = await fetch(`${API_BASE}/api/tasks/${taskId}/comments/${commentId}`, {
    method: "DELETE",
  })
  
  if (!response.ok) throw new Error("Failed to delete comment")
} 