"use client"

import { createContext, useContext, useState, useCallback } from "react"
import type { ReactNode } from "react"
import { getTasks } from "@/lib/services/tasks"
import type { Task } from "@/lib/schemas/task"
import { useUsers } from "@/lib/context/users-context"

type TasksContextType = {
  tasks: Task[]
  loading: boolean
  refreshTasks: () => Promise<void>
}

const TasksContext = createContext<TasksContextType | undefined>(undefined)

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const { loading: usersLoading } = useUsers()

  const refreshTasks = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getTasks()
      setTasks(data)
    } catch (error) {
      console.error("Error loading tasks:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  if (usersLoading) {
    return <div className="text-center py-4">Loading...</div>
  }

  return (
    <TasksContext.Provider value={{ tasks, loading, refreshTasks }}>
      {children}
    </TasksContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TasksContext)
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider")
  }
  return context
} 