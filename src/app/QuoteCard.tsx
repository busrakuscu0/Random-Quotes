"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { H3 } from "@/components/typography/H3";
import { H6 } from "@/components/typography/H6";
import { useUser } from "@auth0/nextjs-auth0";
import { toast } from "sonner";
import { QuoteCardProps } from "@/types/quotes";
import { HeartIcon, PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";

export function QuoteCard({
  id,
  handleToggleLike,
  likedBy,
  createdBy,
  quote,
  author,
  handleQuoteIndexUpdate,
  handleQuoteDelete,
}: QuoteCardProps) {
  const { user, isLoading } = useUser();
  const isOwner = user?.sub === createdBy;

  if (isLoading)
    return (
      <>
        <div className="flex justify-center mt-30 md:mt-60">
          <Button size="lg" disabled>
            <Spinner data-icon="inline-start" />
            Loading...
          </Button>
        </div>
      </>
    );

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
        {isOwner ? (
          <div className="flex gap-1 md:gap-2">
            <Link href={`/user/quotes/new?id=${id}`}>
              <Button variant="secondary" size="icon" className="px-4 md:px-6">
                <PencilSimpleIcon />
              </Button>
            </Link>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="px-4 md:px-6"
                >
                  <TrashIcon />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent size="sm">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete the quote.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel variant="outline">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    variant="destructive"
                    onClick={() => handleQuoteDelete(id)}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
