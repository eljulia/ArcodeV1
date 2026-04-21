import type { Metadata } from "next";
import Link from "next/link";
import { getCasos, getCasosBySector } from "@/lib/queries/casos";
import { CaseCard } from "@/components/shared/CaseCard";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Casos de Éxito — Resultados reales",
  description:
    "Descubre cómo Arcode ha ayudado a restaurantes, spas y profesionales a automatizar y escalar.",
};

const sectors = [
  { key: "todos", label: "Todos" },
  { key: "restaurante", label: "Restaurantes" },
  { key: "spa", label: "Spas & Salud" },
  { key: "profesional", label: "Profesionales" },
];

interface CasosPageProps {
  searchParams: Promise<{ sector?: string }>;
}

export default async function CasosPage({ searchParams }: CasosPageProps) {
  const { sector } = await searchParams;
  const casos =
    sector && sector !== "todos"
      ? await getCasosBySector(sector)
      : await getCasos();

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1
            className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4"
            style={{ fontFamily: "var(--font-geist)" }}
          >
            Resultados reales.
            <br />
            Sin promesas vacías.
          </h1>
          <p className="text-[#64748b]">
            Cada caso incluye el problema, la solución y el resultado en números.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {sectors.map((s) => (
            <Link
              key={s.key}
              href={s.key === "todos" ? "/casos" : `/casos?sector=${s.key}`}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                (sector ?? "todos") === s.key
                  ? "bg-[#2563eb] text-white"
                  : "bg-[#f8fafc] border border-[#e2e8f0] text-[#64748b] hover:border-[#2563eb] hover:text-[#2563eb]"
              }`}
            >
              {s.label}
            </Link>
          ))}
        </div>

        {casos.length === 0 ? (
          <div className="text-center py-16 text-[#94a3b8]">
            Aún no hay casos publicados en este sector.
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
