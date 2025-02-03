import { ChatInterface } from "@/components/chat/chat-interface"
import { UsersProvider } from "@/lib/context/users-context"

export default async function ChatPage() {
  return (
    <UsersProvider>
      <div className="container max-w-4xl mx-auto py-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Chat</h1>
          <ChatInterface />
        </div>
      </div>
    </UsersProvider>
  )
} 