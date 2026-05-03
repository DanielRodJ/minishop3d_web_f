// src/features/shop/components/ShopFooter.tsx

import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

import { Link } from "react-router-dom";

const baseLink = "transition-colors text-sm";
const footerLink = `${baseLink} text-zinc-400 hover:text-orange-500`;
const navigationLink = `${footerLink} flex items-center gap-1 group`;

const navigationLinks = [
  { to: "/", label: "Inicio", highlight: true },
  { to: "/catalog", label: "Catálogo Completo" },
  { to: "/preorders", label: "Preventas" },
  { to: "/new", label: "Novedades" },
];

const infoLinks = [
  { to: "/terms", label: "Términos de Servicio" },
  { to: "/shipping", label: "Política de Envíos" },
  { to: "/faq", label: "Preguntas Frecuentes" },
  { to: "/privacy", label: "Aviso de Privacidad" },
];

export const ShopFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      aria-label="Pie de página"
      className="bg-zinc-950 text-white pt-16 pb-8 border-t border-zinc-800"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Columna 1: Branding y Contacto */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-orange-500 tracking-tighter">
            MINISHO<span className="text-white">3D</span>
          </h2>

          <p className="text-zinc-400 text-sm leading-relaxed">
            Bienvenido a Minisho3D, tu tienda en línea de miniaturas de confianza.
            Contáctanos para cualquier consulta, soporte o petición de producto.
          </p>

          <ul className="space-y-3 text-sm text-zinc-300">
            <li className="flex items-center gap-3">
              <MapPinIcon className="h-5 w-5 text-orange-500" />
              <span>Saltillo, Coahuila</span>
            </li>
            <li className="flex items-center gap-3">
              <PhoneIcon className="h-5 w-5 text-orange-500" />
              <span>+52 844 372 7975</span>
            </li>
            <li className="flex items-center gap-3">
              <EnvelopeIcon className="h-5 w-5 text-orange-500" />
              <span>minisholab3d@gmail.com</span>
            </li>
          </ul>
        </div>

        {/* Columna 2: Navegación */}
        <nav aria-label="Footer navigation">
          <h3 className="font-bold uppercase tracking-widest text-xs mb-6">
            Navegación
          </h3>

          <ul className="space-y-4">
            {navigationLinks.map(link => (
              <li key={link.to}>
                <Link to={link.to} className={navigationLink}>
                  {link.highlight && (
                    <ArrowRightIcon className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0" />
                  )}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Columna 3: Información */}
        <nav aria-label="Footer information">
          <h3 className="font-bold uppercase tracking-widest text-xs mb-6">
            Información
          </h3>

          <ul className="space-y-4">
            {infoLinks.map(link => (
              <li key={link.to}>
                <Link to={link.to} className={footerLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Columna 4: Newsletter */}
        <div>
          <h3 className="font-bold uppercase tracking-widest text-xs mb-6">
            Newsletter
          </h3>

          <p className="text-zinc-400 text-sm mb-4">
            Suscríbete para recibir alertas de restock y cupones.
          </p>

          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative">
              <EnvelopeIcon className="h-5 w-5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />

              {/* Accesibilidad */}
              <label htmlFor="newsletter-email" className="sr-only">
                Correo electrónico
              </label>

              <input
                id="newsletter-email"
                type="email"
                placeholder="Tu correo electrónico"
                className="w-full bg-zinc-900 border border-zinc-800 pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:border-orange-500 text-sm transition-colors"
              />
            </div>

            <button className="bg-orange-600 hover:bg-orange-500 py-2.5 rounded-lg font-bold text-sm transition-all active:scale-95 shadow-lg shadow-orange-900/20">
              Suscribirme
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-zinc-500 text-xs">
          © {currentYear} Minisho3D. Todos los derechos reservados.
        </p>

        <div className="flex items-center gap-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
          <span className="text-[10px] uppercase font-bold text-zinc-400">
            Pagos Seguros:
          </span>

          <div className="h-6 w-10 bg-zinc-800 rounded flex items-center justify-center text-[8px] font-bold">
            VISA
          </div>
          <div className="h-6 w-10 bg-zinc-800 rounded flex items-center justify-center text-[8px] font-bold">
            MC
          </div>
          <div className="h-6 w-10 bg-zinc-800 rounded flex items-center justify-center text-[8px] font-bold">
            PP
          </div>
        </div>
      </div>
    </footer>
  );
};