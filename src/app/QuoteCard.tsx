import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { H3 } from "@/components/typography/H3";
import { H6 } from "@/components/typography/H6";
import { useUser } from "@auth0/nextjs-auth0";
import { toast } from "sonner";

interface QuoteCardProps {
  handleToggleLike: (userSub: string) => void;
  likedBy: string[];
  quote: string;
  author: string;
  handleQuoteIndexUpdate: () => void;
}

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
      <CardContent className="">
        <div className="self-end">
          <Button variant="destructive" size="sm" onClick={onLikeClick}>
            ❤️ {likedBy?.length ?? 0}
          </Button>
        </div>
        <H3 element="p">{quote}</H3>
        <H6 element="span">- {author}</H6>
        <div className="mt-4 md:mt-6 flex flex-row gap-2 md:gap-4 justify-end">
          <Button onClick={handleQuoteIndexUpdate}>Next Quote</Button>
        </div>
      </CardContent>
    </Card>
  );
}
