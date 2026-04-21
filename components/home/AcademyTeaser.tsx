import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { AnimateIn } from "@/components/shared/AnimateIn";

export function AcademyTeaser() {
  return (
    <section className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Background image */}
          <Image
            src="/images/First_Post.jpeg"
            alt="Taller de automatización con IA — Arcode Academy"
            fill
            className="object-cover"
            sizes="100vw"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#0a1628]/78" />

          {/* Content */}
          <AnimateIn className="relative z-10 py-16 px-8 text-center text-white">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/80 mb-4">
              Academia Arcode
            </span>
            <h2
              className="text-2xl md:text-3xl font-bold mb-3"
              style={{ fontFamily: "var(--font-geist)" }}
            >
              ¿Prefieres aprender primero?
            </h2>
            <p className="text-white/70 max-w-lg mx-auto mb-8">
              Si no estás listo para contratar, aprende a implementar IA en tu negocio
              con talleres presenciales en Armenia y contenido online.
            </p>
            <Link
              href="/academia"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "rounded-full border-white/40 bg-white/10 text-white hover:bg-white/20"
              )}
            >
              Ver talleres disponibles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
