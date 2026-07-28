import { Collections, getDb } from "@/lib/db";
import { ObjectId } from "mongodb";

// PUT İsteği - Güncelleme İşlemi
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> | { id: string } }, // Context'i Next.js'e uygun alıyoruz
) {
  try {
    // BURASI YENİ: Next.js'in yeni sürümleri için params'ı await ile çözümlüyoruz
    const params = await context.params;
    const quoteId = params.id;

    const body = await request.json();

    // DEDEKTİF KODLARI BURADA KALSIN (Bir kez daha test etmek için)
    console.log("---- API'YE GELEN İSTEK ----");
    console.log("Gelen ID:", quoteId);
    console.log("Gelen Body:", body);
    console.log("----------------------------");

    const { quote, author, category } = body;

    if (!quoteId || !quote) {
      return Response.json(
        { error: "Eksik veri gönderildi!" },
        { status: 400 },
      );
    }

    const db = await getDb();
    const col = db.collection(Collections.quotes);

    // Veritabanında güncelle
    const result = await col.updateOne(
      { _id: new ObjectId(quoteId) },
      // Artık newQuote değil, frontend'in gönderdiği 'quote' değişkenini kullanıyoruz. category'yi de ekledik.
      {
        $set: {
          quote: quote,
          author: author,
          category: category,
          updatedAt: new Date(),
        },
      },
    );

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

// DELETE İsteği - Silme İşlemi
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> | { id: string } },
) {
  try {
    // Tıpkı PUT işlemindeki gibi ID'yi güvenli bir şekilde yakalıyoruz
    const params = await context.params;
    const quoteId = params.id;

    if (!quoteId) {
      return Response.json(
        { error: "Silinecek ID bulunamadı!" },
        { status: 400 },
      );
    }

    const db = await getDb();
    const col = db.collection(Collections.quotes);

    // Veritabanından sil
    const result = await col.deleteOne({ _id: new ObjectId(quoteId) });

    if (result.deletedCount === 0) {
      return Response.json(
        { error: "Bu ID'ye ait bir alıntı bulunamadı." },
        { status: 404 },
      );
    }

    return Response.json(
      { message: "Alıntı başarıyla silindi!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Silme Hatası:", error);
    return Response.json(
      { error: "Sunucu tarafında bir hata oluştu." },
      { status: 500 },
    );
  }
}
