"use client";

import { LikedQuotes } from "@/app/LikeQuotes";

export default function LikedQuotesPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start gap-6 md:gap-8 text-secondary-foreground">
      <LikedQuotes />
    </main>
  );
}
