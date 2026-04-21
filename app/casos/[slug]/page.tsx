import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getCasoBySlug, getCasos } from "@/lib/queries/casos";

export const revalidate = 3600;

interface CasoPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const casos = await getCasos();
    return casos.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: CasoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caso = await getCasoBySlug(slug);
  if (!caso) return {};
  return {
    title: `${caso.empresa} — Caso de éxito`,
    description: caso.problema,
  };
}

const sectorLabels: Record<string, string> = {
  restaurante: "Restaurante",
  spa: "Spa & Salud",
  profesional: "Profesional",
  pyme: "PYME",
};

export default async function CasoPage({ params }: CasoPageProps) {
  const { slug } = await params;
  const caso = await getCasoBySlug(slug);
  if (!caso) notFound();

  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573000000000";
  const message = encodeURIComponent(
    `Hola, vi el caso de ${caso.empresa} y quiero algo similar para mi negocio`
  );

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/casos"
          className="inline-flex items-center gap-2 text-sm text-[#64748b] hover:text-[#0f172a] transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Todos los casos
        </Link>

        {/* Header */}
        <div className="mb-10">
          <Badge className="bg-[#2563eb]/10 text-[#2563eb] border-0 mb-4">
            {sectorLabels[caso.sector] ?? caso.sector}
          </Badge>
          <h1
            className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4"
            style={{ fontFamily: "var(--font-geist)" }}
          >
            {caso.empresa}
          </h1>
          <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6">
            <p className="text-4xl font-bold text-[#10b981] mb-2"
              style={{ fontFamily: "var(--font-geist)" }}>
              {caso.metrica_principal}
            </p>
            {caso.tiempo_implementacion && (
              <p className="text-sm text-[#94a3b8]">{caso.tiempo_implementacion}</p>
            )}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {caso.contexto && (
            <section>
              <h2 className="text-xl font-semibold text-[#0f172a] mb-3"
                style={{ fontFamily: "var(--font-geist)" }}>Contexto</h2>
              <p className="text-[#64748b] leading-relaxed">{caso.contexto}</p>
            </section>
          )}

          <section>
            <h2 className="text-xl font-semibold text-[#0f172a] mb-3"
              style={{ fontFamily: "var(--font-geist)" }}>El problema</h2>
            <p className="text-[#64748b] leading-relaxed">{caso.problema}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0f172a] mb-3"
              style={{ fontFamily: "var(--font-geist)" }}>La solución</h2>
            <p className="text-[#64748b] leading-relaxed">{caso.solucion}</p>
          </section>

          {caso.cita_cliente && (
            <blockquote className="border-l-4 border-[#2563eb] pl-6 py-2">
              <p className="text-lg italic text-[#0f172a]">&ldquo;{caso.cita_cliente}&rdquo;</p>
            </blockquote>
          )}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-[#0a1628] text-white rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-geist)" }}>
            ¿Quieres algo así para tu negocio?
          </h3>
          <p className="text-white/70 mb-6 text-sm">
            Agenda un diagnóstico gratuito de 30 minutos y te digo exactamente qué podemos implementar.
          </p>
          <a
            href={`https://wa.me/${number}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants(), "rounded-full bg-[#25D366] hover:bg-[#1fb855] inline-flex items-center justify-center text-sm font-medium text-white")}
          >
            Escríbeme por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
