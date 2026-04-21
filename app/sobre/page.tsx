import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sobre Arcode — El equipo detrás de la IA",
  description:
    "Arcode es una agencia de IA fundada en Armenia, Quindío. Conoce al equipo y la historia detrás del proyecto.",
};

const stack = [
  "n8n", "Make", "WhatsApp Business API", "Supabase",
  "Next.js", "OpenAI API", "Claude API", "Vercel",
];

export default function SobrePage() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="text-sm font-semibold text-[#2563eb] mb-3 uppercase tracking-wide">
            Armenia, Quindío · Colombia
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-6 leading-tight"
            style={{ fontFamily: "var(--font-geist)" }}
          >
            Sobre Arcode
          </h1>
          <p className="text-xl text-[#64748b] leading-relaxed">
            Una agencia de IA construida desde el interior de Colombia para las PYMEs
            que necesitan automatizar sin complicarse.
          </p>
        </div>

        {/* Story */}
        <div className="prose prose-slate max-w-none mb-12 space-y-4 text-[#64748b]">
          <p>
            Arcode nació de una observación simple: los restaurantes, spas y profesionales
            en ciudades intermedias como Armenia tienen exactamente los mismos problemas que
            los negocios en Bogotá, pero acceden a soluciones 5 años más tarde y a precios
            2x más altos.
          </p>
          <p>
            La misión es cerrar esa brecha. Implementar IA y automatización con plazos
            concretos, precios transparentes y resultados medibles — no promesas de
            transformación digital sin fecha.
          </p>
          <p>
            En Arcode no vendemos software. Resolvemos problemas específicos: el restaurante
            que pierde clientes porque no responde a tiempo, la clínica que llena menos citas
            de las que debería, el abogado que cobra por hora pero gasta horas en tareas
            que debería delegar a una máquina.
          </p>
        </div>

        {/* Tech stack */}
        <div className="mb-12">
          <h2
            className="text-2xl font-bold text-[#0f172a] mb-6"
            style={{ fontFamily: "var(--font-geist)" }}
          >
            Tecnologías que usamos
          </h2>
          <div className="flex flex-wrap gap-3">
            {stack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-full text-sm font-medium text-[#0f172a]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Vision */}
        <div className="bg-[#0a1628] text-white rounded-2xl p-8 mb-12">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ fontFamily: "var(--font-geist)" }}
          >
            Hacia dónde vamos
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            En los próximos 3 años, Arcode evolucionará hacia una plataforma SaaS donde
            las PYMEs colombianas puedan activar automatizaciones prediseñadas para su
            sector en cuestión de horas.
          </p>
          <p className="text-white/70 leading-relaxed">
            En V1, estamos construyendo los casos de uso y el conocimiento de dominio que
            hará esa plataforma posible. Cada proyecto es un aprendizaje.
          </p>
        </div>

        {/* Contact */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Link
            href="/contacto"
            className={cn(buttonVariants(), "rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] inline-flex items-center justify-center text-sm font-medium text-white")}
          >
            Agenda una llamada
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <div className="flex items-center gap-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#64748b] hover:text-[#0f172a] transition-colors">
              <ExternalLink className="h-4 w-4" />
              LinkedIn
            </a>
            <a href="mailto:hola@arcode.ia"
              className="flex items-center gap-2 text-sm text-[#64748b] hover:text-[#0f172a] transition-colors">
              <Mail className="h-4 w-4" />
              hola@arcode.ia
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
