"use client";

import { Button } from "@/components/ui/button";
import { toggleLikeAction } from "./actions/quoteActions";

export default function UnlikeButton({ quoteId }: { quoteId: string }) {
  return (
    <Button size="xs" onClick={() => toggleLikeAction(quoteId)}>
      Unlike
    </Button>
  );
}
