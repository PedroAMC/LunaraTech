// src/lib/collections.ts
"use server";

export type Collection = {
  id: number;
  slug: string;
  name: string;
  tagline: string | null;
  summary: string | null;
  heroImageUrl: string | null;
  isActive: boolean;
  showInHome: boolean;
};

export type CollectionProduct = {
  id: number;
  sku: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
};

export async function getCollections(): Promise<Collection[]> {
  return [];
}

export async function getCollectionBySlug(
  slug: string
): Promise<Collection | null> {
  return null;
}

export async function getProductsByCollectionSlug(
  slug: string
): Promise<CollectionProduct[]> {
  return [];
}