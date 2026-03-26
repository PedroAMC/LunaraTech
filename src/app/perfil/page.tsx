"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

type TabId = "resumen" | "config" | "seguridad";

type AccountOverview = {
  totalSpent: number;
  totalOrders: number;
  currency: string;
  budget?: number | null;
  lastOrders: {
    id: string;
    date: string;
    status: string;
    total: string;
  }[];
};

type Tier = {
  id: "starter" | "member" | "pro" | "elite";
  label: string;
  min: number;
  badgeColor: string;
  barColor: string;
  description: string;
  perks: string[];
};

type DetailPanelId =
  | "estado_cuenta"
  | "pedidos_totales"
  | "gasto_total"
  | "historial_pedidos"
  | "nivel_lunara"
  | "tema"
  | "animaciones"
  | "pais_moneda"
  | "idioma"
  | "comunicaciones"
  | "privacidad_datos"
  | "estado_verificacion"
  | "sesion_actual"
  | "sesiones_dispositivos";

const LUNARA_TIERS: Tier[] = [
  {
    id: "starter",
    label: "Lunara Starter",
    min: 0,
    badgeColor: "bg-slate-800",
    barColor: "bg-slate-400",
    description:
      "Tu cuenta está lista para despegar. Ideal para tus primeras compras.",
    perks: [
      "Acceso completo a la tienda",
      "Soporte estándar",
      "Participación en sorteos generales",
    ],
  },
  {
    id: "member",
    label: "Lunara Member",
    min: 50_000,
    badgeColor: "bg-sky-700",
    barColor: "bg-sky-400",
    description:
      "Cliente frecuente que ya forma parte de la tripulación Lunara.",
    perks: [
      "Prioridad moderada en soporte",
      "Acceso anticipado a algunas colecciones",
      "Posibles cupones de bienvenida en eventos",
    ],
  },
  {
    id: "pro",
    label: "Lunara Pro",
    min: 300_000,
    badgeColor: "bg-indigo-700",
    barColor: "bg-indigo-400",
    description:
      "Setup serio, compras constantes y confianza total en LunaraTech.",
    perks: [
      "Prioridad alta en soporte",
      "Acceso anticipado a lanzamientos clave",
      "Beneficios especiales en envíos y bundles seleccionados",
    ],
  },
  {
    id: "elite",
    label: "Lunara Elite",
    min: 1_500_000,
    badgeColor: "bg-purple-700",
    barColor: "bg-purple-400",
    description:
      "Máximo rango. Clientes que llevan su setup al siguiente nivel.",
    perks: [
      "Soporte prioritario",
      "Acceso a drops limitados y preventas privadas",
      "Beneficios exclusivos (descuentos, regalos o upgrades sorpresa)",
    ],
  },
];

function getTierBySpent(totalSpent: number): {
  current: Tier;
  next: Tier | null;
  progressToNext: number;
  remainingToNext: number | null;
} {
  const sorted = [...LUNARA_TIERS].sort((a, b) => a.min - b.min);
  const spent = Math.max(0, totalSpent);

  let current = sorted[0];
  for (const t of sorted) {
    if (spent >= t.min) current = t;
  }

  const currentIndex = sorted.findIndex((t) => t.id === current.id);
  const next =
    currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null;

  if (!next) {
    return {
      current,
      next: null,
      progressToNext: 100,
      remainingToNext: null,
    };
  }

  const range = next.min - current.min;
  const progressRaw = range > 0 ? ((spent - current.min) / range) * 100 : 0;
  const progressToNext = Math.min(100, Math.max(0, progressRaw));
  const remainingToNext = Math.max(0, next.min - spent);

  return { current, next, progressToNext, remainingToNext };
}

