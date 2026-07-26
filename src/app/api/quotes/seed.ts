import { NextResponse } from "next/server";
import { Collections, getDb } from "@/lib/db";
import { Quote } from "@/types/quotes";
import { quotes } from "@/quotes"; // Yerel dosyanı SADECE BURADA import ediyorsun

export async function GET() {
  try {
    const db = await getDb();
    const col = db.collection<Quote>(Collections.quotes);

    // Verileri tek seferde ekliyoruz
    const result = await col.insertMany(quotes);

    return NextResponse.json({
      mesaj: "HARİKA! Veriler MongoDB'ye başarıyla eklendi.",
      eklenenSayi: result.insertedCount,
    });
  } catch (error) {
    return NextResponse.json(
      { hata: "Bir sorun oluştu", detay: error },
      { status: 500 },
    );
  }
}
