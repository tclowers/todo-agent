import { customerSchema } from "@/lib/schemas/customer"
import { updateCustomerInDb, deleteCustomerFromDb } from "@/lib/services/db/customers"
import { NextResponse } from "next/server"

type RouteParams = {
  params: Promise<{
    id: string
  }>
}

export async function PUT(
  request: Request,
  props: RouteParams
) {
  try {
    const params = await props.params
    const id = params.id
    const json = await request.json()
    const body = customerSchema.parse(json)
    const data = await updateCustomerInDb(id, body)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error updating customer:", error)
    return NextResponse.json(
      { error: "Failed to update customer" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  props: RouteParams
) {
  try {
    const params = await props.params
    const id = params.id
    await deleteCustomerFromDb(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting customer:", error)
    return NextResponse.json(
      { error: "Failed to delete customer" },
      { status: 500 }
    )
  }
} 