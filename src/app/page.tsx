import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FileMinusIcon, WarningCircleIcon } from "@phosphor-icons/react";
import Link from "next/link";
import QuoteDisplayer from "./QuoteDisplayer";
import { getAllQuotes } from "@/services/quoteService";
import { auth0 } from "@/lib/auth0";

export default async function Home() {
  try {
    const quotes = await getAllQuotes();

    const session = await auth0.getSession();
    const userSub = session?.user?.sub;

    if (!quotes || quotes.length === 0) {
      return (
        <main>
          <div className="border rounded-md bg-accent max-w-md mx-auto my-20 md:my-36">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <FileMinusIcon />
                </EmptyMedia>
                <EmptyTitle>No Quotes Yet</EmptyTitle>
                <EmptyDescription>
                  Add one or approve quotes in the database.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Link href="/user/quotes/new">Add New Quotes</Link>
              </EmptyContent>
            </Empty>
          </div>
        </main>
      );
    }

    return (
      <main className="min-h-screen flex items-center justify-center">
        <QuoteDisplayer initialQuotes={quotes} userSub={userSub} />
      </main>
    );
  } catch (error) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center">
        <Alert variant="destructive" className="max-w-sm md:max-w-md">
          <WarningCircleIcon size={24} />
          <AlertTitle>Loading failed</AlertTitle>
          <AlertDescription>
            Failed to fetch quotes from the database.
          </AlertDescription>
        </Alert>
      </main>
    );
  }
}
