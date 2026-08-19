import { getAllQuotes } from "@/services/quoteService";

export async function GET() {
  try {
    const quotes = await getAllQuotes();

    return Response.json({ quotes });
  } catch (error) {
    return Response.json({ error: "Failed to fetching data" });
  }
}
