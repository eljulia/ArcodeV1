import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Database } from "@/lib/supabase/types";

type Caso = Database["public"]["Tables"]["casos"]["Row"];

const sectorLabels: Record<string, string> = {
  restaurante: "Restaurante",
  spa: "Spa & Salud",
  profesional: "Profesional",
  pyme: "PYME",
};

interface CaseCardProps {
  caso: Caso;
}

export function CaseCard({ caso }: CaseCardProps) {
  const initials = caso.empresa
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      <div className="flex-1">
        {/* Header: avatar + sector */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2563eb]/10 flex items-center justify-center text-[#2563eb] font-semibold text-sm shrink-0">
              {initials}
            </div>
            <Badge
              variant="secondary"
              className="text-xs font-semibold bg-[#2563eb]/10 text-[#2563eb] border-0"
            >
              {sectorLabels[caso.sector] ?? caso.sector}
            </Badge>
          </div>
          {/* Rating estrellas */}
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="h-3.5 w-3.5 fill-[#f59e0b] text-[#f59e0b]" />
            ))}
          </div>
        </div>

        <h3
          className="text-lg font-semibold text-[#0f172a] mb-2"
          style={{ fontFamily: "var(--font-geist)" }}
        >
          {caso.empresa}
        </h3>

        <p className="text-sm text-[#64748b] leading-relaxed mb-4">{caso.problema}</p>

        {/* Main metric */}
        <div className="bg-[#f8fafc] rounded-lg p-4 border border-[#e2e8f0]">
          <p
            className="text-2xl font-bold text-[#10b981]"
            style={{ fontFamily: "var(--font-geist)" }}
          >
            {caso.metrica_principal}
          </p>
          {caso.tiempo_implementacion && (
            <p className="text-xs text-[#94a3b8] mt-1">{caso.tiempo_implementacion}</p>
          )}
        </div>

        {caso.cita_cliente && (
          <blockquote className="mt-4 text-sm italic text-[#64748b] border-l-2 border-[#2563eb] pl-3">
            &ldquo;{caso.cita_cliente}&rdquo;
          </blockquote>
        )}
      </div>

      <div className="mt-4">
        <Link
          href={`/casos/${caso.slug}`}
          className="inline-flex items-center text-sm font-medium text-[#2563eb] hover:underline"
        >
          Ver caso completo
          <ArrowRight className="ml-1 h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
