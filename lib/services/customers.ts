import type { CustomerFormValues } from "@/lib/schemas/customer"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || ''

export type Customer = {
  id: string
  name: string
  address: string | null
  phone_number: string | null
  email: string | null
  preferred_medium: "phone" | "text" | "email"
  created_at: string
}

export async function createCustomer(customer: CustomerFormValues) {
  const response = await fetch(`${API_BASE}/api/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  })
  
  if (!response.ok) throw new Error("Failed to create customer")
  return response.json()
}

export async function getCustomers(): Promise<Customer[]> {
  const response = await fetch(`${API_BASE}/api/customers`)
  if (!response.ok) throw new Error("Failed to get customers")
  return response.json()
}

export async function updateCustomer(id: string, customer: CustomerFormValues) {
  const response = await fetch(`${API_BASE}/api/customers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  })
  
  if (!response.ok) throw new Error("Failed to update customer")
  return response.json()
}

export async function deleteCustomer(id: string) {
  const response = await fetch(`${API_BASE}/api/customers/${id}`, {
    method: "DELETE",
  })
  
  if (!response.ok) throw new Error("Failed to delete customer")
  return response.json()
} 