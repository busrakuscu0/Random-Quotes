import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { EmptyLikedQuotes } from "./EmptyLikedQuotes";
import { H3 } from "@/components/typography/H3";
import { auth0 } from "@/lib/auth0";
import { getLikedQuotes } from "@/services/quoteService";
import UnlikeButton from "./UnlikeButton";

export async function LikedQuotes() {
  const session = await auth0.getSession();

  if (!session || !session.user) {
    return <p>Please log in to view your liked quotes.</p>;
  }
  const likedQuotes = await getLikedQuotes(session.user.sub);

  if (!likedQuotes || likedQuotes.length === 0) {
    return <EmptyLikedQuotes />;
  }

  return (
    <>
      <H3 element={"h1"}>My Liked Quotes</H3>
      <div className="flex w-full max-w-sm md:max-w-lg flex-col gap-4 md:gap-6">
        {likedQuotes.map(({ _id, quote, author }) => (
          <Item key={String(_id) || quote} variant="outline">
            <ItemContent>
              <div className="flex flex-col">
                <ItemTitle>{quote}</ItemTitle>
                <ItemDescription> - {author}</ItemDescription>
              </div>
              <div>
                <UnlikeButton quoteId={String(_id)} />
              </div>
            </ItemContent>
          </Item>
        ))}
      </div>
    </>
  );
}
