import { createMessageInDb, getMessagesForChat } from "@/lib/services/db/messages"
import { SYSTEM_USER_ID, RECEPTIONIST_AI_USER_ID } from "@/lib/constants"
import { type NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { getChatCompletion } from "@/lib/services/openai"

type Props = {
  params: Promise<{
    id: string
  }>
}

export async function GET(
  request: NextRequest,
  props: Props
) {
  const params = await props.params
  const chatId = params.id
  try {
    const data = await getMessagesForChat(chatId)
    return NextResponse.json(data || [])
  } catch (error) {
    console.error("Error getting messages:", error)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(
  request: NextRequest,
  props: Props
) {
  const params = await props.params
  const chatId = params.id
  try {
    const json = await request.json()
    
    // Create user message
    const userMessage = await createMessageInDb({
      content: json.content,
      user_id: SYSTEM_USER_ID,
      chat_id: chatId,
    })

    // Get all messages for this chat to maintain context
    const chatHistory = await getMessagesForChat(chatId)
    
    // Format messages for OpenAI
    const formattedMessages = chatHistory.map(msg => ({
      role: (msg.user_id === SYSTEM_USER_ID ? "user" : "assistant") as "user" | "assistant",
      content: String(msg.content)
    }))

    // Get OpenAI response
    const aiResponse = await getChatCompletion(formattedMessages)

    // Save AI response to database with fallback message if null
    const assistantMessage = await createMessageInDb({
      content: aiResponse || "I apologize, but I'm unable to provide a response at the moment.",
      user_id: RECEPTIONIST_AI_USER_ID,
      chat_id: chatId,
    })

    return NextResponse.json([userMessage, assistantMessage])
  } catch (error) {
    console.error("Error creating message:", error)
    return NextResponse.json(
      { error: "Failed to create message" },
      { status: 500 }
    )
  }
} 