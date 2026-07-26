import { Collections, getDb } from "@/lib/db";
import { Quote } from "@/types/quotes";

export async function GET() {
  const db = await getDb();
  const col = db.collection<Quote>(Collections.quotes);

  const quotes = await col.find({}).toArray();

  return Response.json({ quotes });
}
