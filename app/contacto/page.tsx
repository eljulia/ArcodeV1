import type { Metadata } from "next";
import { MessageCircle, Calendar, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/shared/ContactForm";

export const metadata: Metadata = {
  title: "Contacto — Demo gratuita",
  description:
    "Agenda tu diagnóstico gratuito con Arcode. Escríbenos por WhatsApp, agenda una llamada o usa el formulario.",
};

const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573000000000";
const message = encodeURIComponent("Hola, quiero agendar un diagnóstico gratuito con Arcode");

export default function ContactoPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4"
            style={{ fontFamily: "var(--font-geist)" }}
          >
            Hablemos
          </h1>
          <p className="text-[#64748b] max-w-lg mx-auto">
            El diagnóstico es gratis. En 30 minutos sabrás exactamente qué puedes
            automatizar en tu negocio.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left: contact options */}
          <div className="space-y-6">
            <h2
              className="text-xl font-semibold text-[#0f172a]"
              style={{ fontFamily: "var(--font-geist)" }}
            >
              Elige cómo prefieres
            </h2>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${number}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 bg-white border border-[#e2e8f0] rounded-xl hover:shadow-md transition-shadow group"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl shrink-0"
                style={{ backgroundColor: "#25D366" }}>
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-[#0f172a] group-hover:text-[#2563eb] transition-colors">
                  WhatsApp — respuesta en minutos
                </p>
                <p className="text-sm text-[#64748b]">
                  La forma más rápida. Mensaje pre-cargado listo.
                </p>
              </div>
            </a>

            {/* Calendly placeholder */}
            <div className="flex items-center gap-4 p-5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563eb]/10 shrink-0">
                <Calendar className="h-6 w-6 text-[#2563eb]" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#0f172a]">Agendar videollamada</p>
                <p className="text-sm text-[#64748b]">Próximamente disponible por Calendly.</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 p-5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563eb]/10 shrink-0">
                <Mail className="h-6 w-6 text-[#2563eb]" />
              </div>
              <div>
                <p className="font-semibold text-[#0f172a]">Correo directo</p>
                <p className="text-sm text-[#2563eb]">hola@arcode.ia</p>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 md:p-8 shadow-sm">
            <h2
              className="text-xl font-semibold text-[#0f172a] mb-6"
              style={{ fontFamily: "var(--font-geist)" }}
            >
              O escríbenos aquí
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
