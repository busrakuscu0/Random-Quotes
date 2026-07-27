"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { H3 } from "@/components/typography/H3";
import { H6 } from "@/components/typography/H6";
import { useUser } from "@auth0/nextjs-auth0";
import { toast } from "sonner";
import { QuoteCardProps } from "@/types/quotes";
import { HeartIcon, PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";

export function QuoteCard({
  handleToggleLike,
  likedBy,
  quote,
  author,
  handleQuoteIndexUpdate,
}: QuoteCardProps) {
  const { user, isLoading } = useUser();

  if (isLoading) return <></>;

  const hasLiked = Boolean(user?.sub && likedBy?.includes(user.sub));

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
          <Button
            variant="destructive"
            size="icon"
            onClick={onLikeClick}
            className="px-4 md:px-8"
          >
            <HeartIcon
              weight={hasLiked ? "fill" : "regular"}
              className={hasLiked ? "text-bg-destructive" : ""}
            />
          </Button>
        </div>
        <H3 element="p">"{quote}"</H3>

        <div className="mt-8 md:mt-16 flex flex-row justify-between align-baseline">
          <H6 element="span">- {author}</H6>

          <Button
            size="lg"
            onClick={handleQuoteIndexUpdate}
            className="px-6 md:px-8 py-4 md:py-6"
          >
            Next Quote
          </Button>
        </div>
        <div className="flex gap-1 md:gap-2">
          <Button variant="secondary" size="icon" className="px-4 md:px-6">
            <PencilSimpleIcon />
          </Button>
          <Button variant="secondary" size="icon" className="px-4 md:px-6">
            <TrashIcon />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
