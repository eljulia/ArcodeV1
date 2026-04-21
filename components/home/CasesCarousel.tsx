import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { CaseCard } from "@/components/shared/CaseCard";
import { AnimateIn } from "@/components/shared/AnimateIn";
import type { Database } from "@/lib/supabase/types";

type Caso = Database["public"]["Tables"]["casos"]["Row"];

interface CasesCarouselProps {
  casos: Caso[];
}

export function CasesCarousel({ casos }: CasesCarouselProps) {
  if (casos.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <AnimateIn>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-2"
              style={{ fontFamily: "var(--font-geist)" }}
            >
              Resultados reales.
              <br />
              <span className="text-[#2563eb]">Sin promesas vacías.</span>
            </h2>
          </AnimateIn>
          <Link
            href="/casos"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-full border-[#e2e8f0] shrink-0"
            )}
          >
            Ver todos los casos
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {casos.map((caso, i) => (
            <AnimateIn key={caso.id} delay={i * 0.1}>
              <CaseCard caso={caso} />
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
