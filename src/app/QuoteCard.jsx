import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { H3 } from "@/components/typography/H3";
import { H6 } from "@/components/typography/H6";

export function QuoteCard({
  handleLikeQuote,
  likedBy,
  quote,
  author,
  handleQuoteIndexUpdate,
}) {
  return (
    <Card size="lg" className="mx-auto w-full max-w-sm">
      <CardContent className="flex flex-col">
        <div className="self-end">
          <Button variant={"icon"} onClick={handleLikeQuote}>
            ❤️ {likedBy ?? 0}
          </Button>
        </div>
        <H3 element="p">{quote}</H3>
        <H6 element="span">- {author}</H6>
        <div className="mt-6 flex flex-row gap-4 justify-end">
          <Button className="w-full" onClick={handleQuoteIndexUpdate}>
            Next Quote
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
