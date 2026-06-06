"use client";

import { Button } from "@/components/typography/Button";
import { useContext } from "react";
import { H3 } from "@/components/typography/H3";
import { H6 } from "@/components/typography/H6";
import { QuotesContext } from "@/app/QuotesContext";

export default function Home() {
  const { quotes, quoteIndex, handleQuoteIndexUpdate, handleLikeQuote } =
    useContext(QuotesContext);
  const { quote, author, likedBy } = quotes[quoteIndex];

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-200">
      <section className="min-h-[250px] w-full max-w-lg bg-slate-50/50 rounded-md p-10 flex flex-col gap-2">
        <div className="self-end">
          <Button variant={"icon"} onClick={handleLikeQuote}>
            ❤️ {likedBy}
          </Button>
        </div>
        <H3 element={"p"}>{quote}</H3>
        <H6 element={"span"}>- {author}</H6>
        <div className="mt-6 flex flex-row gap-4 justify-end">
          <Button variant={"primary"} onClick={handleQuoteIndexUpdate}>
            Next Quote
          </Button>
        </div>
      </section>
    </main>
  );
}
