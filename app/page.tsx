import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Link href="/tasks">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
              <CardDescription>Manage your tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <p>View all tasks</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/users">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage system users</CardDescription>
            </CardHeader>
            <CardContent>
              <p>View all users</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/customers">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader>
              <CardTitle>Customers</CardTitle>
              <CardDescription>Manage customers</CardDescription>
            </CardHeader>
            <CardContent>
              <p>View all customers</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/chat">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader>
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>Chat with our AI</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Start a conversation</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/chat-history">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader>
              <CardTitle>Chat History</CardTitle>
              <CardDescription>View past conversations</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Browse chat history</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
