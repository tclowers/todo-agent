import { getChatsFromDb, updateChatInDb } from "@/lib/services/db/chats"
import { getMessagesForChat } from "@/lib/services/db/messages"
import { evaluateChatCompletion, extractTasksFromChat } from "@/lib/services/openai"
import { createTaskInDb } from "@/lib/services/db/tasks"
import { COMPLETION_AGENT_USER_ID } from "@/lib/constants"
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
        role: (msg.user_id === process.env.RECEPTIONIST_AI_USER_ID ? "assistant" : "user") as "user" | "assistant",
        content: `${msg.user_id === process.env.RECEPTIONIST_AI_USER_ID ? "Assistant" : "User"}: ${msg.content}`
      }))

      // Get evaluation from OpenAI
      const evaluation = await evaluateChatCompletion(formattedMessages)

      // If chat is complete, extract and create tasks
      if (evaluation.completed) {
        try {
          // Extract tasks from the conversation
          const tasks = await extractTasksFromChat(formattedMessages)

          // Create tasks in database if tasks array exists
          if (Array.isArray(tasks)) {
            for (const task of tasks) {
              await createTaskInDb({
                title: task.title,
                description: task.description,
                status: "pending",
                assigned_to: COMPLETION_AGENT_USER_ID
              })
            }
          }

          // Update chat as completed
          await updateChatInDb(chat.id, true)
        } catch (error) {
          console.error("Error processing tasks for chat:", chat.id, error)
          // Continue with other chats even if one fails
          continue
        }
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