import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Servicios: [
    { href: "/servicios/chatbots", label: "Chatbots & Agentes IA" },
    { href: "/servicios/web", label: "Desarrollo Web" },
    { href: "/servicios/flow", label: "Automatizaciones" },
    { href: "/servicios/academia", label: "Academia" },
  ],
  Empresa: [
    { href: "/sobre", label: "Sobre Arcode" },
    { href: "/casos", label: "Casos de Éxito" },
    { href: "/blog", label: "Blog" },
  ],
  Contacto: [
    { href: "/contacto", label: "Agenda una demo" },
    { href: "/academia", label: "Talleres" },
    { href: "https://linkedin.com", label: "LinkedIn", external: true },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#0a1628] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/images/arcode-logo-dark.jpeg"
                alt="Arcode"
                width={120}
                height={40}
                className="rounded-md object-contain"
              />
            </Link>
            <p className="text-sm text-white/60 leading-relaxed">
              IA y transformación digital para PYMEs colombianas. Armenia, Quindío.
            </p>
            <p className="text-xs text-white/40 mt-4">
              © {new Date().getFullYear()} Arcode. Todos los derechos reservados.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-sm font-semibold text-white/90 mb-4">{section}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target={"external" in link && link.external ? "_blank" : undefined}
                      rel={"external" in link && link.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
