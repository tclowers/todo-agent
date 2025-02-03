import { customerSchema } from "@/lib/schemas/customer"
import { createCustomerInDb, getCustomersFromDb } from "@/lib/services/db/customers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const body = customerSchema.parse(json)
    const data = await createCustomerInDb(body)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error creating customer:", error)
    return NextResponse.json(
      { error: "Failed to create customer" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const data = await getCustomersFromDb()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error getting customers:", error)
    return NextResponse.json(
      { error: "Failed to get customers" },
      { status: 500 }
    )
  }
} 