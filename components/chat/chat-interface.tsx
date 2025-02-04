"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useUsers } from "@/lib/context/users-context"
import { useEffect, useState, KeyboardEvent, useRef, useCallback } from "react"
import { toast } from "sonner"
import { getMessages, createMessage } from "@/lib/services/messages"
import { getChats, createChat } from "@/lib/services/chats"
import type { Message } from "@/lib/services/db/messages"
import type { Chat } from "@/lib/services/db/chats"
import { useRouter, useSearchParams } from "next/navigation"

type ChatInterfaceProps = {
  initialChatId?: string
}

export function ChatInterface({ initialChatId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [chats, setChats] = useState<Chat[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const { users } = useUsers()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialLoadRef = useRef(false)

  const loadChats = useCallback(async () => {
    try {
      const data = await getChats()
      setChats(data)
      if (!initialLoadRef.current && data.length > 0 && !currentChatId) {
        setCurrentChatId(data[0].id)
      }
    } catch (error) {
      console.error("Error loading chats:", error)
      toast.error("Failed to load chats")
    }
  }, [currentChatId])

  useEffect(() => {
    if (!initialLoadRef.current && initialChatId) {
      setCurrentChatId(initialChatId)
      initialLoadRef.current = true
    }
  }, [initialChatId])

  useEffect(() => {
    loadChats()
  }, [loadChats])

  useEffect(() => {
    if (currentChatId) {
      loadMessages(currentChatId)
    }
  }, [currentChatId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  async function loadMessages(chatId: string) {
    try {
      const data = await getMessages(chatId)
      setMessages(data)
    } catch (error) {
      console.error("Error loading messages:", error)
      toast.error("Failed to load messages")
    }
  }

  function getUserName(userId: string) {
    const user = users.find(user => user.id === userId)
    return user ? user.full_name : "Unknown User"
  }

  async function handleNewChat() {
    try {
      const chat = await createChat()
      setChats([chat, ...chats])
      setCurrentChatId(chat.id)
      setMessages([])
      toast.success("New chat started")
    } catch (error) {
      console.error("Error creating chat:", error)
      toast.error("Failed to create new chat")
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!newMessage.trim() || !currentChatId) return

    try {
      setLoading(true)
      await createMessage(currentChatId, newMessage)
      const updatedMessages = await getMessages(currentChatId)
      setMessages(updatedMessages)
      setNewMessage("")
      toast.success("Message sent successfully")
    } catch (error) {
      console.error("Error sending message:", error)
      toast.error("Failed to send message")
    } finally {
      setLoading(false)
    }
  }

  async function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!loading && newMessage.trim() && currentChatId) {
        await handleSubmit(e)
      }
    }
  }

  const handleChatChange = (chatId: string) => {
    setCurrentChatId(chatId)
    const params = new URLSearchParams(searchParams.toString())
    params.delete("id")
    router.push(`/chat?${params.toString()}`)
  }

  return (
    <div className="flex flex-col h-[800px] space-y-4">
      <div className="flex flex-col space-y-4">
        <Button onClick={handleNewChat} className="w-fit">New Chat</Button>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {chats.map((chat) => (
            <Button
              key={chat.id}
              variant={chat.id === currentChatId ? "default" : "outline"}
              onClick={() => handleChatChange(chat.id)}
              className="shrink-0"
            >
              Chat {new Date(chat.created_at).toLocaleString(undefined, {
                month: 'numeric',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
              })}
            </Button>
          ))}
        </div>
      </div>

      <ScrollArea className="flex-1 p-4 rounded-lg border min-h-[600px]">
        <div className="space-y-4">
          {messages.map((message) => (
            <Card key={message.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{getUserName(message.user_id)}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(message.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="mt-2 whitespace-pre-wrap">{message.content}</p>
            </Card>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="space-y-2">
        <Textarea
          placeholder="Type a message... (Press Enter to send, Shift+Enter for new line)"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-h-[100px]"
        />
        <Button 
          type="submit" 
          className="w-full"
          disabled={loading || !newMessage.trim() || !currentChatId}
        >
          {loading ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  )
} 