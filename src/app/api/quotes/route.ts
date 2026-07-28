import { auth0 } from "@/lib/auth0";
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
  try {
    const body = await request.json();
    const { _id, newQuote, newAuthor } = body;

    if (!_id || !newQuote) {
      return Response.json(
        { error: "Eksik veri gönderildi!" },
        { status: 400 },
      );
    }

    const db = await getDb();
    const col = db.collection(Collections.quotes);

    const result = await col.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { quote: newQuote, author: newAuthor, updatedAt: new Date() } },
    );

    // 3. Eğer ID bulunduysa ve güncellendiyse başarılı yanıt dön
    if (result.matchedCount === 0) {
      return Response.json(
        { error: "Bu ID'ye ait bir alıntı bulunamadı." },
        { status: 404 },
      );
    }

    return Response.json(
      { message: "Alıntı başarıyla güncellendi!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Güncelleme Hatası:", error);
    return Response.json(
      { error: "Sunucu tarafında bir hata oluştu." },
      { status: 500 },
    );
  }
}
