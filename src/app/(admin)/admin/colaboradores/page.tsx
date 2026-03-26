"use client";

import { useEffect, useState } from "react";
import Badge from "@/components/admin/Badge";
import PresenceDot from "@/components/admin/PresenceDot";
import type { Member } from "@/data/members-mock";
import { MEMBERS as BASE } from "@/data/members-mock";
import { getMembers, saveMembers } from "@/lib/localdb";

function RoleBadge({ role }: { role: Member["role"] }) {
  if (role === "owner") return <Badge kind="green">Owner</Badge>;
  if (role === "admin") return <Badge kind="yellow">Admin</Badge>;
  if (role === "editor") return <Badge kind="red">Editor</Badge>;
  return <Badge kind="gray">Viewer</Badge>;
}

export default function ColaboradoresPage() {
  // 1) SSR = cliente con semilla
  const [items, setItems] = useState<Member[]>(BASE);

  // 2) Cargar LS
  useEffect(() => {
    const fromLS = getMembers();
    setItems(fromLS);
  }, []);

  // Invitación (mock UI)
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Member["role"]>("viewer");

  const invite = () => {
    if (!email.trim()) return;
    const nameFromEmail = email.split("@")[0].replace(/\./g, " ");
    const newMember: Member = {
      id: `inv-${Date.now()}`,
      name: nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1),
      email,
      role,
      // lastSeen opcional/indefinido → puntito gris
    };
    const next = [...items, newMember];
    setItems(next);
    saveMembers(next);
    setEmail("");
    setRole("viewer");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Colaboradores</h1>

      <div className="overflow-x-auto rounded-xl border border-neutral-800">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-900 text-neutral-300">
            <tr>
              <th className="px-3 py-2 text-left">Nombre</th>
              <th className="px-3 py-2 text-left">Correo</th>
              <th className="px-3 py-2 text-left">Rol</th>
              <th className="px-3 py-2 text-center">Presencia</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {items.map((m) => (
              <tr key={m.id} className="hover:bg-neutral-900/50">
                <td className="px-3 py-2 font-medium">{m.name}</td>
                <td className="px-3 py-2">{m.email}</td>
                <td className="px-3 py-2"><RoleBadge role={m.role} /></td>
                <td className="px-3 py-2 text-center">
                  <div className="inline-flex items-center gap-2">
                    <PresenceDot minutes={m.lastSeenMin} />
                    <span className="text-xs text-neutral-400">
                      {m.lastSeenMin === undefined ? "sin actividad" : `visto hace ${m.lastSeenMin} min`}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invitación */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-950/40 p-4">
        <div className="text-neutral-300 font-medium mb-3">Invitar miembro</div>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            placeholder="correo@lunaratech.cl"
            className="bg-neutral-900 border border-neutral-700 rounded px-3 py-2 w-full"
          />
          <select
            value={role}
            onChange={e => setRole(e.target.value as Member["role"])}
            className="bg-neutral-900 border border-neutral-700 rounded px-3 py-2"
          >
            <option value="owner">Owner</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>
          <button
            onClick={invite}
            className="rounded-md px-3 py-2 bg-emerald-700 hover:bg-emerald-600"
          >
            Enviar invitación
          </button>
        </div>
        <p className="mt-2 text-xs text-neutral-400">
          La persona recibirá un enlace para unirse con el rol indicado.
        </p>
      </div>
    </div>
  );
}
