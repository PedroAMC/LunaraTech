// src/data/members-mock.ts
export type Member = {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "editor" | "viewer";
  lastSeenMin?: number; // opcional: undefined => “sin actividad”
};

export const MEMBERS: Member[] = [
  {
    id: "m-001",
    name: "Pedro A. Muñoz C.",
    email: "pedro@lunaratech.cl",
    role: "owner",
    lastSeenMin: 1,
  },
  {
    id: "m-002",
    name: "Macarena D. Calle J.",
    email: "macarena@lunaratech.cl",
    role: "admin",
    lastSeenMin: 8,
  },
  {
    id: "m-003",
    name: "Diego M. Lagos",
    email: "diego@lunaratech.cl",
    role: "editor",
    lastSeenMin: 35,
  },
  {
    id: "m-004",
    name: "Vania Belmar",
    email: "vania@lunaratech.cl",
    role: "viewer",
    // sin actividad
  },
];
