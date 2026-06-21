"use client";

import { H3 } from "@/components/typography/H3";
import { ListItem } from "@/app/ListItem";

export default function LikedQuotesPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start pt-12 gap-8">
      <H3 element={"h1"}>My Liked Quotes</H3>
      <ListItem />
    </main>
  );
}
