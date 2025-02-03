import { updateChatInDb } from "@/lib/services/db/chats"
import { NextResponse } from "next/server"
import { type NextRequest } from "next/server"

type Props = {
  params: Promise<{
    id: string
  }>
}

export async function PATCH(
  request: NextRequest,
  props: Props
) {
  const params = await props.params
  const chatId = params.id
  
  try {
    const json = await request.json()
    const data = await updateChatInDb(chatId, json.completed)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error updating chat:", error)
    return NextResponse.json(
      { error: "Failed to update chat" },
      { status: 500 }
    )
  }
} 