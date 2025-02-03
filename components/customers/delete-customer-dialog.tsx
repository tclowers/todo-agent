"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { deleteCustomer } from "@/lib/services/customers"
import type { Customer } from "@/lib/services/customers"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

type DeleteCustomerDialogProps = {
  customer: Customer
  onSuccess: () => Promise<void>
}

export function DeleteCustomerDialog({ customer, onSuccess }: DeleteCustomerDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function onDelete() {
    try {
      setLoading(true)
      await deleteCustomer(customer.id)
      setOpen(false)
      await onSuccess()
      toast.success("Customer deleted successfully")
    } catch (error) {
      console.error("Error deleting customer:", error)
      toast.error("Failed to delete customer")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Customer</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {customer.name}? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 