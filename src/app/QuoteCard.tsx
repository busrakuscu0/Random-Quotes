import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { H3 } from "@/components/typography/H3";
import { H6 } from "@/components/typography/H6";
import { useUser } from "@auth0/nextjs-auth0";
import { toast } from "sonner";

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
  const { user, isLoading } = useUser();

  if (isLoading) return <></>;

  const onLikeClick = () => {
    if (user) {
      handleLikeQuote();
    } else {
      toast.warning("You need to be logged in to like a quote.");
    }
  };

  return (
    <Card size="lg">
      <CardContent className="flex flex-col">
        <div className="self-end">
          <Button variant="destructive" size="sm" onClick={onLikeClick}>
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
