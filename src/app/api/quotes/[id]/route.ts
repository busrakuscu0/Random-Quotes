import { Collections, getDb } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> | { id: string } },
) {
  try {
    const quoteId = (await context.params).id;
    const { quote, author, category } = await request.json();

    const db = await getDb();

    const result = await db
      .collection(Collections.quotes)
      .updateOne(
        { _id: new ObjectId(quoteId) },
        { $set: { quote, author, category, updatedAt: new Date() } },
      );

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
  try {
    const quoteId = (await context.params).id;

    if (!quoteId) {
      return Response.json({ error: "Quote ID is missing." }, { status: 400 });
    }

    const db = await getDb();

    const result = await db.collection(Collections.quotes).deleteOne({
      _id: new ObjectId(quoteId),
    });

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
