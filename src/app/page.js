"use client";

import { quotes as initialQuotes } from "@/quotes";
import { Button } from "@/components/typography/Button";
import { useState } from "react";
import { getRandomNumber } from "@/utils/helper-functions";
import { getUniqueRandomNumber } from "@/utils/helper-functions";
import { H3 } from "@/components/typography/H3";
import { H6 } from "@/components/typography/H6";

const quotesWithLikeCount = initialQuotes.map((quote) => ({
  ...quote,
  likeCount: 0,
}));

export default function Home() {
  const [updatequotes, setUpdateQuotes] = useState(quotesWithLikeCount);

  const [quoteIndex, setQuoteIndex] = useState(0);

  const { quote, author, likeCount } = updatequotes[quoteIndex];

  function handleClick() {
    const next = getUniqueRandomNumber(quoteIndex, quotesWithLikeCount.length);
    setQuoteIndex(next);
  }

  function updateLikeCount() {
    const nextQuotes = updatequotes.map((q, index) => {
      if (index === quoteIndex) {
        return { ...q, likeCount: q.likeCount + 1 };
      }
      return q;
    });
    setUpdateQuotes(nextQuotes);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-200">
      <section className="min-h-[250px] w-full max-w-lg bg-slate-50/50 rounded-md p-10 flex flex-col gap-2">
        <H3 element={"p"}>{quote}</H3>
        <H6 element={"span"}>- {author}</H6>
        <div className="mt-6 flex flex-row gap-4 justify-end">
          <Button variant={"secondary"} onClick={updateLikeCount}>
            Like ({likeCount})
          </Button>
          <Button variant={"primary"} onClick={handleClick}>
            Next Quote
          </Button>
        </div>
      </section>
    </main>
  );
}
