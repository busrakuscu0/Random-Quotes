"use client";
import { createContext, useState } from "react";
import { quotes as initialQuotes, type Quote } from "@/quotes";
import { getRandomNumber } from "@/utils/helper-functions";
import { useUser } from "@auth0/nextjs-auth0/client";

interface QuoteContextInterface {
  quotes: Quote[];
  quoteIndex: number;
  handleQuoteIndexUpdate: () => void;
  handleToggleLike: (quoteContent: string) => void;
  likedQuotes: Quote[];
}

const InitialQuotesContext = {
  quotes: [],
  quoteIndex: 0,
  handleQuoteIndexUpdate: () => {},
  handleToggleLike: () => {},
  likedQuotes: [],
};

export const QuotesContext =
  createContext<QuoteContextInterface>(InitialQuotesContext);

export function QuotesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const userSub = user?.sub;

  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quotes, setQuotes] = useState(initialQuotes);

  function handleQuoteIndexUpdate() {
    const nextIndex = getRandomNumber(0, quotes.length - 1);
    setQuoteIndex(nextIndex);
  }

  function handleToggleLike(quoteContent: string) {
    const updatedQuotes = quotes.map((q) => {
      if (q.quote === quoteContent) {
        const currentLikedBy = Array.isArray(q.likedBy) ? q.likedBy : [];
        const hasLiked = currentLikedBy.includes(userSub);

        return {
          ...q,
          likedBy: hasLiked
            ? currentLikedBy.filter((id) => id !== userSub)
            : [...currentLikedBy, userSub],
        };
      }
      return q;
    });
    setQuotes(updatedQuotes);
  }

  const likedQuotes = quotes.filter(
    (quote) =>
      userSub &&
      Array.isArray(quote.likedBy) &&
      quote.likedBy.includes(userSub),
  );

  return (
    <QuotesContext
      value={{
        quotes,
        quoteIndex,
        handleQuoteIndexUpdate,
        handleToggleLike,
        likedQuotes,
      }}
    >
      {children}
    </QuotesContext>
  );
}
