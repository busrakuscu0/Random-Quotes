import { H3 } from "@/components/typography/H3";
import { Button } from "@/components/ui/button";
import { ListHeartIcon } from "@phosphor-icons/react";
import Link from "next/link";

export function AlertLikedQuotes() {
  return (
    <div className="w-full max-w-sm md:max-w-2xl p-8 md:p-16 flex flex-col justify-center items-center gap-6 bg-chart-6 border rounded-md">
      <ListHeartIcon size={100} color="#2c8768" />
      <H3 element={"p"}>You haven't liked any quotes yet.</H3>
      <p>Start exploring and like your favorite quotes to see them here!</p>
      <Button asChild>
        <Link href="/">Explore Quotes</Link>
      </Button>
    </div>
  );
}