export default function PerfilPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [tab, setTab] = useState<TabId>("resumen");
  const [overview, setOverview] = useState<AccountOverview | null>(null);
  const [loadingOverview, setLoadingOverview] = useState(false);
  const [showTierInfo, setShowTierInfo] = useState(false);
  const [detailPanelId, setDetailPanelId] = useState<DetailPanelId | null>(
    null
  );

  useEffect(() => {
    if (!session) return;

    const fetchOverview = async () => {
      try {
        setLoadingOverview(true);
        const res = await fetch("/api/account/overview");
        if (!res.ok) return;
        const data = (await res.json()) as AccountOverview;
        setOverview(data);
      } finally {
        setLoadingOverview(false);
      }
    };

    fetchOverview();
  }, [session]);

  const handleTierClick = (tierId: Tier["id"]) => {
    router.push(`/membresias/lunara?plan=${tierId}`);
  };

  // cuando cambio de tab, cierro el detalle
  const handleSetTab = (t: TabId) => {
    setDetailPanelId(null);
    setTab(t);
  };

  if (status === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#020617]">
        <p className="text-gray-300">Cargando perfil...</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#020617]">
        <div className="bg-black/70 border border-white/10 rounded-xl px-10 py-8 text-center shadow-2xl backdrop-blur">
          <h1 className="text-3xl font-bold mb-3">No has iniciado sesión</h1>
          <p className="text-gray-400 mb-6">
            Inicia sesión para ver tu perfil, tus pedidos y tus preferencias.
          </p>
          <button
            onClick={() => signIn("google", { callbackUrl: "/perfil" })}
            className="w-full max-w-xs px-4 py-2.5 rounded-full font-semibold bg-white text-black hover:bg-gray-200 transition"
          >
            Iniciar sesión con Google
          </button>
        </div>
      </main>
    );
  }

  const user = session.user;
  const currency = overview?.currency ?? "CLP";
  const totalSpent = overview?.totalSpent ?? 0;

  const { current, next, progressToNext, remainingToNext } =
    getTierBySpent(totalSpent);

  const isVerified = true;

  const hasOrders = !!overview && overview.lastOrders.length > 0;
  const lastOrder = hasOrders ? overview!.lastOrders[0] : null;
  const totalOrders = overview?.totalOrders ?? 0;

  return (
    <main className="min-h-screen bg-[#020617] py-12">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        {/* Título */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center md:text-left">
            Tu perfil
          </h1>
          <p className="text-gray-400 mt-2 text-center md:text-left">
            Administra tu cuenta, preferencias y seguridad de tu sesión en
            LUNARATECH.
          </p>
        </header>

        {/* Wrapper con borde azul Lunara */}
        <div className="rounded-xl border border-sky-500/25 bg-gradient-to-b from-sky-500/10 via-transparent to-transparent p-[1px] shadow-[0_0_28px_rgba(56,189,248,0.25)]">
          {/* Card principal */}
          <section className="bg-black/80 border border-white/10 rounded-lg p-6 md:p-8 backdrop-blur-xl">
            {/* Header del card */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-white/10 pb-6">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-sky-400 shadow-lg">
                    <img
                      src={user?.image || "/default-avatar.png"}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleTierClick(current.id)}
                    className={`absolute -bottom-2 left-1 px-2 py-[2px] text-[11px] font-semibold text-white rounded-sm ${current.badgeColor} hover:ring-2 hover:ring-sky-400/60 transition`}
                  >
                    {current.label}
                  </button>
                </div>

                <div>
                  <p className="text-xs tracking-[0.25em] text-gray-500 uppercase mb-1">
                    Cuenta Lunara
                  </p>
                  <h2 className="text-xl font-semibold">{user?.name}</h2>
                  <p className="text-sm text-gray-400 break-all">
                    {user?.email}
                  </p>
                </div>
              </div>

              <div className="flex md:flex-col gap-3 md:items-end">
                {isVerified ? (
                  <span className="inline-flex items-center rounded-full border border-sky-400/60 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-200">
                    <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-sky-400" />
                    Cuenta verificada
                  </span>
                ) : (
                  <button className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-gray-200 hover:bg-white/10 transition">
                    Verificar cuenta
                  </button>
                )}
              </div>
            </div>

            {/* Tabs + contenido */}
            <div className="mt-6">
              {/* Tabs */}
              <div className="inline-flex rounded-lg bg-white/5 p-1 mb-5">
                <TabPill id="resumen" current={tab} setTab={handleSetTab}>
                  Resumen
                </TabPill>
                <TabPill id="config" current={tab} setTab={handleSetTab}>
                  Configuración
                </TabPill>
                <TabPill id="seguridad" current={tab} setTab={handleSetTab}>
                  Seguridad
                </TabPill>
              </div>

              {/* Contenido tabs */}
              <div className="mt-2 space-y-6">
                {/* -------- RESUMEN -------- */}
                {tab === "resumen" &&
                  (detailPanelId ? (
                    <DetailPanel
                      id={detailPanelId}
                      onBack={() => setDetailPanelId(null)}
                      overview={overview}
                      user={user}
                      currency={currency}
                      isVerified={isVerified}
                      totalSpent={totalSpent}
                      totalOrders={totalOrders}
                    />
                  ) : (
                    <>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold mb-1">
                            Resumen de tu cuenta
                          </h3>
                          <p className="text-gray-400 text-sm">
                            Actividad general, pedidos y nivel de gasto.
                          </p>
                        </div>
                        {loadingOverview && (
                          <p className="text-xs text-gray-500">
                            Actualizando información…
                          </p>
                        )}
                      </div>

                      {/* métricas principales */}
                      <div className="grid gap-3 md:grid-cols-3">
                        <InfoCard
                          label="Estado"
                          value={isVerified ? "Verificado" : "No verificado"}
                          highlight={
                            isVerified ? "text-sky-400" : "text-amber-400"
                          }
                          variant="compact"
                          onClick={() => setDetailPanelId("estado_cuenta")}
                        />
                        <InfoCard
                          label="Pedidos totales"
                          value={String(totalOrders)}
                          variant="compact"
                          onClick={() => setDetailPanelId("pedidos_totales")}
                        />
                        <InfoCard
                          label="Gasto total estimado"
                          value={
                            overview
                              ? `${overview.totalSpent.toLocaleString(
                                  "es-CL"
                                )} ${overview.currency}`
                              : `0 ${currency}`
                          }
                          variant="compact"
                          onClick={() => setDetailPanelId("gasto_total")}
                        />
                      </div>

                      {/* historial de pedidos: card-botón */}
                      <button
                        type="button"
                        className="w-full text-left rounded-lg border border-white/10 bg-white/5 p-3 md:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:border-sky-400/60 hover:bg-sky-500/5 transition cursor-pointer"
                        onClick={() => setDetailPanelId("historial_pedidos")}
                      >
                        <div className="space-y-1">
                          <p className="text-sm font-semibold">
                            Historial de pedidos
                          </p>
                          <p className="text-xs text-gray-400">
                            {hasOrders && lastOrder
                              ? "Revisa tus últimas compras en LunaraTech."
                              : "Aún no has realizado compras."}
                          </p>
                          <p className="text-sm text-gray-200">
                            {hasOrders && lastOrder ? (
                              <>
                                Último pedido:{" "}
                                <span className="font-medium">
                                  #{lastOrder.id}
                                </span>{" "}
                                · {lastOrder.date} · {lastOrder.total}
                              </>
                            ) : (
                              "Cuando compres, tus pedidos aparecerán aquí."
                            )}
                          </p>
                        </div>
                        <div className="flex flex-col items-start sm:items-end gap-2">
                          <span className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium border border-white/15 text-gray-400">
                            Ver detalle del historial
                          </span>
                        </div>
                      </button>

                      {/* card larga de nivel Lunara */}
                      <LunaraLevelCard
                        current={current}
                        next={next}
                        currency={currency}
                        remainingToNext={remainingToNext}
                        progressToNext={progressToNext}
                        totalSpent={totalSpent}
                        totalOrders={totalOrders}
                        onSelectTier={() => handleTierClick(current.id)}
                        onOpenInfo={() => setShowTierInfo(true)}
                        onOpenDetail={() => setDetailPanelId("nivel_lunara")}
                      />
                    </>
                  ))}

                {/* -------- CONFIGURACIÓN -------- */}
                {tab === "config" &&
                  (detailPanelId ? (
                    <DetailPanel
                      id={detailPanelId}
                      onBack={() => setDetailPanelId(null)}
                      overview={overview}
                      user={user}
                      currency={currency}
                      isVerified={isVerified}
                      totalSpent={totalSpent}
                      totalOrders={totalOrders}
                    />
                  ) : (
                    <>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">
                          Preferencias de la cuenta
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Ajusta cómo quieres usar LUNARATECH. Más adelante
                          estas opciones se guardarán en tu perfil y
                          dispositivos.
                        </p>
                      </div>

                      <div className="space-y-6">
                        {/* Apariencia y experiencia */}
                        <section className="space-y-3">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
                              Apariencia y experiencia
                            </p>
                            <span className="text-[11px] text-gray-500">
                              Se aplican solo a tu cuenta
                            </span>
                          </div>
                          <div className="grid gap-3 md:grid-cols-2">
                            <ConfigRow
                              title="Tema de la interfaz"
                              description="Controla el modo oscuro / claro en el sitio."
                              value="Modo oscuro (recomendado)"
                              badge="Activo"
                              badgeTone="success"
                              onClick={() => setDetailPanelId("tema")}
                            />
                            <ConfigRow
                              title="Animaciones y efectos"
                              description="Transiciones, sombras y efectos visuales de Lunara."
                              value="Efectos suaves Lunara"
                              badge="Pronto"
                              badgeTone="muted"
                              onClick={() => setDetailPanelId("animaciones")}
                            />
                          </div>
                        </section>

                        {/* Región e idioma */}
                        <section className="space-y-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
                            Región e idioma
                          </p>
                          <div className="grid gap-3 md:grid-cols-2">
                            <ConfigRow
                              title="País y moneda"
                              description="Mostramos precios, impuestos y contenido adaptado a tu ubicación."
                              value={`Chile · ${currency}`}
                              badge="Principal"
                              badgeTone="default"
                              onClick={() => setDetailPanelId("pais_moneda")}
                            />
                            <ConfigRow
                              title="Idioma de la experiencia"
                              description="Textos y contenido principal del sitio."
                              value="Español (Latam)"
                              badge="Configurado"
                              badgeTone="success"
                              onClick={() => setDetailPanelId("idioma")}
                            />
                          </div>
                        </section>

                        {/* Comunicaciones y privacidad */}
                        <section className="space-y-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
                            Comunicaciones y privacidad
                          </p>
                          <div className="grid gap-3 md:grid-cols-2">
                            <ConfigRow
                              title="Comunicaciones"
                              description="Noticias, lanzamientos y ofertas especiales."
                              value="Suscripción pendiente"
                              badge="Pronto"
                              badgeTone="warning"
                              onClick={() =>
                                setDetailPanelId("comunicaciones")
                              }
                            />
                            <ConfigRow
                              title="Privacidad y datos"
                              description="Descargar o borrar datos de tu cuenta de LunaraTech."
                              value="Herramientas de privacidad disponibles próximamente."
                              badge="Próximamente"
                              badgeTone="muted"
                              onClick={() =>
                                setDetailPanelId("privacidad_datos")
                              }
                            />
                          </div>
                        </section>
                      </div>
                    </>
                  ))}

                {/* -------- SEGURIDAD -------- */}
                {tab === "seguridad" &&
                  (detailPanelId ? (
                    <DetailPanel
                      id={detailPanelId}
                      onBack={() => setDetailPanelId(null)}
                      overview={overview}
                      user={user}
                      currency={currency}
                      isVerified={isVerified}
                      totalSpent={totalSpent}
                      totalOrders={totalOrders}
                    />
                  ) : (
                    <>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">
                          Seguridad y acceso
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Estás usando inicio de sesión con Google. Más
                          adelante podrás ver sesiones activas, dispositivos
                          conectados y verificación avanzada.
                        </p>
                      </div>

                      <div className="grid gap-3 md:grid-cols-2">
                        {/* Estado de verificación */}
                        <div
                          className="rounded-lg border border-sky-500/40 bg-sky-500/10 p-4 cursor-pointer hover:border-sky-300"
                          onClick={() =>
                            setDetailPanelId("estado_verificacion")
                          }
                        >
                          <p className="text-sm font-semibold mb-1">
                            Estado de verificación
                          </p>
                          <p className="text-gray-100 text-sm mb-2">
                            Actualmente tu cuenta aparece como{" "}
                            <span className="font-semibold">
                              {isVerified ? "verificada" : "no verificada"}
                            </span>{" "}
                            porque iniciaste sesión con Google.
                          </p>
                          <p className="text-xs text-sky-100/80">
                            En el futuro podrás completar una verificación
                            adicional (teléfono, identidad, etc.) para acceder a
                            límites de compra más altos y funciones extra.
                          </p>
                        </div>

                        {/* Sesión actual */}
                        <div
                          className="rounded-lg border border-white/10 bg-white/5 p-4 cursor-pointer hover:border-sky-400/60 hover:bg-sky-500/5"
                          onClick={() => setDetailPanelId("sesion_actual")}
                        >
                          <p className="text-sm font-semibold mb-1">
                            Sesión actual
                          </p>
                          <p className="text-gray-300 text-sm mb-2">
                            Iniciaste sesión como{" "}
                            <span className="font-mono">{user?.email}</span>{" "}
                            usando Google.
                          </p>
                          <p className="text-xs text-gray-400">
                            Navegador: sesión actual en este dispositivo.
                          </p>
                        </div>

                        {/* Sesiones y dispositivos */}
                        <div
                          className="rounded-lg border border-white/10 bg-white/5 p-4 cursor-pointer hover:border-sky-400/60 hover:bg-sky-500/5"
                          onClick={() =>
                            setDetailPanelId("sesiones_dispositivos")
                          }
                        >
                          <p className="text-sm font-semibold mb-1">
                            Sesiones y dispositivos
                          </p>
                          <p className="text-gray-300 text-sm mb-3">
                            En el futuro verás aquí otros dispositivos con
                            sesión iniciada para cerrar acceso remoto.
                          </p>
                          <p className="text-xs text-gray-500">
                            Por ahora, solo se gestiona la sesión actual.
                          </p>
                        </div>

                        {/* Cerrar sesión actual */}
                        <div className="rounded-lg border border-yellow-500/40 bg-yellow-500/10 p-4 md:col-span-2">
                          <p className="text-sm font-semibold mb-1">
                            Cerrar sesión actual
                          </p>
                          <p className="text-gray-200 text-sm mb-3">
                            Si sospechas actividad extraña, puedes cerrar tu
                            sesión en este navegador.
                          </p>
                          <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="px-4 py-2 rounded-full text-sm font-semibold bg-red-600 hover:bg-red-700 transition"
                          >
                            Cerrar sesión ahora
                          </button>
                        </div>
                      </div>
                    </>
                  ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Modal con info de niveles */}
      {showTierInfo && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-4">
          <div className="max-w-2xl w-full rounded-xl bg-[#020617] border border-white/10 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Niveles Lunara</h2>
              <button
                onClick={() => setShowTierInfo(false)}
                className="text-sm text-gray-400 hover:text-gray-200"
              >
                Cerrar
              </button>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Tus niveles Lunara se calculan según el{" "}
              <span className="font-semibold">gasto total acumulado</span> en la
              tienda (y, más adelante, misiones especiales).
            </p>

            <div className="grid gap-3 max-h-[60vh] overflow-y-auto pr-1 md:grid-cols-2">
              {LUNARA_TIERS.map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => handleTierClick(tier.id)}
                  className="text-left rounded-lg border border-white/10 bg-black/50 p-3 md:p-4 flex flex-col gap-2 hover:border-sky-400/70 hover:bg-sky-500/5 transition cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col gap-1">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-[2px] text-[11px] font-semibold text-white ${tier.badgeColor}`}
                      >
                        {tier.label}
                      </span>
                      <span className="text-[11px] text-gray-400">
                        Desde {tier.min.toLocaleString("es-CL")} CLP
                      </span>
                    </div>
                    {tier.id === current.id && (
                      <span className="text-[11px] text-sky-400 font-medium">
                        Nivel actual
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-300">{tier.description}</p>

                  <ul className="text-[11px] text-gray-400 list-disc list-inside space-y-0.5">
                    {tier.perks.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>

            <p className="text-[11px] text-gray-500 mt-4">
              Nota: Los beneficios específicos (descuentos, envíos u otros)
              pueden ajustarse en el futuro a medida que lancemos nuevas
              funciones.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

/* ---------- Panel de detalle a pantalla completa dentro del marco ---------- */

function DetailPanel({
  id,
  onBack,
  overview,
  user,
  currency,
  isVerified,
  totalSpent,
  totalOrders,
}: {
  id: DetailPanelId;
  onBack: () => void;
  overview: AccountOverview | null;
  user: any;
  currency: string;
  isVerified: boolean;
  totalSpent: number;
  totalOrders: number;
}) {
  // Historial de pedidos
  if (id === "historial_pedidos") {
    const orders = overview?.lastOrders ?? [];

    return (
      <div className="rounded-lg border border-white/10 bg-black/70 p-4 md:p-5 mt-2">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-2 py-1 text-[11px] text-gray-200 hover:bg-white/10"
          >
            ← Volver
          </button>
          <h4 className="text-sm font-semibold">Historial de pedidos</h4>
        </div>

        {orders.length === 0 ? (
          <p className="text-xs text-gray-200">
            Aún no has comprado. Cuando realices tus primeros pedidos, esta
            sección mostrará un resumen de tus compras: fechas, estados y montos
            finales.
          </p>
        ) : (
          <>
            <p className="text-xs text-gray-200 mb-3">
              Vista simplificada de tus últimos pedidos registrados en tu Cuenta
              Lunara.
            </p>
            <div className="grid grid-cols-4 text-[11px] text-gray-300 border-b border-white/10 pb-1">
              <span>ID</span>
              <span>Fecha</span>
              <span>Estado</span>
              <span className="text-right">Total</span>
            </div>
            <div className="space-y-1.5 mt-1">
              {orders.map((o) => (
                <div
                  key={o.id}
                  className="grid grid-cols-4 text-[11px] text-gray-100 items-center"
                >
                  <span className="font-mono">#{o.id}</span>
                  <span>{o.date}</span>
                  <span className="text-xs">{o.status}</span>
                  <span className="text-right">{o.total}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-gray-300 mt-3">
              Más adelante podrás entrar a cada pedido, ver detalle de
              productos, métodos de pago y descargas de boleta directamente
              desde aquí.
            </p>
          </>
        )}
      </div>
    );
  }

  // Tema de la interfaz (descripción)
  if (id === "tema") {
    return (
      <div className="rounded-lg border border-white/10 bg-black/70 p-4 md:p-5 mt-2">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-2 py-1 text-[11px] text-gray-200 hover:bg-white/10"
          >
            ← Volver
          </button>
          <h4 className="text-sm font-semibold">Tema de la interfaz</h4>
        </div>

        <p className="text-xs text-gray-200 mb-3">
          Esta sección controla el{" "}
          <span className="font-semibold">modo oscuro / claro</span> de
          LUNARATECH. Por ahora el sitio funciona en modo oscuro, que es el
          recomendado para la experiencia Lunara.
        </p>

        <ul className="text-[11px] text-gray-300 list-disc list-inside mb-3">
          <li>
            <span className="font-semibold">Modo oscuro:</span> colores
            profundos, foco en el contenido y coherencia con la estética
            Lunara.
          </li>
          <li>
            <span className="font-semibold">Modo claro:</span> pensado para
            quienes prefieren fondos claros o trabajan en entornos muy
            iluminados.
          </li>
        </ul>

        <p className="text-[11px] text-gray-300">
          Más adelante podrás cambiar el tema desde aquí y el ajuste quedará
          guardado en tu cuenta para aplicarse automáticamente en todos tus
          dispositivos.
        </p>
      </div>
    );
  }

  // Estado general de la cuenta
  if (id === "estado_cuenta") {
    return (
      <div className="rounded-lg border border-white/10 bg-black/70 p-4 md:p-5 mt-2">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-2 py-1 text-[11px] text-gray-200 hover:bg-white/10"
          >
            ← Volver
          </button>
          <h4 className="text-sm font-semibold">Estado de la cuenta</h4>
        </div>
        <p className="text-xs text-gray-200 mb-2">
          Tu Cuenta Lunara está actualmente{" "}
          <span className="font-semibold">
            {isVerified ? "verificada" : "no verificada"}
          </span>{" "}
          mediante inicio de sesión con Google.
        </p>
        <ul className="text-[11px] text-gray-300 list-disc list-inside mb-3">
          <li>Inicio de sesión federado (Google).</li>
          <li>Sin bloqueos ni restricciones registradas.</li>
          <li>
            Historial de pedidos y preferencias se agrupan bajo esta misma
            cuenta.
          </li>
        </ul>
        <p className="text-[11px] text-gray-300">
          Aquí se mostrarán en el futuro avisos importantes sobre tu cuenta:
          bloqueos por seguridad, límites temporales, cambios críticos de datos
          y más.
        </p>
      </div>
    );
  }

  // Pedidos totales (resumen)
  if (id === "pedidos_totales") {
    return (
      <div className="rounded-lg border border-white/10 bg-black/70 p-4 md:p-5 mt-2">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-2 py-1 text-[11px] text-gray-200 hover:bg-white/10"
          >
            ← Volver
          </button>
          <h4 className="text-sm font-semibold">Pedidos totales</h4>
        </div>
        <p className="text-xs text-gray-200 mb-1">
          Has realizado{" "}
          <span className="font-semibold">{totalOrders}</span> pedidos con tu
          Cuenta Lunara.
        </p>
        <p className="text-[11px] text-gray-300 mb-2">
          Esta sección resume cuántas compras has hecho en la tienda,
          independientemente de los métodos de pago usados o los productos
          comprados.
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-gray-300">
          <div className="rounded-md border border-white/15 bg-black/60 p-2">
            <p className="font-semibold mb-1">Pedidos registrados</p>
            <p>
              <span className="font-mono">{totalOrders}</span> pedidos totales
              asociados a esta cuenta.
            </p>
          </div>
          <div className="rounded-md border border-white/15 bg-black/60 p-2">
            <p className="font-semibold mb-1">Lo que verás después</p>
            <p>
              Distribución por año, estados de compra y tipos de productos
              comprados.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Gasto total (detalle)
  if (id === "gasto_total") {
    return (
      <div className="rounded-lg border border-white/10 bg-black/70 p-4 md:p-5 mt-2">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-2 py-1 text-[11px] text-gray-200 hover:bg-white/10"
          >
            ← Volver
          </button>
          <h4 className="text-sm font-semibold">Gasto total estimado</h4>
        </div>
        <p className="text-xs text-gray-200 mb-1">
          Monto acumulado aproximado de todas tus compras:
        </p>
        <p className="text-sm font-semibold text-white mb-2">
          {totalSpent.toLocaleString("es-CL")} {currency}
        </p>
        <p className="text-[11px] text-gray-300 mb-2">
          Esta cifra considera todo lo que has invertido en LunaraTech desde que
          comenzaste a usar tu cuenta.
        </p>
        <ul className="text-[11px] text-gray-300 list-disc list-inside">
          <li>
            Permitirá calcular tu{" "}
            <span className="font-semibold">nivel Lunara</span>.
          </li>
          <li>
            Servirá para estadísticas futuras: gasto promedio, gasto anual, etc.
          </li>
          <li>No incluye aún reembolsos o ajustes avanzados.</li>
        </ul>
      </div>
    );
  }

  // Nivel Lunara (detalle)
  if (id === "nivel_lunara") {
    return (
      <div className="rounded-lg border border-white/10 bg-black/70 p-4 md:p-5 mt-2">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-2 py-1 text-[11px] text-gray-200 hover:bg-white/10"
          >
            ← Volver
          </button>
          <h4 className="text-sm font-semibold">Nivel Lunara</h4>
        </div>
        <p className="text-xs text-gray-200 mb-2">
          Tu nivel Lunara se define según el{" "}
          <span className="font-semibold">gasto acumulado</span> en la tienda y,
          en el futuro, por misiones especiales y participación en el
          ecosistema Lunara.
        </p>
        <ul className="text-[11px] text-gray-300 list-disc list-inside mb-2">
          <li>Starter · desde 0 CLP</li>
          <li>Member · desde 50.000 CLP</li>
          <li>Pro · desde 300.000 CLP</li>
          <li>Elite · desde 1.500.000 CLP</li>
        </ul>
        <p className="text-[11px] text-gray-300">
          Aquí verás tu progreso exacto, beneficios activos, perks especiales y
          próximos hitos de nivel sin salir de tu perfil. También podrás
          revisar cómo se calcula ese nivel con detalle.
        </p>
      </div>
    );
  }

  // País y moneda (descripción)
  if (id === "pais_moneda") {
    return (
      <div className="rounded-lg border border-white/10 bg-black/70 p-4 md:p-5 mt-2">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-2 py-1 text-[11px] text-gray-200 hover:bg-white/10"
          >
            ← Volver
          </button>
          <h4 className="text-sm font-semibold">País y moneda</h4>
        </div>
        <p className="text-xs text-gray-200 mb-2">
          Esta sección define desde qué{" "}
          <span className="font-semibold">región</span> navegas y en qué{" "}
          <span className="font-semibold">moneda</span> te mostramos los
          precios.
        </p>

        <ul className="text-[11px] text-gray-300 list-disc list-inside mb-3">
          <li>
            País actual de ejemplo: <span className="font-semibold">Chile</span>
            .
          </li>
          <li>
            Moneda de ejemplo:{" "}
            <span className="font-semibold">CLP (peso chileno)</span>.
          </li>
          <li>
            Afecta cómo se muestran precios, posibles impuestos y métodos de
            envío.
          </li>
        </ul>

        <p className="text-[11px] text-gray-300">
          Más adelante podrás elegir aquí tu país principal y la moneda en la
          que quieres ver todos los productos. El cambio se guardará para que la
          tienda siempre se adapte a tu región favorita.
        </p>
      </div>
    );
  }

  // Idioma (descripción)
  if (id === "idioma") {
    return (
      <div className="rounded-lg border border-white/10 bg-black/70 p-4 md:p-5 mt-2">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-2 py-1 text-[11px] text-gray-200 hover:bg-white/10"
          >
            ← Volver
          </button>
          <h4 className="text-sm font-semibold">Idioma de la experiencia</h4>
        </div>
        <p className="text-xs text-gray-200 mb-2">
          Aquí definirás en qué{" "}
          <span className="font-semibold">idioma</span> quieres ver todos los
          textos de LUNARATECH.
        </p>

        <ul className="text-[11px] text-gray-300 list-disc list-inside mb-3">
          <li>Español (Latam) como idioma principal por defecto.</li>
          <li>
            Futuro soporte para Español (España), Inglés y otros idiomas.
          </li>
          <li>
            El idioma seleccionado se aplicará al sitio, correos y mensajes
            clave.
          </li>
        </ul>

        <p className="text-[11px] text-gray-300">
          Más adelante podrás cambiar el idioma desde aquí y el ajuste se
          guardará en tu cuenta para que, sin importar el dispositivo, veas
          siempre la experiencia en tu idioma preferido.
        </p>
      </div>
    );
  }

  // Animaciones (descripción)
  if (id === "animaciones") {
    return (
      <div className="rounded-lg border border-white/10 bg-black/70 p-4 md:p-5 mt-2">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-2 py-1 text-[11px] text-gray-200 hover:bg-white/10"
          >
            ← Volver
          </button>
          <h4 className="text-sm font-semibold">Animaciones y efectos</h4>
        </div>
        <p className="text-xs text-gray-200 mb-2">
          Este ajuste controla qué tan intensas serán las{" "}
          <span className="font-semibold">animaciones, sombras y efectos</span>{" "}
          dentro de Lunara.
        </p>

        <ul className="text-[11px] text-gray-300 list-disc list-inside mb-3">
          <li>
            <span className="font-semibold">Efectos suaves Lunara:</span>{" "}
            transiciones fluidas, brillos suaves y sensación de “espacio
            futurista”.
          </li>
          <li>
            <span className="font-semibold">Animaciones mínimas:</span> ideal
            para equipos más lentos o personas que prefieren interfaces más
            estáticas.
          </li>
        </ul>

        <p className="text-[11px] text-gray-300">
          Cuando la sección esté activa, lo que elijas aquí se aplicará a todo
          el sitio: cards, modales, paneles y efectos visuales generales.
        </p>
      </div>
    );
  }

  // Comunicaciones (descripción)
  if (id === "comunicaciones") {
    return (
      <div className="rounded-lg border border-white/10 bg-black/70 p-4 md:p-5 mt-2">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-2 py-1 text-[11px] text-gray-200 hover:bg-white/10"
          >
            ← Volver
          </button>
          <h4 className="text-sm font-semibold">Comunicaciones</h4>
        </div>
        <p className="text-xs text-gray-200 mb-2">
          Aquí podrás decidir qué tipo de{" "}
          <span className="font-semibold">correos y notificaciones</span> quieres
          recibir de LunaraTech.
        </p>

        <ul className="text-[11px] text-gray-300 list-disc list-inside mb-3">
          <li>Noticias generales y lanzamientos de nuevos productos.</li>
          <li>Ofertas, cupones y promociones especiales.</li>
          <li>Encuestas, feedback y mejoras del sitio.</li>
        </ul>

        <p className="text-[11px] text-gray-300">
          Cuando esté activo, podrás activar o desactivar cada tipo de
          comunicación con simples interruptores, y respetaremos esas
          preferencias en todos tus correos.
        </p>
      </div>
    );
  }

  // Privacidad y datos (descripción)
  if (id === "privacidad_datos") {
    return (
      <div className="rounded-lg border border-white/10 bg-black/70 p-4 md:p-5 mt-2">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-2 py-1 text-[11px] text-gray-200 hover:bg-white/10"
          >
            ← Volver
          </button>
          <h4 className="text-sm font-semibold">Privacidad y datos</h4>
        </div>
        <p className="text-xs text-gray-200 mb-2">
          Esta sección agrupa todas las herramientas relacionadas con{" "}
          <span className="font-semibold">tus datos personales</span> en
          LunaraTech.
        </p>

        <ul className="text-[11px] text-gray-300 list-disc list-inside mb-3">
          <li>Solicitar una copia descargable de tus datos.</li>
          <li>Pedir eliminación de tu cuenta y su información asociada.</li>
          <li>Revisar qué información guardamos y por qué.</li>
        </ul>

        <p className="text-[11px] text-gray-300">
          Cuando esta sección esté activa, todas las solicitudes se gestionarán
          desde aquí mismo, siguiendo buenas prácticas de privacidad y la
          normativa vigente.
        </p>
      </div>
    );
  }

  // Seguridad: verificación
  if (id === "estado_verificacion") {
    return (
      <div className="rounded-lg border border-white/10 bg-black/70 p-4 md:p-5 mt-2">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-2 py-1 text-[11px] text-gray-200 hover:bg-white/10"
          >
            ← Volver
          </button>
          <h4 className="text-sm font-semibold">Estado de verificación</h4>
        </div>
        <p className="text-xs text-gray-200 mb-2">
          Tu cuenta se considera{" "}
          <span className="font-semibold">
            {isVerified ? "verificada" : "no verificada"}
          </span>{" "}
          porque usas inicio de sesión con Google.
        </p>
        <p className="text-[11px] text-gray-300 mb-2">
          En el futuro habilitaremos métodos adicionales de seguridad, como:
        </p>
        <ul className="text-[11px] text-gray-300 list-disc list-inside">
          <li>Verificación en dos pasos (2FA).</li>
          <li>Verificación por teléfono.</li>
          <li>Autorización especial para compras grandes o sensibles.</li>
        </ul>
      </div>
    );
  }

  // Seguridad: sesión actual
  if (id === "sesion_actual") {
    return (
      <div className="rounded-lg border border-white/10 bg-black/70 p-4 md:p-5 mt-2">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-2 py-1 text-[11px] text-gray-200 hover:bg-white/10"
          >
            ← Volver
          </button>
          <h4 className="text-sm font-semibold">Sesión actual</h4>
        </div>
        <p className="text-xs text-gray-200 mb-1">
          Estás conectado como{" "}
          <span className="font-mono">{user?.email ?? "usuario@lunara"}</span>.
        </p>
        <p className="text-[11px] text-gray-300 mb-2">
          Esta sección mostrará información relevante sobre la sesión que estás
          usando ahora mismo.
        </p>
        <div className="grid gap-2 text-[11px] text-gray-300">
          <div className="rounded-md border border-white/15 bg-black/60 p-2">
            <p className="font-semibold mb-1">Ejemplos de datos</p>
            <p>Navegador, sistema operativo y zona horaria aproximada.</p>
          </div>
          <div className="rounded-md border border-white/15 bg-black/60 p-2">
            <p className="font-semibold mb-1">Uso esperado</p>
            <p>
              Confirmar que eres tú quien está usando la cuenta y detectar
              accesos raros.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Seguridad: sesiones y dispositivos
  if (id === "sesiones_dispositivos") {
    return (
      <div className="rounded-lg border border-white/10 bg-black/70 p-4 md:p-5 mt-2">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-2 py-1 text-[11px] text-gray-200 hover:bg-white/10"
          >
            ← Volver
          </button>
          <h4 className="text-sm font-semibold">Sesiones y dispositivos</h4>
        </div>
        <p className="text-xs text-gray-200 mb-2">
          Aquí verás un listado de{" "}
          <span className="font-semibold">todos los dispositivos</span> donde
          tienes la sesión iniciada con tu Cuenta Lunara.
        </p>

        <div className="space-y-2 text-[11px] text-gray-300">
          <div className="rounded-md border border-white/15 bg-black/60 p-2 flex justify-between">
            <div>
              <p className="font-semibold">Este dispositivo</p>
              <p>Sesión activa (ejemplo: Chrome en Windows).</p>
            </div>
            <span className="px-2 py-[2px] rounded-full border border-emerald-400/70 text-emerald-200">
              Actual
            </span>
          </div>
          <div className="rounded-md border border-white/15 bg-black/30 p-2 opacity-70">
            <p className="font-semibold">Otros dispositivos</p>
            <p>
              Se mostrarán aquí con la opción de cerrar sesión en cada uno de
              ellos.
            </p>
          </div>
        </div>

        <p className="text-[11px] text-gray-300 mt-2">
          La idea es que, si pierdes el acceso a un equipo o notas algo raro,
          puedas cortar sesiones remotas desde este mismo panel.
        </p>
      </div>
    );
  }

  // Fallback genérico
  return (
    <div className="rounded-lg border border-white/10 bg-black/70 p-4 md:p-5 mt-2">
      <div className="flex items-center gap-3 mb-2">
        <button
          onClick={onBack}
          className="inline-flex items-center justify-center rounded-full border border-white/20 px-2 py-1 text-[11px] text-gray-200 hover:bg-white/10"
        >
          ← Volver
        </button>
        <h4 className="text-sm font-semibold">Sección en construcción</h4>
      </div>
      <p className="text-[11px] text-gray-300">
        Esta sección todavía no tiene un panel de detalle definido, pero ya está
        conectada al sistema de Cuenta Lunara.
      </p>
    </div>
  );
}

/* ---------- componentes internos ---------- */

function TabPill({
  id,
  current,
  setTab,
  children,
}: {
  id: TabId;
  current: TabId;
  setTab: (t: TabId) => void;
  children: ReactNode;
}) {
  const active = current === id;
  return (
    <button
      onClick={() => setTab(id)}
      className={[
        "px-4 py-1.5 rounded-md text-sm font-medium transition",
        active
          ? "bg-sky-500 text-black shadow-md"
          : "text-gray-300 hover:bg-white/10",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function InfoCard({
  label,
  value,
  highlight,
  variant = "default",
  onClick,
}: {
  label: string;
  value: string;
  highlight?: string;
  variant?: "default" | "compact";
  onClick?: () => void;
}) {
  const containerPadding = variant === "compact" ? "p-3" : "p-4";
  const labelText = variant === "compact" ? "text-[11px]" : "text-xs";
  const valueText =
    variant === "compact" ? "text-sm md:text-base" : "text-base";

  const clickable = !!onClick;

  return (
    <div
      onClick={onClick}
      className={[
        "rounded-lg border border-white/10 bg-white/5",
        containerPadding,
        clickable
          ? "cursor-pointer hover:border-sky-400/60 hover:bg-sky-500/5"
          : "",
      ].join(" ")}
    >
      <p className={`${labelText} text-gray-400 mb-1`}>{label}</p>
      <p className={`${valueText} font-semibold ${highlight ?? ""}`}>
        {value}
      </p>
    </div>
  );
}

function LunaraLevelCard({
  current,
  next,
  currency,
  remainingToNext,
  progressToNext,
  totalSpent,
  totalOrders,
  onSelectTier,
  onOpenInfo,
  onOpenDetail,
}: {
  current: Tier;
  next: Tier | null;
  currency: string;
  remainingToNext: number | null;
  progressToNext: number;
  totalSpent: number;
  totalOrders: number;
  onSelectTier: () => void;
  onOpenInfo: () => void;
  onOpenDetail: () => void;
}) {
  return (
    <div
      className="rounded-lg border border-white/10 bg-white/5 p-4 md:p-5 cursor-pointer hover:border-sky-400/60 hover:bg-sky-500/5"
      onClick={onOpenDetail}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
        <div className="space-y-1">
          <p className="text-xs text-gray-400 flex items-center gap-1">
            Nivel Lunara
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenInfo();
              }}
              className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/30 text-[10px] text-gray-200 hover:bg-white/10"
              aria-label="Ver todos los niveles Lunara"
              type="button"
            >
              ?
            </button>
          </p>
          <p className="text-sm text-gray-300">
            Tu nivel Lunara se calcula según tu gasto total acumulado en la
            tienda.
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectTier();
            }}
            className={`inline-flex items-center rounded-full px-3 py-[3px] text-[11px] font-semibold text-white ${current.badgeColor} hover:ring-2 hover:ring-sky-400/60 transition`}
          >
            {current.label}
          </button>
          <p className="text-[11px] text-gray-400">
            {next && remainingToNext !== null
              ? `Te faltan ${remainingToNext.toLocaleString(
                  "es-CL"
                )} ${currency} para subir a ${next.label}.`
              : "Has alcanzado el nivel máximo disponible por ahora."}
          </p>
        </div>
      </div>

      <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
        <div
          className={`h-full rounded-full ${current.barColor}`}
          style={{ width: `${progressToNext}%` }}
        />
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2 text-[11px] text-gray-400">
        <p>
          Gasto total:{" "}
          <span className="font-semibold text-gray-200">
            {totalSpent.toLocaleString("es-CL")} {currency}
          </span>
        </p>
        <p>
          Pedidos totales:{" "}
          <span className="font-semibold text-gray-200">{totalOrders}</span>
        </p>
      </div>

      <p className="text-[11px] text-gray-500 mt-2">
        Sumas nivel con tus compras y, en el futuro, con misiones especiales de
        LunaraTech.
      </p>
    </div>
  );
}

function ConfigRow({
  title,
  description,
  value,
  badge,
  badgeTone = "default",
  onClick,
}: {
  title: string;
  description: string;
  value: string;
  badge?: string;
  badgeTone?: "default" | "success" | "warning" | "muted";
  onClick?: () => void;
}) {
  const badgeClasses =
    badgeTone === "success"
      ? "border-emerald-400/60 text-emerald-200 bg-emerald-500/10"
      : badgeTone === "warning"
      ? "border-amber-400/60 text-amber-200 bg-amber-500/10"
      : badgeTone === "muted"
      ? "border-white/15 text-gray-300 bg-white/5"
      : "border-white/20 text-gray-200 bg-white/5";

  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg border border-white/10 bg-white/5 p-3 md:p-4 flex flex-col gap-2 h-full text-left hover:border-sky-400/60 hover:bg-sky-500/5 cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-xs text-gray-400">{description}</p>
        </div>
        {badge && (
          <span
            className={`inline-flex items-center rounded-full px-2 py-[2px] text-[11px] font-medium ${badgeClasses}`}
          >
            {badge}
          </span>
        )}
      </div>
      <p className="text-xs md:text-sm text-gray-200">{value}</p>
    </button>
  );
}
