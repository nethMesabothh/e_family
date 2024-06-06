import "./globals.css";
import "@uploadthing/react/styles.css";
import type { Metadata } from "next";
import { Karla as FontSans } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import { cn } from "@/lib/utils";
import { Providers } from "./providers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400",
});

export const metadata: Metadata = {
  title: "e_family",
  description: "Generated & Create by Both",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <NextTopLoader />
          {children}
        </body>
      </html>
    </Providers>
  );
}
