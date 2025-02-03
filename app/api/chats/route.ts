import { createChatInDb, getChatsFromDb } from "@/lib/services/db/chats"
import { SYSTEM_USER_ID } from "@/lib/constants"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const data = await getChatsFromDb()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error getting chats:", error)
    return NextResponse.json(
      { error: "Failed to get chats" },
      { status: 500 }
    )
  }
}

export async function POST() {
  try {
    const chat = await createChatInDb({
      user_id: SYSTEM_USER_ID,
    })
    return NextResponse.json(chat)
  } catch (error) {
    console.error("Error creating chat:", error)
    return NextResponse.json(
      { error: "Failed to create chat" },
      { status: 500 }
    )
  }
} 