import { taskSchema } from "@/lib/schemas/task"
import { createTaskInDb, getTasksFromDb } from "@/lib/services/db/tasks"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const body = taskSchema.parse(json)
    const data = await createTaskInDb(body)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error creating task:", error)
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const data = await getTasksFromDb()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error getting tasks:", error)
    return NextResponse.json(
      { error: "Failed to get tasks" },
      { status: 500 }
    )
  }
} 