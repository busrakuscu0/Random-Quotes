"use client";
import { createContext, useState } from "react";
import { quotes as initialQuotes } from "@/quotes";
import { getRandomNumber } from "@/utils/helper-functions";

const QuotesContext = createContext(defaultValue);

export function QuotesContextProvider() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quotes, setQuotes] = useState(initialQuotes);

  function handleQuotesIndexUpdate() {
    const nextIndex = getRandomNumber(0, quotes.length - 1);
  }

  return <QuotesContext value={a}>{children}</QuotesContext>;
}
