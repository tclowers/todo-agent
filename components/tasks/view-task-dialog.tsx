"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Eye } from "lucide-react"
import { useState } from "react"
import { TaskComments } from "@/components/tasks/task-comments"
import { useUsers } from "@/lib/context/users-context"

type ViewTaskDialogProps = {
  task: {
    id: string
    title: string
    description: string | null
    status: string
    assigned_to: string | null
  }
}

export function ViewTaskDialog({ task }: ViewTaskDialogProps) {
  const [open, setOpen] = useState(false)
  const { users } = useUsers()

  function getUserName(userId: string | null) {
    if (!userId) return "Unassigned"
    const user = users.find(user => user.id === userId)
    return user ? user.full_name : "Unknown User"
  }

  function formatStatus(status: string) {
    return status.split("_").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>View Task</DialogTitle>
          <DialogDescription>
            Task details and comments.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">Title</h3>
              <p className="text-sm text-muted-foreground">{task.title}</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Description</h3>
              <p className="text-sm text-muted-foreground">
                {task.description || "No description provided"}
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-1">Status</h3>
              <p className="text-sm text-muted-foreground">
                {formatStatus(task.status)}
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-1">Assigned To</h3>
              <p className="text-sm text-muted-foreground">
                {getUserName(task.assigned_to)}
              </p>
            </div>
          </div>

          <TaskComments taskId={task.id} />
        </div>
      </DialogContent>
    </Dialog>
  )
} 