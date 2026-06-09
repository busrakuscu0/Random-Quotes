"use client";

import { Button } from "@/components/ui/button";
import { H3 } from "@/components/typography/H3";
import { useContext } from "react";
import { QuotesContext } from "@/app/QuotesContext";

export default function LikedQuotesPage() {
  const { handleUnlikeQuote, likedQuotes } = useContext(QuotesContext);

  return (
    <main className="min-h-screen flex flex-col items-center justify-start pt-16 gap-8 bg-slate-200">
      <H3 element={"h1"}>Liked Quotes</H3>
      <ul className="flex flex-col gap-4">
        {likedQuotes.map(({ quote, author }) => (
          <li
            key={quote}
            className="flex justify-between items-baseline p-4 gap-4 bg-mist-100 rounded-xl"
          >
            <span>{quote}</span>
            <span>"{author}"</span>
            <Button onClick={() => handleUnlikeQuote(quote)}>
              Unlike
            </Button>
          </li>
        ))}
      </ul>
    </main>
  );
}
