"use client";
import { createContext, useState } from "react";
import { quotes as initialQuotes, quotes, type Quote } from "@/quotes";
import { getRandomNumber } from "@/utils/helper-functions";
import { useUser } from "@auth0/nextjs-auth0/client";

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
  handleUnlikeQuote: () => console.log(""),
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

  function handleLikeQuote() {
    const updatedQuotes = quotes.map((quote, id) => {
      if (id === quoteIndex) {
        const currentLikedBy = Array.isArray(quote.likedBy)
          ? quote.likedBy
          : [];

        return { ...quote, likedBy: [...currentLikedBy, userSub] };
      }
      return quote;
    });
    setQuotes(updatedQuotes);
  }

  function handleUnlikeQuote(quoteContent: string) {
    const updatedQuotes = quotes.map((q) => {
      if (q.quote === quoteContent) {
        const currentLikedBy = Array.isArray(q.likedBy) ? q.likedBy : [];
        return {
          ...q,
          likedBy: currentLikedBy.filter((id) => id !== userSub),
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

  console.log("Context'teki userSub:", userSub);
  console.log("Filtrelenmiş likedQuotes:", likedQuotes);

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
