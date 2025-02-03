"use client"

import { createContext, useContext, useCallback, useState, useEffect, type ReactNode } from "react"
import { toast } from "sonner"
import { getCustomers, type Customer } from "@/lib/services/customers"

type CustomersContextType = {
  customers: Customer[]
  loading: boolean
  refreshCustomers: () => Promise<void>
}

const CustomersContext = createContext<CustomersContextType | undefined>(undefined)

export function CustomersProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)

  const refreshCustomers = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getCustomers()
      setCustomers(data)
    } catch (error) {
      console.error("Error fetching customers:", error)
      toast.error("Failed to fetch customers")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshCustomers()
  }, [refreshCustomers])

  return (
    <CustomersContext.Provider value={{ customers, loading, refreshCustomers }}>
      {children}
    </CustomersContext.Provider>
  )
}

export function useCustomers() {
  const context = useContext(CustomersContext)
  if (context === undefined) {
    throw new Error("useCustomers must be used within a CustomersProvider")
  }
  return context
} 