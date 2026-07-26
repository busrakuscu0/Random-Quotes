"use client";

import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { useContext } from "react";
import { QuotesContext } from "@/app/QuotesContext";
import { EmptyLikedQuotes } from "./EmptyLikedQuotes";
import { H3 } from "@/components/typography/H3";

export function LikedQuotes() {
  const { likedQuotes, handleToggleLike } = useContext(QuotesContext);

  if (!likedQuotes || likedQuotes.length === 0) {
    return <EmptyLikedQuotes />;
  }

  return (
    <>
      <H3 element={"h1"}>My Liked Quotes</H3>
      <div className="flex w-full max-w-sm md:max-w-lg flex-col gap-6">
        {likedQuotes.map(({ quote, author }) => (
          <Item key={quote} variant="outline">
            <ItemContent>
              <div className="flex flex-col">
                <ItemTitle>{quote}</ItemTitle>
                <ItemDescription> - {author}</ItemDescription>
              </div>
              <div>
                <Button size="xs" onClick={() => handleToggleLike(quote)}>
                  Unlike
                </Button>
              </div>
            </ItemContent>
          </Item>
        ))}
      </div>
    </>
  );
}
