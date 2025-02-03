"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Users, ListTodo, Home, MessageCircle, History, Contact } from "lucide-react"

const links = [
  { name: "Home", href: "/", icon: Home },
  { name: "Tasks", href: "/tasks", icon: ListTodo },
  { name: "Customers", href: "/customers", icon: Contact },
  { name: "Users", href: "/users", icon: Users },
  { name: "Chat", href: "/chat", icon: MessageCircle },
  { name: "Chat History", href: "/chat-history", icon: History },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <nav className="grid gap-1">
      {links.map((link) => {
        const Icon = link.icon
        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted/50",
              pathname === link.href ? "bg-muted font-medium" : "text-muted-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {link.name}
          </Link>
        )
      })}
    </nav>
  )
}