// src/lib/r2.ts
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

if (
  !process.env.R2_ACCESS_KEY_ID ||
  !process.env.R2_SECRET_ACCESS_KEY ||
  !process.env.R2_ENDPOINT ||
  !process.env.R2_BUCKET_NAME
) {
  throw new Error("Faltan variables de entorno de R2");
}

export const r2Client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

export const R2_BUCKET = process.env.R2_BUCKET_NAME as string;

/**
 * Sube un archivo a R2 y devuelve la "key" interna.
 * Ej: products/2025/11/foobar.avif
 */
export async function uploadToR2(opts: {
  key: string;
  buffer: Buffer;
  contentType?: string;
}) {
  const { key, buffer, contentType } = opts;

  await r2Client.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: contentType ?? "application/octet-stream",
    })
  );

  return key;
}

/**
 * Elimina un archivo de R2 por su key.
 */
export async function deleteFromR2(key: string) {
  await r2Client.send(
    new DeleteObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
    })
  );
}
