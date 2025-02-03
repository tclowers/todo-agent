"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useTasks } from "@/lib/context/tasks-context"

export function CompleteTasksButton() {
  const [completing, setCompleting] = useState(false)
  const { refreshTasks } = useTasks()

  async function handleCompleteTasks() {
    try {
      setCompleting(true)
      const response = await fetch('/api/tasks/complete', { method: 'POST' })
      if (!response.ok) throw new Error('Failed to complete tasks')
      await refreshTasks()
      toast.success('Tasks processed successfully')
    } catch (error) {
      console.error('Error completing tasks:', error)
      toast.error('Failed to process tasks')
    } finally {
      setCompleting(false)
    }
  }

  return (
    <Button 
      onClick={handleCompleteTasks} 
      disabled={completing}
      variant="outline"
    >
      {completing ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing Tasks...
        </>
      ) : (
        "Complete Tasks"
      )}
    </Button>
  )
} 