import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://lunaratech.cl/", lastModified: new Date() },
    { url: "https://lunaratech.cl/productos", lastModified: new Date() },
  ];
}
