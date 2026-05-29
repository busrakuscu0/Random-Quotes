import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { QuotesContextProvider } from "@/app/QuotesContext";
import "./globals.css";

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

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <QuotesContextProvider>
        <body className="min-h-full">
          <nav className="bg-slate-200 pt-8">
            <ul className="flex flex-row items-baseline justify-center gap-24">
              <li>
                <Link href="/" className="hover:text-slate-600">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/user/quotes/liked"
                  className="hover:text-slate-600"
                >
                  Liked Quotes
                </Link>
              </li>
            </ul>
          </nav>
          {children}
        </body>
      </QuotesContextProvider>
    </html>
  );
}
