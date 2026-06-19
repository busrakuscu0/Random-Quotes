"use client";
import { createContext, useState } from "react";
import { quotes as initialQuotes, type Quote } from "@/quotes";
import { getRandomNumber } from "@/utils/helper-functions";

interface QuoteContextInterface {
  quotes: Quote[];
  quoteIndex: number;
  handleQuoteIndexUpdate: () => void;
  handleLikeQuote: () => void;
  handleUnlikeQuote: (quoteContent: string) => void;
  likedQuotes: Quote[];
}

const InitialQuotesContext = {
  quotes: [],
  quoteIndex: 0,
  handleQuoteIndexUpdate: () => console.log(""),
  handleLikeQuote: () => console.log(""),
  handleUnlikeQuote: (quoteContent: string) => console.log(""),
  likedQuotes: [],
};

export const QuotesContext =
  createContext<QuoteContextInterface>(InitialQuotesContext);

export function QuotesContextProvider({ children }) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quotes, setQuotes] = useState(initialQuotes);

  function handleQuoteIndexUpdate() {
    const nextIndex = getRandomNumber(0, quotes.length - 1);
    setQuoteIndex(nextIndex);
  }

  function handleLikeQuote() {
    const updatedQuotes = quotes.map((quote, id) => {
      if (id === quoteIndex) {
        const updatedLikedBy =
          typeof quote.likedBy === "number" ? quote.likedBy : 0;
        return { ...quote, likedBy: updatedLikedBy + 1 };
      }
      return quote;
    });
    setQuotes(updatedQuotes);
  }

  function handleUnlikeQuote(quoteContent: string) {
    const updatedQuotes = quotes.map((q) => {
      if (q.quote === quoteContent) {
        return {
          ...q,
          likedBy: 0,
        };
      }
      return q;
    });
    setQuotes(updatedQuotes);
  }

  const likedQuotes = quotes.filter((quote) => quote.likedBy > 0);

  return (
    <QuotesContext
      value={{
        quotes,
        quoteIndex,
        handleQuoteIndexUpdate,
        handleLikeQuote,
        handleUnlikeQuote,
        likedQuotes,
      }}
    >
      {children}
    </QuotesContext>
  );
}
