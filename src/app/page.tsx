"use client";

import { useContext } from "react";
import { QuotesContext } from "@/app/QuotesContext";
import { QuoteCard } from "@/app/QuoteCard";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FileMinusIcon, WarningCircleIcon } from "@phosphor-icons/react";
import Link from "next/link";

export default function Home() {
  const {
    quotes,
    quoteIndex,
    isLoading,
    error,
    handleQuoteIndexUpdate,
    handleToggleLike,
  } = useContext(QuotesContext);

  if (isLoading) {
    <main>
      <div className="flex justify-center mt-30 md:mt-60">
        <Button size="lg" disabled>
          <Spinner data-icon="inline-start" />
          Loading...
        </Button>
      </div>
    </main>;
  }

  if (error) {
    <main>
      <Alert variant="destructive" className="max-w-sm md:max-w-md">
        <WarningCircleIcon />
        <AlertTitle>Loading failed</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    </main>;
  }

  const currentQuote = quotes[quoteIndex];
  if (!currentQuote) {
    return (
      <main>
        <div className="border rounded-md bg-accent max-w-md mx-auto my-20 md:my-36">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FileMinusIcon />
              </EmptyMedia>
              <EmptyTitle>No Quotes Yet</EmptyTitle>
              <EmptyDescription>
                Add one or approve quotes in the database.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Link href="/user/quotes/">Add New Quotes</Link>
            </EmptyContent>
          </Empty>
        </div>
      </main>
    );
  }

  const { quote, author, likedBy } = currentQuote;

  return (
    <main className="min-h-screen flex items-center justify-center">
      <QuoteCard
        handleToggleLike={handleToggleLike}
        likedBy={likedBy}
        quote={quote}
        author={author}
        handleQuoteIndexUpdate={handleQuoteIndexUpdate}
      />
      <Toaster />
    </main>
  );
}
