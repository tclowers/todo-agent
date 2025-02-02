import { CreateUserDialog } from "@/components/users/create-user-dialog"
import { UserList } from "@/components/users/user-list"
import { UsersProvider } from "@/lib/context/users-context"

export default function UsersPage() {
  return (
    <UsersProvider>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Users</h1>
          <CreateUserDialog />
        </div>
        <UserList />
      </div>
    </UsersProvider>
  )
} 