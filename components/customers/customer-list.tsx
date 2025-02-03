"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { EditCustomerDialog } from "@/components/customers/edit-customer-dialog"
import { DeleteCustomerDialog } from "@/components/customers/delete-customer-dialog"
import { useCustomers } from "@/lib/context/customers-context"

export function CustomerList() {
  const { customers, loading, refreshCustomers } = useCustomers()

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Contact Info</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Preferred Contact</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : customers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No customers found
              </TableCell>
            </TableRow>
          ) : (
            customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{customer.email}</span>
                    <span className="text-muted-foreground">{customer.phone_number}</span>
                  </div>
                </TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>
                  <Badge>
                    {customer.preferred_medium.charAt(0).toUpperCase() + customer.preferred_medium.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="flex justify-end gap-2">
                  <EditCustomerDialog customer={customer} onSuccess={refreshCustomers} />
                  <DeleteCustomerDialog customer={customer} onSuccess={refreshCustomers} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
} 