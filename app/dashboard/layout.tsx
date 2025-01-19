import type { Metadata } from "next";
import { Inter } from "next/font/google"
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ChevronDown, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "GeneLinx",
  description: "Understand your genes for better health Navigating the world of genetics can be difficult.Our experts guide you through your personalised genetic journey and provide you with the information and support you need to make informed health decisions. Book an appointment Benefits of knowing more about your genes Personalised health guidanceLearn personal risks based on your",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${inter.className} h-screen antialiased`} >
        <div className="px-8 w-full h-16 border-b border-gray-200 flex items-center justify-between">
          <img
            className="w-32" src="https://gene-linx.com/wp-content/uploads/2023/02/Logo-files2-01-1.svg" />
          <div className="flex items-center space-x-3">
            <img src="/profile-placeholder.png" />
            <div role="button" className="cursor-pointer flex items-center space-x-3">
              <p className="text-sm">Welcome</p>
              <ChevronDown className="w-4 h-4 mr-4" />
            </div>
          </div>
        </div>
        <div className="flex">
          <Sidebar />
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
