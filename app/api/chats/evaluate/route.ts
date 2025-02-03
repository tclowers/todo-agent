import { getChatsFromDb, updateChatInDb } from "@/lib/services/db/chats"
import { getMessagesForChat } from "@/lib/services/db/messages"
import { evaluateChatCompletion } from "@/lib/services/openai"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    // Get all incomplete chats
    const chats = await getChatsFromDb()
    const incompletedChats = chats.filter(chat => !chat.completed)

    // Process each chat
    for (const chat of incompletedChats) {
      // Get all messages for this chat
      const messages = await getMessagesForChat(chat.id)
      
      // Skip if no messages
      if (messages.length === 0) continue

      // Format messages for OpenAI
      const formattedMessages = messages.map(msg => ({
        role: "user",
        content: `${msg.user_id === process.env.RECEPTIONIST_AI_USER_ID ? "Assistant" : "User"}: ${msg.content}`
      }))

      // Get evaluation from OpenAI
      const evaluation = await evaluateChatCompletion(formattedMessages)

      // Update chat if completed
      if (evaluation.completed) {
        await updateChatInDb(chat.id, true)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error evaluating chats:", error)
    return NextResponse.json(
      { error: "Failed to evaluate chats" },
      { status: 500 }
    )
  }
} 