export default function LoginPage() {
  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold">Iniciar sesión</h1>
      <form className="card mt-4 p-4 space-y-3">
        <label className="block">
          <span className="text-sm opacity-80">Email</span>
          <input className="mt-1 w-full rounded-md border px-3 py-2 bg-transparent" style={{borderColor:'var(--surface-border)'}} />
        </label>
        <label className="block">
          <span className="text-sm opacity-80">Contraseña</span>
          <input type="password" className="mt-1 w-full rounded-md border px-3 py-2 bg-transparent" style={{borderColor:'var(--surface-border)'}} />
        </label>
        <button className="mt-2 w-full rounded-lg bg-brand-600 hover:bg-brand-500 px-4 py-2 text-white">Entrar</button>
      </form>
    </main>
  );
}
