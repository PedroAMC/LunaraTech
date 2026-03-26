// src/app/api/r2-test/route.ts
import { NextResponse } from "next/server";
import { r2Client, R2_BUCKET } from "@/lib/r2";
import { HeadBucketCommand } from "@aws-sdk/client-s3";

export async function GET() {
  try {
    await r2Client.send(
      new HeadBucketCommand({
        Bucket: R2_BUCKET,
      })
    );

    return NextResponse.json({
      ok: true,
      bucket: R2_BUCKET,
      message: "Conectado a R2 sin drama",
    });
  } catch (error: any) {
    console.error("Error probando R2:", error);
    return NextResponse.json(
      {
        ok: false,
        error: error?.message ?? "Error desconocido",
      },
      { status: 500 }
    );
  }
}
