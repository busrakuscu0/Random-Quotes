import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { useContext } from "react";
import { QuotesContext } from "@/app/QuotesContext";
import { AlertLikedQuotes } from "./AlertLikedQuotes";

export function ListItem() {
  const { likedQuotes, handleToggleLike } = useContext(QuotesContext);

  if (likedQuotes.length === 0) {
    return <AlertLikedQuotes />;
  }

  return (
    <div className="flex w-full max-w-sm md:max-w-lg flex-col gap-6">
      {likedQuotes.map(({ quote, author }) => (
        <Item className="" key={quote} variant="outline">
          <ItemContent className="">
            <div className="flex flex-col">
              <ItemTitle className="">{quote}</ItemTitle>
              <ItemDescription className=""> - {author}</ItemDescription>
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
  );
}
