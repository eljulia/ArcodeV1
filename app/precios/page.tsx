import type { Metadata } from "next";
import { Check, MessageCircle, ArrowRight, Clock, FileText, Shield } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ContactForm } from "@/components/shared/ContactForm";

export const metadata: Metadata = {
  title: "Planes a medida — Arcode",
  description:
    "Cada empresa es diferente. Cuéntanos qué necesitas y te armamos una propuesta en 24 horas. Sin contratos largos ni sorpresas.",
};

const garantias = [
  {
    icon: Clock,
    titulo: "Diagnóstico gratuito",
    descripcion: "En 30 minutos entendemos tu negocio y te decimos exactamente qué automatizar.",
  },
  {
    icon: FileText,
    titulo: "Propuesta personalizada",
    descripcion: "Recibes una propuesta detallada con alcance, plazos y entregables en 24 horas.",
  },
  {
    icon: Shield,
    titulo: "Sin contratos largos",
    descripcion: "Pagos por proyecto o mensualidad. Sin permanencia mínima de 12 meses.",
  },
];

export default function PreciosPage() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573000000000";
  const message = encodeURIComponent("Hola, quiero solicitar una propuesta de Arcode para mi negocio");

  return (
    <div className="min-h-screen">
      {/* Hero simple */}
      <section className="py-16 md:py-24 bg-[#0a1628] text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-geist)" }}
          >
            Planes diseñados para{" "}
            <span className="text-[#60a5fa]">tu negocio</span>
          </h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            Cada empresa es diferente. Cuéntanos qué necesitas y te armamos una propuesta en 24 horas.
          </p>
        </div>
      </section>

      {/* Garantías */}
      <section className="py-12 bg-[#f8fafc] border-b border-[#e2e8f0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {garantias.map((g) => (
              <div key={g.titulo} className="flex flex-col items-center text-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563eb]/10">
                  <g.icon className="h-6 w-6 text-[#2563eb]" />
                </div>
                <div>
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Check className="h-4 w-4 text-[#10b981]" />
                    <p className="text-sm font-semibold text-[#0f172a]">{g.titulo}</p>
                  </div>
                  <p className="text-sm text-[#64748b]">{g.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulario de cotización */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2
              className="text-2xl md:text-3xl font-bold text-[#0f172a] mb-3"
              style={{ fontFamily: "var(--font-geist)" }}
            >
              Solicita tu propuesta
            </h2>
            <p className="text-[#64748b]">
              Completa el formulario y te respondemos en menos de 24 horas con una propuesta personalizada.
            </p>
          </div>
          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 md:p-8 shadow-sm">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* CTA alternativo WhatsApp */}
      <section className="py-12 bg-[#f8fafc] border-t border-[#e2e8f0]">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#64748b] mb-4">¿Prefieres hablar directo?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/${number}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full bg-[#25D366] hover:bg-[#1fb855] text-white"
              )}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp directo
            </a>
            <Link
              href="/servicios"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "rounded-full border-[#e2e8f0] text-[#0f172a]"
              )}
            >
              Ver servicios
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
