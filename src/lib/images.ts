// src/lib/images.ts

const R2_BASE_URL = process.env.NEXT_PUBLIC_R2_BASE_URL;

/**
 * Convierte una KEY interna en la URL pública de Cloudflare R2.
 * R2 NO usa el nombre del bucket en su URL pública.
 */
export function getImageUrl(path: string): string {
  if (!path) return path;
  if (!R2_BASE_URL) return path;

  // Si ya es URL absoluta, devolver tal cual
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Si accidentalmente viene con el bucket, lo quitamos SIEMPRE
  path = path.replace(/^lunara-public\//, "");

  const base = R2_BASE_URL.replace(/\/+$/, "");
  const key = path.replace(/^\/+/, "");

  return `${base}/${key}`;
}
