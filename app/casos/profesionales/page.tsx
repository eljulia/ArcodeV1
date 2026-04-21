import type { Metadata } from "next";
import Link from "next/link";
import { getCasosBySector } from "@/lib/queries/casos";
import { CaseCard } from "@/components/shared/CaseCard";
import { SectionHeader } from "@/components/shared/SectionHeader";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Casos de Éxito en Profesionales — Arcode",
  description:
    "Descubre cómo profesionales independientes colombianos han automatizado su práctica con IA.",
};

export default async function CasosProfesionalesPage() {
  const casos = await getCasosBySector("profesional");

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Casos de éxito en Profesionales"
          subtitle="Resultados reales de profesionales independientes que ya automatizaron con Arcode."
        />

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          <Link
            href="/casos"
            className="px-5 py-2 rounded-full text-sm font-medium bg-[#f8fafc] border border-[#e2e8f0] text-[#64748b] hover:border-[#2563eb] hover:text-[#2563eb] transition-colors"
          >
            Todos los sectores
          </Link>
          <Link
            href="/casos/restaurantes"
            className="px-5 py-2 rounded-full text-sm font-medium bg-[#f8fafc] border border-[#e2e8f0] text-[#64748b] hover:border-[#2563eb] hover:text-[#2563eb] transition-colors"
          >
            Restaurantes
          </Link>
          <Link
            href="/casos/spas-salud"
            className="px-5 py-2 rounded-full text-sm font-medium bg-[#f8fafc] border border-[#e2e8f0] text-[#64748b] hover:border-[#2563eb] hover:text-[#2563eb] transition-colors"
          >
            Spas & Salud
          </Link>
          <span className="px-5 py-2 rounded-full text-sm font-medium bg-[#2563eb] text-white">
            Profesionales
          </span>
        </div>

        {casos.length === 0 ? (
          <div className="text-center py-16 text-[#94a3b8]">
            Aún no hay casos publicados para este sector.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {casos.map((caso) => (
              <CaseCard key={caso.id} caso={caso} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
