import { userSchema } from "@/lib/schemas/user"
import { updateUserInDb, deleteUserFromDb } from "@/lib/services/db/users"
import { NextResponse } from "next/server"

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  try {
    const json = await request.json()
    const body = userSchema.parse(json)
    const data = await updateUserInDb(id, body)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json(
      { error: "Failed to update user" },
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
    await deleteUserFromDb(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    )
  }
} 