import { Collections, getDb } from "@/lib/db";
import { Quote } from "@/types/quotes";
import { quotes } from "@/quotes";

export async function GET() {
  const db = await getDb();
  const col = db.collection<Quote>(Collections.quotes);

  const result = await col.insertMany(quotes);

  const query = { adminApproved: false };
  //const quotes = await col.find(query).toArray();

  return Response.json({ quotes });
}
