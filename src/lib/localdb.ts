// src/lib/localdb.ts

import type { Product } from "@/data/catalog-mock";
import { PRODUCTS } from "@/data/catalog-mock";
import type { Member } from "@/data/members-mock";
import { MEMBERS } from "@/data/members-mock";

const STORAGE_PRODUCTS = "lt_products_v1";
const STORAGE_MEMBERS  = "lt_members_v1";

// --------- helpers ---------
function readJSON<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJSON<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    setTimeout(() => localStorage.setItem(key, JSON.stringify(value)), 0);
  } catch {
    /* noop */
  }
}

// --------- products ---------
export function getProducts(): Product[] {
  const fromLS = readJSON<Product[]>(STORAGE_PRODUCTS);
  return fromLS ?? PRODUCTS;
}

export function saveProducts(products: Product[]): void {
  writeJSON(STORAGE_PRODUCTS, products);
}

// --------- members ---------
export function getMembers(): Member[] {
  const fromLS = readJSON<Member[]>(STORAGE_MEMBERS);
  return fromLS ?? MEMBERS;
}

export function saveMembers(members: Member[]): void {
  writeJSON(STORAGE_MEMBERS, members);
}
