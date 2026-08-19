import { auth0 } from "@/lib/auth0";
import { getDb } from "@/lib/db";
import { deleteUserQuote, updateUserQuote } from "@/services/quoteService";
import { ObjectId } from "mongodb";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> | { id: string } },
) {
  const session = await auth0.getSession();

  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const quoteId = (await context.params).id;

    if (!ObjectId.isValid(quoteId)) {
      return Response.json({ error: "Invalid quote ID." }, { status: 400 });
    }

    const { quote, author, category } = await request.json();

    const db = await getDb();

    const result = await updateUserQuote(quoteId, session.user.sub, {
      quote,
      author,
      category,
    });

    if (result.matchedCount === 0) {
      return Response.json({ error: "Quote not found." }, { status: 404 });
    }

    return Response.json(
      { message: "Quote updated successfully!" },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      { error: "An internal server error occurred." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> | { id: string } },
) {
  const session = await auth0.getSession();

  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const quoteId = (await context.params).id;

    if (!ObjectId.isValid(quoteId)) {
      return Response.json({ error: "Invalid quote ID." }, { status: 400 });
    }

    const result = await deleteUserQuote(quoteId, session.user.sub);

    if (result.deletedCount === 0) {
      return Response.json({ error: "Quote not found." }, { status: 404 });
    }

    return Response.json(
      { message: "Quote deleted successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Delete Error:", error);
    return Response.json(
      { error: "An internal server error occurred." },
      { status: 500 },
    );
  }
}
