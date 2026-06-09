import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { H3 } from "@/components/typography/H3";
import { H6 } from "@/components/typography/H6";

interface QuoteCardProps {
  handleLikeQuote: () => void;
  likedBy: number;
  quote: string;
  author: string;
  handleQuoteIndexUpdate: () => void;
}

export function QuoteCard({
  handleLikeQuote,
  likedBy,
  quote,
  author,
  handleQuoteIndexUpdate,
}: QuoteCardProps) {
  return (
    <Card size="lg">
      <CardContent className="flex flex-col">
        <div className="self-end">
          <Button variant="destructive" size="sm" onClick={handleLikeQuote}>
            ❤️ {likedBy ?? 0}
          </Button>
        </div>
        <H3 element="p">{quote}</H3>
        <H6 element="span">- {author}</H6>
        <div className="mt-6 flex flex-row gap-4 justify-end">
          <Button onClick={handleQuoteIndexUpdate}>Next Quote</Button>
        </div>
      </CardContent>
    </Card>
  );
}
