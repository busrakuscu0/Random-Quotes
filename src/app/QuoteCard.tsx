import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { H3 } from "@/components/typography/H3";
import { H6 } from "@/components/typography/H6";
import { useUser } from "@auth0/nextjs-auth0";
import { toast } from "sonner";
import { QuoteCardProps } from "@/types/quotes";

export function QuoteCard({
  handleToggleLike,
  likedBy,
  quote,
  author,
  handleQuoteIndexUpdate,
}: QuoteCardProps) {
  const { user, isLoading } = useUser();

  if (isLoading) return <></>;

  const onLikeClick = () => {
    if (user) {
      handleToggleLike(quote);
    } else {
      toast.warning("You need to be logged in to like a quote.");
    }
  };

  return (
    <Card size="lg">
      <CardContent>
        <div className="self-end">
          <Button variant="destructive" size="sm" onClick={onLikeClick}>
            ❤️ {likedBy?.length ?? 0}
          </Button>
        </div>
        <H3 element="p">{quote}</H3>
        <H6 element="span">- {author}</H6>
        <div className="mt-4 md:mt-6 flex flex-row gap-2 md:gap-4 justify-end">
          <Button className="w-full" onClick={handleQuoteIndexUpdate}>
            Next Quote
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
