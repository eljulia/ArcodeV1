import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import type { Database } from "@/lib/supabase/types";

type Servicio = Database["public"]["Tables"]["servicios"]["Row"];

interface ServiceCardProps {
  servicio: Servicio;
}

export function ServiceCard({ servicio }: ServiceCardProps) {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
      <div className="flex-1">
        <h3
          className="text-lg font-semibold text-[#0f172a] mb-2"
          style={{ fontFamily: "var(--font-geist)" }}
        >
          {servicio.nombre}
        </h3>
        <p className="text-sm text-[#64748b] leading-relaxed mb-4">
          {servicio.descripcion_corta}
        </p>
      </div>
      <div className="mt-4">
        <Link
          href={`/contacto?servicio=${servicio.slug}`}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "rounded-full border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb] hover:text-white w-full"
          )}
        >
          Cotizar este servicio
          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
