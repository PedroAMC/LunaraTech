export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        <div>
          <h4 className="mb-2 font-semibold">LunaraTech</h4>
          <ul className="space-y-1 text-white/80">
            <li>Sobre nosotros</li>
            <li>Contacto</li>
            <li>Preguntas frecuentes</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2 font-semibold">Tienda</h4>
          <ul className="space-y-1 text-white/80">
            <li>Periféricos</li>
            <li>Accesorios</li>
            <li>Almacenamiento</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2 font-semibold">Ayuda</h4>
          <ul className="space-y-1 text-white/80">
            <li>Envíos</li>
            <li>Devoluciones</li>
            <li>Garantía</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2 font-semibold">Redes</h4>
          <ul className="space-y-1 text-white/80">
            <li>Instagram</li>
            <li>TikTok</li>
            <li>WhatsApp</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
