import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[70vh] grid place-items-center bg-neutral-950 text-neutral-100 px-6 py-16">
      <div className="text-center space-y-6">
        <Image
          src="/astronaut-404.png"
          alt="Página no encontrada"
          width={612}
          height={408}
          priority
        />
        <h1 className="text-3xl font-semibold">Página no encontrada</h1>
        <p className="text-neutral-400">El enlace puede estar roto o la página fue movida.</p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/" className="rounded-md bg-neutral-800 px-4 py-2 hover:bg-neutral-700">
            Ir al inicio
          </Link>
          <Link href="/admin" className="rounded-md border border-neutral-700 px-4 py-2 hover:bg-neutral-700/50">
            Ir al panel
          </Link>
        </div>
      </div>
    </main>
  );
}
