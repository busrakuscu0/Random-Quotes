import { Alert, AlertTitle } from "@/components/ui/alert";

export function AlertLikedQuotes() {
  return (
    <Alert className="w-full max-w-md" variant="destructive">
      <AlertTitle className="text-center">
        You haven't liked any quotes yet.
      </AlertTitle>
    </Alert>
  );
}
