import AuthProvider from "@/context/AuthProvider";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

// import { poppins } from "./ui/fonts";

export const metadata: Metadata = {
  title: "TravelNest",
  description: "Find your next stay",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <AuthProvider>
        <body>{children}</body>
      </AuthProvider>
    </html>
  );
}
