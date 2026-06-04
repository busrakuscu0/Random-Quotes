"use client";

import { Button } from "@/components/typography/Button";
import { useContext } from "react";
import { H3 } from "@/components/typography/H3";
import { H6 } from "@/components/typography/H6";
import { QuotesContext } from "@/app/QuotesContext";
import { QuoteCard } from "@/app/QuoteCard";

export default function Home() {
  const { quotes, quoteIndex, handleQuoteIndexUpdate, handleLikeQuote } =
    useContext(QuotesContext);
  const { quote, author, likedBy } = quotes[quoteIndex];

  return (
    <main className="min-h-screen flex items-center justify-center">
      <QuoteCard
        handleLikeQuote={handleLikeQuote}
        likedBy={likedBy}
        quote={quote}
        author={author}
        handleQuoteIndexUpdate={handleQuoteIndexUpdate}
      />
    </main>
  );
}
