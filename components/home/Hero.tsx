"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { AnimateIn } from "@/components/shared/AnimateIn";
import { slideInRight } from "@/lib/animations";

export function Hero() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573000000000";
  const message = encodeURIComponent("Hola, quiero una demo de Arcode para mi negocio");

  return (
    <section className="relative overflow-hidden bg-mesh-animated noise-overlay text-white">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Columna izquierda: copy */}
          <AnimateIn>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/80 mb-6">
              <span className="inline-block h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
              En línea 24/7 · Armenia, Colombia
            </div>

            {/* H1 */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6"
              style={{ fontFamily: "var(--font-geist)" }}
            >
              Tu negocio trabaja solo,{" "}
              <span className="text-brand-gradient">incluso mientras duermes</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/70 max-w-xl mb-8 leading-relaxed">
              Automatizamos la atención, las ventas y los procesos de PYMEs colombianas con IA.
              Sin código. Sin contratar más personal.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="/contacto"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 h-12"
                )}
              >
                Ver demo en vivo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <a
                href={`https://wa.me/${number}?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 h-12 font-medium text-sm bg-[#25D366] hover:bg-[#20bd5a] text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp directo
              </a>
            </div>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
              <span>✓ Sin contratos largos</span>
              <span>✓ Propuesta en 24h</span>
              <span>✓ Soporte local</span>
            </div>
          </AnimateIn>

          {/* Columna derecha: mockup con imagen */}
          <AnimateIn variants={slideInRight} delay={0.2} className="relative">
            {/* Marco browser */}
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-900/50">
              <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="ml-4 flex-1 bg-slate-700 rounded-full h-5 text-xs text-slate-400 flex items-center px-3">
                  arcode.ia
                </div>
              </div>
              <Image
                src="/images/Arcode_Bot.jpeg"
                alt="Agente IA de Arcode atendiendo clientes automáticamente"
                width={640}
                height={420}
                priority
                className="w-full object-cover"
              />
            </div>

            {/* Badge flotante inferior izquierdo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="absolute -bottom-4 -left-4 bg-white rounded-xl px-4 py-3 shadow-xl flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#25D366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-slate-500">Hoy</p>
                <p className="text-sm font-semibold text-slate-800">147 consultas respondidas</p>
              </div>
            </motion.div>

            {/* Badge flotante superior derecho */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.4 }}
              className="absolute -top-4 -right-4 bg-white rounded-xl px-4 py-3 shadow-xl"
            >
              <p className="text-xs text-slate-500">Tiempo de respuesta</p>
              <p className="text-lg font-bold text-[#2563eb]">2 seg</p>
            </motion.div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
