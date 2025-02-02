"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import { getUsers } from "@/lib/services/users"

type User = {
  id: string
  full_name: string
}

type UserSelectProps = {
  value?: string
  onValueChange: (value: string) => void
}

export function UserSelect({ value, onValueChange }: UserSelectProps) {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await getUsers()
        setUsers(data)
      } catch (error) {
        console.error("Error loading users:", error)
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  if (loading) {
    return (
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Loading users..." />
        </SelectTrigger>
      </Select>
    )
  }

  return (
    <Select value={value || "unassigned"} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select user" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="unassigned">Unassigned</SelectItem>
        {users.map((user) => (
          <SelectItem key={user.id} value={user.id}>
            {user.full_name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
} 