
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PlanProvider } from "@/context/PlanContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import {Suspense} from "react";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitLog",
  description: "Your personal workout tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <PlanProvider>
          <Suspense fallback={<div className="h-16 w-full bg-[#0b0d11]/95" />}>
            <Navbar />
          </Suspense>

          <main className="flex-1">{children}</main>


          <Footer />

          <ToastContainer
            position="bottom-right"
            autoClose={2500}
            theme="dark"
          />
        </PlanProvider>
      </body>
    </html>
  );
}
