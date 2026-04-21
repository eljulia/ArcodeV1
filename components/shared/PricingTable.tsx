import Link from "next/link";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Database } from "@/lib/supabase/types";

type Precio = Database["public"]["Tables"]["precios"]["Row"];

const nivelLabels: Record<string, string> = {
  entrada: "Entrada",
  crecimiento: "Crecimiento",
  premium: "Premium",
};

interface PricingTableProps {
  precios: Precio[];
}

export function PricingTable({ precios }: PricingTableProps) {
  const ordered = [...precios].sort((a, b) => a.orden - b.orden);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {ordered.map((precio) => (
        <div
          key={precio.id}
          className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col ${
            precio.destacado
              ? "border-2 border-[#2563eb] relative"
              : "border border-[#e2e8f0]"
          }`}
        >
          {precio.destacado && (
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <Badge className="bg-[#2563eb] text-white border-0 px-4 py-1 text-xs font-semibold">
                Recomendado
              </Badge>
            </div>
          )}

          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#64748b] mb-1">
              {nivelLabels[precio.nivel] ?? precio.nivel}
            </p>
            <h3
              className="text-xl font-semibold text-[#0f172a] mb-2"
              style={{ fontFamily: "var(--font-geist)" }}
            >
              {precio.nombre}
            </h3>
            <p
              className="text-3xl font-bold text-[#0f172a]"
              style={{ fontFamily: "var(--font-geist)" }}
            >
              {precio.precio}
            </p>
          </div>

          <ul className="space-y-2.5 flex-1 mb-6">
            {precio.caracteristicas.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-[#64748b]">
                <Check className="h-4 w-4 text-[#10b981] mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <Link
            href={`/contacto?plan=${precio.nivel}`}
            className="block text-center bg-[#2563eb] text-white rounded-full px-6 py-3 text-sm font-medium hover:bg-[#1d4ed8] transition-colors"
          >
            Comenzar
          </Link>
        </div>
      ))}
    </div>
  );
}
