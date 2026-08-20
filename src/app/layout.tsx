import { Playfair_Display, Inter } from "next/font/google";
import TopNav from "@/app/Navbar";
import "./globals.css";
import { RootLayoutInterface } from "@/types/quotes";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata = {
  title: "Random Quotes Application",
  description: "Random Quotes Application 200825",
};

export default function RootLayout({ children }: RootLayoutInterface) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-muted text-foreground">
        <TopNav />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
