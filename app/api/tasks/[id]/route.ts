import { taskSchema } from "@/lib/schemas/task"
import { updateTaskInDb, deleteTaskFromDb } from "@/lib/services/db/tasks"
import { NextResponse } from "next/server"

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  try {
    const json = await request.json()
    const body = taskSchema.parse(json)
    const data = await updateTaskInDb(id, body)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error updating task:", error)
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  try {
    await deleteTaskFromDb(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting task:", error)
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    )
  }
} 