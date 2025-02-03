"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useUsers } from "@/lib/context/users-context"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { getComments, createComment } from "@/lib/services/comments"

type Comment = {
  id: string
  content: string
  user_id: string
  task_id: string
  created_at: string
}

type TaskCommentsProps = {
  taskId: string
}

export function TaskComments({ taskId }: TaskCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [loading, setLoading] = useState(false)
  const { users } = useUsers()

  useEffect(() => {
    async function loadComments() {
      try {
        const data = await getComments(taskId)
        setComments(data)
      } catch (error) {
        console.error("Error loading comments:", error)
        toast.error("Failed to load comments")
      }
    }
    loadComments()
  }, [taskId])

  function getUserName(userId: string) {
    const user = users.find(user => user.id === userId)
    return user ? user.full_name : "Unknown User"
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!newComment.trim()) return

    try {
      setLoading(true)
      await createComment(taskId, newComment)
      setNewComment("")
      // Refresh comments
      const updatedComments = await getComments(taskId)
      setComments(updatedComments)
      toast.success("Comment added successfully")
    } catch (error) {
      console.error("Error adding comment:", error)
      toast.error("Failed to add comment")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Comments</h3>
      
      <form onSubmit={handleSubmit} className="space-y-2">
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button type="submit" disabled={loading || !newComment.trim()}>
          {loading ? "Adding..." : "Add Comment"}
        </Button>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{getUserName(comment.user_id)}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(comment.created_at).toLocaleString()}
                </p>
              </div>
            </div>
            <p className="mt-2">{comment.content}</p>
          </Card>
        ))}
      </div>
    </div>
  )
} 