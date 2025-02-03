import { getCommentsForTask, createCommentInDb } from "@/lib/services/db/comments"
import { SYSTEM_USER_ID } from "@/lib/constants"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const taskId = params.id
  try {
    const data = await getCommentsForTask(taskId)
    return NextResponse.json(data || [])
  } catch (error) {
    console.error("Error getting comments:", error)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const taskId = params.id
  try {
    const json = await request.json()
    const comment = await createCommentInDb({
      content: json.content,
      user_id: SYSTEM_USER_ID,
      task_id: taskId,
    })
    return NextResponse.json(comment)
  } catch (error) {
    console.error("Error creating comment:", error)
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    )
  }
} 