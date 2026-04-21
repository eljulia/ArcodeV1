import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, CheckSquare, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Recursos gratuitos — Arcode",
  description:
    "Guías, checklists y templates gratuitos para automatizar tu negocio con IA. Descarga y aplica desde hoy.",
};

const recursos = [
  {
    slug: "automatizar-restaurante",
    titulo: "Guía: Cómo automatizar tu restaurante con IA",
    descripcion:
      "Paso a paso para implementar chatbots, reservas automáticas y seguimiento de pedidos en tu restaurante. Sin código, sin tecnicismos.",
    icon: FileText,
    tipo: "Guía",
    tiempo: "15 min de lectura",
  },
  {
    slug: "checklist-chatbot",
    titulo: "Checklist: 10 tareas que puedes delegar a un chatbot",
    descripcion:
      "Lista práctica con las tareas más comunes que los chatbots resuelven en negocios colombianos. Márcalas y prioriza cuál implementar primero.",
    icon: CheckSquare,
    tipo: "Checklist",
    tiempo: "5 min",
  },
  {
    slug: "template-whatsapp",
    titulo: "Template: Flujo de atención para WhatsApp Business",
    descripcion:
      "Plantilla lista para usar con los mensajes y flujos más efectivos para atender clientes por WhatsApp. Adaptable a cualquier sector.",
    icon: MessageSquare,
    tipo: "Template",
    tiempo: "Listo para usar",
  },
];

export default function RecursosPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-[#2563eb] uppercase tracking-wide mb-3">
            Recursos gratuitos
          </p>
          <h1
            className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4"
            style={{ fontFamily: "var(--font-geist)" }}
          >
            Herramientas para empezar hoy
          </h1>
          <p className="text-[#64748b] max-w-xl mx-auto">
            Guías, checklists y templates diseñados para PYMEs colombianas. Gratuitos, prácticos
            y listos para aplicar en tu negocio.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recursos.map((recurso) => {
            const Icon = recurso.icon;
            return (
              <div
                key={recurso.slug}
                className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-[#2563eb]/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-[#2563eb]" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#2563eb] block">{recurso.tipo}</span>
                    <span className="text-xs text-[#94a3b8]">{recurso.tiempo}</span>
                  </div>
                </div>

                <h2
                  className="text-base font-semibold text-[#0f172a] mb-3 flex-1"
                  style={{ fontFamily: "var(--font-geist)" }}
                >
                  {recurso.titulo}
                </h2>

                <p className="text-sm text-[#64748b] leading-relaxed mb-6">
                  {recurso.descripcion}
                </p>

                <Link
                  href={`/recursos/${recurso.slug}`}
                  className="inline-flex items-center justify-center bg-[#2563eb] text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-[#1d4ed8] transition-colors mt-auto"
                >
                  Descargar gratis
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
