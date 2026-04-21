import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Workflow, Clock, RefreshCw } from "lucide-react";
import { getServicioBySlug } from "@/lib/queries/servicios";
import { SectionHeader } from "@/components/shared/SectionHeader";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const servicio = await getServicioBySlug("flow");
  if (!servicio) {
    return { title: "Automatizaciones Flow — Arcode" };
  }
  return {
    title: `${servicio.nombre} — Arcode`,
    description: servicio.descripcion_corta,
  };
}

export default async function FlowPage() {
  const servicio = await getServicioBySlug("flow");
  if (!servicio) notFound();

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[#2563eb] uppercase tracking-wide mb-3">
            Servicio
          </p>
          <h1
            className="text-3xl md:text-5xl font-bold text-[#0f172a] mb-4"
            style={{ fontFamily: "var(--font-geist)" }}
          >
            {servicio.nombre}
          </h1>
          <p className="text-lg text-[#64748b] max-w-2xl mx-auto mb-6">
            {servicio.descripcion_corta}
          </p>
          <Link
            href={`/contacto?servicio=${servicio.slug}`}
            className="inline-flex items-center bg-[#2563eb] text-white rounded-full px-6 py-3 font-medium hover:bg-[#1d4ed8] transition-colors"
          >
            Quiero esto para mi negocio
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {/* Problema */}
        <div className="mb-16">
          <SectionHeader
            title="El problema que resolvemos"
            align="left"
          />
          <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-8">
            <p className="text-[#64748b] leading-relaxed text-lg">{servicio.problema}</p>
          </div>
        </div>

        {/* Solución */}
        <div className="mb-16">
          <SectionHeader
            title="Nuestra solución"
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm">
              <Workflow className="h-8 w-8 text-[#2563eb] mb-3" />
              <h3
                className="font-semibold text-[#0f172a] mb-2"
                style={{ fontFamily: "var(--font-geist)" }}
              >
                Flujos inteligentes
              </h3>
              <p className="text-sm text-[#64748b]">
                Conectamos tus herramientas (WhatsApp, correo, hojas de cálculo, CRM) sin código.
              </p>
            </div>
            <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm">
              <Clock className="h-8 w-8 text-[#2563eb] mb-3" />
              <h3
                className="font-semibold text-[#0f172a] mb-2"
                style={{ fontFamily: "var(--font-geist)" }}
              >
                Ahorra horas cada semana
              </h3>
              <p className="text-sm text-[#64748b]">
                Tareas repetitivas que hoy te toman horas se ejecutan solas en segundos.
              </p>
            </div>
            <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm">
              <RefreshCw className="h-8 w-8 text-[#2563eb] mb-3" />
              <h3
                className="font-semibold text-[#0f172a] mb-2"
                style={{ fontFamily: "var(--font-geist)" }}
              >
                Escalable desde el día 1
              </h3>
              <p className="text-sm text-[#64748b]">
                Las automatizaciones crecen con tu negocio sin aumentar tu equipo.
              </p>
            </div>
          </div>
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-8 shadow-sm">
            <p className="text-[#64748b] leading-relaxed text-lg">{servicio.solucion}</p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#0a1628] rounded-2xl p-10 text-center">
          <h2
            className="text-2xl md:text-3xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-geist)" }}
          >
            ¿Cuántas horas a la semana pierdes en tareas repetitivas?
          </h2>
          <p className="text-[#94a3b8] mb-8 max-w-lg mx-auto">
            Cuéntanos tus procesos y te mostramos cuáles se pueden automatizar hoy mismo.
          </p>
          <Link
            href={`/contacto?servicio=${servicio.slug}`}
            className="inline-flex items-center bg-[#2563eb] text-white rounded-full px-8 py-3 font-medium hover:bg-[#1d4ed8] transition-colors"
          >
            Analizar mis procesos
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
