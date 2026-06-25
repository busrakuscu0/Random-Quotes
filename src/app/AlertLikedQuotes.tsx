import { Alert, AlertTitle } from "@/components/ui/alert";

export function AlertLikedQuotes() {
  return (
    <Alert variant="destructive">
      <AlertTitle>You haven't liked any quotes yet.</AlertTitle>
    </Alert>
  );
}
