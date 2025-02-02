import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
            <CardDescription>Your active tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <p>0 active tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>AI Assistant</CardTitle>
            <CardDescription>Chat with our AI</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Start a conversation</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
