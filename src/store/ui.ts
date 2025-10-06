"use client";
import { create } from "zustand";

type UIState = {
  country: "CL"; // por ahora fijo
  lang: "es";    // estructura
  authOpen: boolean;
  setAuthOpen: (v: boolean) => void;
  setCountry: (c: UIState["country"]) => void;
  setLang: (l: UIState["lang"]) => void;
};

export const useUI = create<UIState>((set) => ({
  country: "CL",
  lang: "es",
  authOpen: false,
  setAuthOpen: (v) => set({ authOpen: v }),
  setCountry: (c) => set({ country: c }),
  setLang: (l) => set({ lang: l }),
}));
