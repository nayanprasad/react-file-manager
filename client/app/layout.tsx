"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css';
import {cn} from "@/lib/utils";
import {useProfile} from "@/hooks/use-profile-store";
import {useEffect} from "react";

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

    const {getUser} = useProfile();

    useEffect(() => {
        getUser();
    }, []);



  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-black")}>
        {children}
      </body>
    </html>
  )
}