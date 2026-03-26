"use client";
import { useEffect } from "react";
export default function Modal({open,title,children,onClose}:{open:boolean; title:string; children:React.ReactNode; onClose:()=>void}) {
  useEffect(()=>{ const onEsc=(e:KeyboardEvent)=>e.key==="Escape"&&onClose(); if(open) document.addEventListener("keydown",onEsc); return ()=>document.removeEventListener("keydown",onEsc);},[open,onClose]);
  if(!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-xl bg-neutral-900 border border-neutral-700" onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800">
          <h3 className="font-medium">{title}</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-200">✕</button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
