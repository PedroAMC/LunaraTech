// src/app/api/admin/upload/route.ts
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { uploadToR2 } from "@/lib/r2";
import { getImageUrl } from "@/lib/images";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { ok: false, error: "No se recibió archivo" },
        { status: 400 }
      );
    }

    // Buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split(".").pop() || "bin";
    const mime = file.type || "application/octet-stream";

    // KEY correcta (sin bucket)
    const key = `products/${new Date().getFullYear()}/${new Date().getMonth() + 1}/${randomUUID()}.${ext}`;

    await uploadToR2({
      key,
      buffer,
      contentType: mime,
    });

    // URL pública correcta
    const url = getImageUrl(key);

    return NextResponse.json({
      ok: true,
      key,
      url,
    });

  } catch (error: any) {
    console.error("Error subiendo a R2:", error);
    return NextResponse.json(
      { ok: false, error: error?.message ?? "Error desconocido subiendo archivo" },
      { status: 500 }
    );
  }
}
