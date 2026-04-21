"use client";

import { CalendarCheck, Wrench, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { AnimateIn } from "@/components/shared/AnimateIn";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const steps = [
  {
    number: "01",
    icon: CalendarCheck,
    title: "Diagnóstico gratuito",
    description:
      "En 30 minutos entendemos tu negocio y te decimos exactamente qué automatizar. Sin costo y sin compromiso.",
    timeline: "Esta semana",
  },
  {
    number: "02",
    icon: Wrench,
    title: "Implementación",
    description:
      "Configuramos tu chatbot, automatización o sitio web. Tú apruebas cada paso antes de avanzar.",
    timeline: "7-14 días",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Resultado medible",
    description:
      "Mides el impacto real: tiempo recuperado, consultas resueltas automáticamente, leads capturados.",
    timeline: "Primer mes",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateIn>
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4"
              style={{ fontFamily: "var(--font-geist)" }}
            >
              Cómo funciona
            </h2>
            <p className="text-[#64748b] max-w-xl mx-auto">
              Tres pasos, plazos concretos, resultados medibles.
            </p>
          </div>
        </AnimateIn>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Connector line animada (desktop) */}
          <motion.div
            className="hidden md:block absolute top-12 left-1/6 right-1/6 h-px bg-[#2563eb]/30 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
          />

          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={fadeInUp}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#2563eb] text-white font-bold text-xl mb-6 shadow-md shadow-blue-200">
                {step.number}
              </div>

              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6 w-full">
                <div className="flex justify-center mb-4">
                  <step.icon className="h-6 w-6 text-[#2563eb]" />
                </div>
                <h3
                  className="text-lg font-semibold text-[#0f172a] mb-2"
                  style={{ fontFamily: "var(--font-geist)" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm text-[#64748b] leading-relaxed mb-4">
                  {step.description}
                </p>
                <span className="inline-block text-xs font-semibold text-[#2563eb] bg-[#2563eb]/10 px-3 py-1 rounded-full">
                  {step.timeline}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
