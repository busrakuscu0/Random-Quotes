import { Alert, AlertTitle } from "@/components/ui/alert";

export function AlertLikedQuotes() {
  return (
    <Alert className="" variant="destructive">
      <AlertTitle className="">You haven't liked any quotes yet.</AlertTitle>
    </Alert>
  );
}
