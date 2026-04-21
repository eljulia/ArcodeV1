import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { AnimateIn } from "@/components/shared/AnimateIn";

export function FinalCTA() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573000000000";
  const message = encodeURIComponent("Hola, quiero agendar un diagnóstico gratuito con Arcode");

  return (
    <section className="relative py-20 md:py-28 bg-mesh-animated noise-overlay text-white overflow-hidden">
      {/* Partículas decorativas */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-300/5 rounded-full blur-2xl pointer-events-none" />

      <AnimateIn className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          className="text-3xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "var(--font-geist)" }}
        >
          Listo para automatizar
          <br />
          <span className="text-[#60a5fa]">tu negocio</span>
        </h2>
        <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
          El diagnóstico es gratis. En 30 minutos sabrás exactamente qué puedes
          automatizar y cuánto tiempo recuperarás.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`https://wa.me/${number}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-full bg-[#25D366] hover:bg-[#1fb855] text-white h-12 px-8"
            )}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Agendar diagnóstico gratuito
          </a>

          <Link
            href="/servicios"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 h-12 px-8"
            )}
          >
            Ver todos los servicios
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </AnimateIn>
    </section>
  );
}
