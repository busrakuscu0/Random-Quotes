import { Geist, Geist_Mono } from "next/font/google";
import { TopNav } from "@/app/Navbar";
import { QuotesContextProvider } from "@/app/QuotesContext";
import "./globals.css";
import { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Random Quotes Application",
  description: "Random Quotes Application 200825",
};

interface RootLayoutInterface {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutInterface) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background dark:bg-background text-foreground dark:text-foreground">
        <QuotesContextProvider>
          <TopNav />
          {children}
        </QuotesContextProvider>
      </body>
    </html>
  );
}
