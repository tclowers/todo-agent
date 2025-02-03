import { CreateCustomerDialog } from "@/components/customers/create-customer-dialog"
import { CustomerList } from "@/components/customers/customer-list"
import { CustomersProvider } from "@/lib/context/customers-context"

export default function CustomersPage() {
  return (
    <CustomersProvider>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Customers</h1>
          <CreateCustomerDialog />
        </div>
        <CustomerList />
      </div>
    </CustomersProvider>
  )
} 