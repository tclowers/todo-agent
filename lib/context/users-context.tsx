"use client"

import { createContext, useContext, useState, useCallback } from "react"
import type { ReactNode } from "react"
import { getUsers } from "@/lib/services/users"
import type { User } from "@/lib/services/users"

type UsersContextType = {
  users: User[]
  loading: boolean
  refreshUsers: () => Promise<void>
}

const UsersContext = createContext<UsersContextType | undefined>(undefined)

export function UsersProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  const refreshUsers = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getUsers()
      setUsers(data)
    } catch (error) {
      console.error("Error loading users:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <UsersContext.Provider value={{ users, loading, refreshUsers }}>
      {children}
    </UsersContext.Provider>
  )
}

export function useUsers() {
  const context = useContext(UsersContext)
  if (context === undefined) {
    throw new Error("useUsers must be used within a UsersProvider")
  }
  return context
} 