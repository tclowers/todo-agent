import { ChatHistoryList } from "@/components/chat/chat-history-list"
import { UsersProvider } from "@/lib/context/users-context"

export default function ChatHistoryPage() {
  return (
    <UsersProvider>
      <div className="container max-w-4xl mx-auto py-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Chat History</h1>
          <ChatHistoryList />
        </div>
      </div>
    </UsersProvider>
  )
} 