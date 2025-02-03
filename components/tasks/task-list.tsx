"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { useTasks } from "@/lib/context/tasks-context"
import { EditTaskDialog } from "@/components/tasks/edit-task-dialog"
import { deleteTask } from "@/lib/services/tasks"
import { useUsers } from "@/lib/context/users-context"

type Task = {
  id: string
  title: string
  description: string | null
  status: string
  assigned_to: string | null
  created_at: string
}

export function TaskList() {
  const { tasks, loading, refreshTasks } = useTasks()
  const { users } = useUsers()

  useEffect(() => {
    refreshTasks()
  }, [refreshTasks])

  async function handleDelete(id: string) {
    try {
      await deleteTask(id)
      await refreshTasks()
      toast.success("Task deleted successfully")
    } catch (error) {
      console.error("Error deleting task:", error)
      toast.error("Failed to delete task")
    }
  }

  function getUserName(userId: string | null) {
    if (!userId) return "Unassigned"
    const user = users.find(user => user.id === userId)
    return user ? user.full_name : "Unknown User"
  }

  if (loading) {
    return <div>Loading tasks...</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                No tasks found
              </TableCell>
            </TableRow>
          ) : (
            tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(task.status)}>
                    {formatStatus(task.status)}
                  </Badge>
                </TableCell>
                <TableCell>{getUserName(task.assigned_to)}</TableCell>
                <TableCell>
                  {new Date(task.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <EditTaskDialog task={task} />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Task</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this task? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(task.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

function getStatusVariant(status: string) {
  switch (status) {
    case "completed":
      return "default"
    case "in_progress":
      return "secondary"
    default:
      return "outline"
  }
}

function formatStatus(status: string) {
  return status.split("_").map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(" ")
} 