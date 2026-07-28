"use client";
import { createContext, useEffect, useState } from "react";
import { getRandomNumber } from "@/utils/helper-functions";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Quote, QuoteContextInterface } from "@/types/quotes";
import { toast } from "sonner";

const InitialQuotesContext = {
  quotes: [],
  quoteIndex: 0,
  isLoading: true,
  error: null,
  handleQuoteIndexUpdate: () => {},
  handleToggleLike: () => {},
  handleQuoteEdit: () => {},
  handleQuoteDelete: () => {},
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
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/quotes");
        if (!response.ok) {
          throw new Error(`Failed to load quotes! status: ${response.status}`);
        }
        const data = await response.json();
        setQuotes(data.quotes);
        setQuoteIndex(0);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load quotes!");
        setQuotes([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

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

  async function handleQuoteEdit(
    quoteId: string,
    updatedData: { quote?: string; author?: string; category?: string },
  ) {
    try {
      const response = await fetch(`/api/quotes/${quoteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`Failed to edit quote! Status: ${response.status}`);
      }

      setQuotes((prevQuotes) =>
        prevQuotes.map((q) =>
          q._id === quoteId ? { ...q, ...updatedData } : q,
        ),
      );
      toast.success("Quote updated successfully!");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to edit quote!";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  }

  async function handleQuoteDelete(quoteId: string) {
    try {
      const response = await fetch(`/api/quotes/${quoteId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete quote! Status: ${response.status}`);
      }
      setQuotes((prevQuotes) => prevQuotes.filter((q) => q._id !== quoteId));
      handleQuoteIndexUpdate();
      toast.success("Quote deleted successfully!");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete quote!";
      setError(errorMessage);
      toast.error(errorMessage);
    }
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
        isLoading,
        error,
        handleQuoteIndexUpdate,
        handleToggleLike,
        handleQuoteEdit,
        handleQuoteDelete,
        likedQuotes,
      }}
    >
      {children}
    </QuotesContext>
  );
}
