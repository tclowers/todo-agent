import { supabase } from "@/lib/supabase/client"
import type { CustomerFormValues } from "@/lib/schemas/customer"

export async function createCustomerInDb(customer: CustomerFormValues) {
  const { data, error } = await supabase
    .from("customers")
    .insert([customer])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getCustomersFromDb() {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function updateCustomerInDb(id: string, customer: CustomerFormValues) {
  const { data, error } = await supabase
    .from("customers")
    .update(customer)
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteCustomerFromDb(id: string) {
  const { error } = await supabase
    .from("customers")
    .delete()
    .eq("id", id)

  if (error) throw error
} 