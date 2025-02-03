import { CreateTaskDialog } from "@/components/tasks/create-task-dialog"
import { TaskList } from "@/components/tasks/task-list"
import { TasksProvider } from "@/lib/context/tasks-context"
import { UsersProvider } from "@/lib/context/users-context"
import { CompleteTasksButton } from "@/components/tasks/complete-tasks-button"

export default function TasksPage() {
  return (
    <UsersProvider>
      <TasksProvider>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Tasks</h1>
            <div className="flex gap-2">
              <CompleteTasksButton />
              <CreateTaskDialog />
            </div>
          </div>
          <TaskList />
        </div>
      </TasksProvider>
    </UsersProvider>
  )
} 