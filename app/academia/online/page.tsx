import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Play, BookOpen, Laptop } from "lucide-react";

export const metadata: Metadata = {
  title: "Formación Online — Academia Arcode",
  description:
    "Aprende IA y automatización a tu ritmo con contenido digital de Arcode. Videos, guías y recursos para empresarios colombianos.",
};

export default function AcademiaOnlinePage() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[#2563eb] uppercase tracking-wide mb-3">
            Academia Arcode
          </p>
          <h1
            className="text-3xl md:text-5xl font-bold text-[#0f172a] mb-4"
            style={{ fontFamily: "var(--font-geist)" }}
          >
            Aprende IA a tu ritmo
          </h1>
          <p className="text-lg text-[#64748b] max-w-2xl mx-auto mb-8">
            Contenido digital diseñado para empresarios colombianos que quieren entender y aplicar IA
            en su negocio, sin depender de un técnico.
          </p>
          <a
            href="https://wa.me/573000000000?text=Hola%2C%20quiero%20saber%20más%20sobre%20la%20formación%20online%20de%20Arcode"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[#2563eb] text-white rounded-full px-6 py-3 font-medium hover:bg-[#1d4ed8] transition-colors"
          >
            Quiero acceso anticipado
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>

        {/* What's coming */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm">
            <Play className="h-8 w-8 text-[#2563eb] mb-4" />
            <h3
              className="font-semibold text-[#0f172a] mb-2"
              style={{ fontFamily: "var(--font-geist)" }}
            >
              Video-lecciones prácticas
            </h3>
            <p className="text-sm text-[#64748b] leading-relaxed">
              Módulos cortos con ejemplos reales de restaurantes, spas y profesionales colombianos.
              Aprende en menos de 20 minutos por sesión.
            </p>
          </div>

          <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm">
            <BookOpen className="h-8 w-8 text-[#2563eb] mb-4" />
            <h3
              className="font-semibold text-[#0f172a] mb-2"
              style={{ fontFamily: "var(--font-geist)" }}
            >
              Guías descargables
            </h3>
            <p className="text-sm text-[#64748b] leading-relaxed">
              Templates y checklists listos para implementar en tu negocio desde el primer día.
              Sin necesidad de configuración técnica.
            </p>
          </div>

          <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm">
            <Laptop className="h-8 w-8 text-[#2563eb] mb-4" />
            <h3
              className="font-semibold text-[#0f172a] mb-2"
              style={{ fontFamily: "var(--font-geist)" }}
            >
              Acceso permanente
            </h3>
            <p className="text-sm text-[#64748b] leading-relaxed">
              El contenido es tuyo para siempre. Revisítalo cuando lances un nuevo servicio
              o quieras automatizar un proceso diferente.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#0a1628] rounded-2xl p-10 text-center">
          <h2
            className="text-2xl md:text-3xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-geist)" }}
          >
            La plataforma online llega pronto
          </h2>
          <p className="text-[#94a3b8] mb-8 max-w-lg mx-auto">
            Mientras tanto, nuestros talleres presenciales están disponibles. Escríbenos por
            WhatsApp y te contamos las fechas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/573000000000?text=Hola%2C%20quiero%20acceso%20anticipado%20a%20la%20formación%20online%20de%20Arcode"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#2563eb] text-white rounded-full px-8 py-3 font-medium hover:bg-[#1d4ed8] transition-colors"
            >
              Notificarme cuando esté listo
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <Link
              href="/academia/talleres"
              className="inline-flex items-center justify-center border border-white/20 text-white rounded-full px-8 py-3 font-medium hover:bg-white/10 transition-colors"
            >
              Ver talleres presenciales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
