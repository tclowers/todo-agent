import { userSchema } from "@/lib/schemas/user"
import { updateUserInDb, deleteUserFromDb } from "@/lib/services/db/users"
import { type NextRequest } from "next/server"
import { NextResponse } from "next/server"

type Props = {
  params: Promise<{
    id: string
  }>
}

export async function PUT(
  request: NextRequest,
  props: Props
) {
  const params = await props.params
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
  request: NextRequest,
  props: Props
) {
  const params = await props.params
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