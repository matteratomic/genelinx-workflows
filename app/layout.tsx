import type { Metadata } from "next";
import { Inter } from "next/font/google"
import "./globals.css";
import { Card } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";
import { useLayoutEffect } from "react";
import { redirect } from "next/navigation";

import { pdfjs,Document, Page } from "react-pdf";
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
// import 'react-pdf/dist/esm/Page/TextLayer.css'

// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

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
        <Card className="flex items-center px-8 w-full rounded-none h-16 z-50 relative">
          <Link href="/">
            <img
              className="w-40" src="https://gene-linx.com/wp-content/uploads/2023/02/Logo-files2-01-1.svg" />
          </Link>
        </Card>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
