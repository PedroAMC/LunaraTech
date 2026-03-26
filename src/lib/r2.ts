// src/lib/r2.ts
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

function getR2Config() {
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const endpoint = process.env.R2_ENDPOINT;
  const bucketName = process.env.R2_BUCKET_NAME;

  if (!accessKeyId || !secretAccessKey || !endpoint || !bucketName) {
    throw new Error("Faltan variables de entorno de R2");
  }

  return {
    accessKeyId,
    secretAccessKey,
    endpoint,
    bucketName,
  };
}

function getR2Client() {
  const { accessKeyId, secretAccessKey, endpoint } = getR2Config();

  return new S3Client({
    region: "auto",
    endpoint,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

/**
 * Sube un archivo a R2 y devuelve la key interna.
 * Ej: products/2025/11/foobar.avif
 */
export async function uploadToR2(opts: {
  key: string;
  buffer: Buffer;
  contentType?: string;
}) {
  const { key, buffer, contentType } = opts;
  const { bucketName } = getR2Config();
  const r2Client = getR2Client();

  await r2Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
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
  const { bucketName } = getR2Config();
  const r2Client = getR2Client();

  await r2Client.send(
    new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    })
  );
}