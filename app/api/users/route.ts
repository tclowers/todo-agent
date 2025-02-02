import { userSchema } from "@/lib/schemas/user"
import { createUserInDb, getUsersFromDb } from "@/lib/services/db/users"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const body = userSchema.parse(json)
    const data = await createUserInDb(body)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const data = await getUsersFromDb()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error getting users:", error)
    return NextResponse.json(
      { error: "Failed to get users" },
      { status: 500 }
    )
  }
} 