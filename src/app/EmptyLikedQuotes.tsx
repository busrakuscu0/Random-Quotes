import Link from "next/link";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { HeartHalfIcon } from "@phosphor-icons/react";

export function EmptyLikedQuotes() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HeartHalfIcon />
        </EmptyMedia>
        <EmptyTitle>No Liked Quotes Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t liked any quotes yet. Get started by exploring your
          favorite quotes.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link href="/">Explore Quotes</Link>
      </EmptyContent>
    </Empty>
  );
}
