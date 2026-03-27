// src/lib/products.ts
"use server";

export type Category = "perifericos" | "accesorios" | "almacenamiento" | null;

export type Product = {
  id: number;
  sku: string;
  name: string;
  description: string | null;
  shortDescription: string | null;
  price: number;
  stock: number;
  isActive: boolean;
  slug: string;
  category: Category;
  isFeatured: boolean;
  imageUrl: string | null;
  sold: number;
  createdAt: string;
  updatedAt: string;
};

export async function getProducts(): Promise<Product[]> {
  return [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return null;
}

export async function getProductById(id: number): Promise<Product | null> {
  return null;
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  return [];
}

export async function getProductsByCategory(
  category: Exclude<Category, null>
): Promise<Product[]> {
  return [];
}

export async function getProductsByIds(ids: number[]): Promise<Product[]> {
  return [];
}

export async function updateProduct(
  id: number,
  fields: Partial<{
    name: string;
    sku: string;
    price: number;
    stock: number;
    description: string | null;
    shortDescription: string | null;
    slug: string;
    category: Category;
    isActive: boolean;
    isFeatured: boolean;
    imageUrl: string | null;
  }>
): Promise<boolean> {
  return false;
}