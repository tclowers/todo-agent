import { CreateTaskDialog } from "@/components/tasks/create-task-dialog"
import { TaskList } from "@/components/tasks/task-list"

export default function TasksPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <CreateTaskDialog />
      </div>
      <TaskList />
    </div>
  )
} 