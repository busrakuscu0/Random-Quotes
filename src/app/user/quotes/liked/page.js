"use client";

import { H3 } from "@/components/typography/H3";
import { useContext } from "react";
import { QuotesContext } from "@/app/QuotesContext";

export default function LikedQuotesPage() {
  const { handleUnlikeQuote, likedQuotes } = useContext(QuotesContext);
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-200">
      <H3 element={"h1"}>Liked Quotes</H3>
      <ul>
        {likedQuotes.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0 gap-4"
          >
            <div>
              <p className="text-slate-800 italic">"{item.quote}"</p>
              <span className="text-xs text-slate-500">- {item.author}</span>
            </div>
            <button
              onClick={() => handleUnlikeQuote(item.quote)}
              className="text-red-500 hover:text-red-700 text-sm font-semibold shrink-0"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
