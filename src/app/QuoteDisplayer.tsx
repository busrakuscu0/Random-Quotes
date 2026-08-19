"use client";

import { useState } from "react";
import { QuoteCard } from "@/app/QuoteCard";
import { Quote } from "@/types/quotes";
import { getRandomNumber } from "@/utils/helper-functions";
import { toast } from "sonner";
import { deleteQuoteAction, toggleLikeAction } from "./actions/quoteActions";

export default function QuoteDisplayer({
  initialQuotes,
  userSub,
}: {
  initialQuotes: Quote[];
  userSub: string | null | undefined;
}) {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);
  const [quoteIndex, setQuoteIndex] = useState(0);

  if (!quotes || quotes.length === 0) return null;
  const currentQuote = quotes[quoteIndex];

  const handleQuoteIndexUpdate = () => {
    const nextIndex = getRandomNumber(0, quotes.length - 1);
    setQuoteIndex(nextIndex);
  };

  const handleToggleLike = async (quoteId: string) => {
    if (!userSub) {
      toast.error("Please log in to like quotes.");
      return;
    }

    setQuotes((prev) =>
      prev.map((q) => {
        if (q._id === quoteId) {
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
      }),
    );
    try {
      await toggleLikeAction(quoteId);
    } catch (error) {
      toast.error("Failed to update like in database.");
    }
  };

  const handleQuoteDelete = async (quoteId: string) => {
    setQuotes((prev) => prev.filter((q) => q._id !== quoteId));
    handleQuoteIndexUpdate();
    toast.success("Quote deleted!");

    try {
      await deleteQuoteAction(quoteId);
    } catch (error) {
      toast.error("Failed to delete quote from database.");
    }
  };

  return (
    <QuoteCard
      id={currentQuote._id}
      quote={currentQuote.quote}
      author={currentQuote.author}
      likedBy={currentQuote.likedBy}
      createdBy={currentQuote.createdBy}
      handleToggleLike={() => handleToggleLike(currentQuote._id as string)}
      handleQuoteIndexUpdate={handleQuoteIndexUpdate}
      handleQuoteDelete={() => handleQuoteDelete(currentQuote._id as string)}
    />
  );
}
