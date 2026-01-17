import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1. Define Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 2. Define Metadata (Tab Name and Description)
export const metadata: Metadata = {
  title: "Aadi's Portfolio", // Professional title for your profile [cite: 2025-12-29]
  description: "My React Portfolio.",
  icons: {
    icon: "/favicon.ico", 
  },
};

// 3. Define the Root Layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
