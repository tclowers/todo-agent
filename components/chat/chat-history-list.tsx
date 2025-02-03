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
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { getChats, evaluateChats } from "@/lib/services/chats"
import type { Chat } from "@/lib/services/db/chats"
import { useUsers } from "@/lib/context/users-context"
import Link from "next/link"
import { toast } from "sonner"

export function ChatHistoryList() {
  const [chats, setChats] = useState<Chat[]>([])
  const [loading, setLoading] = useState(true)
  const { users } = useUsers()

  useEffect(() => {
    loadChats()
  }, [])

  async function loadChats() {
    try {
      setLoading(true)
      const data = await getChats()
      setChats(data)
    } catch (error) {
      console.error("Error loading chats:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleEvaluateChats() {
    try {
      await evaluateChats()
      await loadChats() // Reload the chats after evaluation
      toast.success("Chats evaluated successfully")
    } catch (error) {
      console.error("Error evaluating chats:", error)
      toast.error("Failed to evaluate chats")
    }
  }

  function getUserName(userId: string) {
    const user = users.find(user => user.id === userId)
    return user ? user.full_name : "Unknown User"
  }

  if (loading) {
    return <div>Loading chat history...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleEvaluateChats}>
          Evaluate Chats
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {chats.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No chat history found
                </TableCell>
              </TableRow>
            ) : (
              chats.map((chat) => (
                <TableRow key={chat.id}>
                  <TableCell>
                    {new Date(chat.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell>{getUserName(chat.user_id)}</TableCell>
                  <TableCell>
                    <Badge variant={chat.completed ? "default" : "secondary"}>
                      {chat.completed ? "Completed" : "Active"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/chat?id=${chat.id}`}>
                      <Button variant="outline" size="sm">
                        View Chat
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 