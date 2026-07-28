import { Collections, getDb } from "@/lib/db";
import { Quote } from "@/types/quotes";

export async function GET() {
  try {
    const db = await getDb();
    const col = db.collection<Quote>(Collections.quotes);

    const quotes = await col.find({}).toArray();

    return Response.json({ quotes });
  } catch (error) {
    return Response.json({ error: "Failed to fetching data" });
  }
}
