import { Collections, getDb } from "@/lib/db";
import { Quote } from "@/types/quotes";
import { ObjectId } from "mongodb";

export async function GET() {
  const db = await getDb();
  const col = db.collection<Quote>(Collections.quotes);

  const quotes = await col.find({}).toArray();

  return Response.json({ quotes });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { _id, newQuote, newAuthor } = body;

  const db = await getDb();
  const col = db.collection(Collections.quotes);

  await col.updateOne(
    { _id: new ObjectId(_id) },
    { $set: { quote: newQuote, author: newAuthor } },
  );
}
