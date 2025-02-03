import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Management System",
  description: "AI-Powered Task Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body>
        <div className="flex min-h-screen">
          <div className="w-64 border-r px-4 py-6">
            <Nav />
          </div>
          <main className="flex-1 px-6 py-6">
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
