"use client";

import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { AnimateIn } from "@/components/shared/AnimateIn";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const comparison = [
  {
    feature: "Tiempo de implementación",
    traditional: "3-6 meses",
    arcode: "7-14 días",
  },
  {
    feature: "Especialización por sector",
    traditional: "Solución genérica",
    arcode: "Restaurantes, Spas, Profesionales",
  },
  {
    feature: "Métricas de resultado",
    traditional: "Rara vez",
    arcode: "Siempre, medibles",
  },
  {
    feature: "Soporte post-implementación",
    traditional: "Extra cost",
    arcode: "Incluido en plan",
  },
];

export function SolutionSection() {
  return (
    <section className="py-16 md:py-24 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateIn>
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4"
              style={{ fontFamily: "var(--font-geist)" }}
            >
              Arcode no vende software.
              <br />
              <span className="text-[#2563eb]">Implementa resultados.</span>
            </h2>
            <p className="text-[#64748b] max-w-2xl mx-auto">
              La diferencia está en los detalles: conocemos tu sector, hablamos de métricas
              reales y respondemos cuando lo necesitas.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className="max-w-3xl mx-auto overflow-hidden rounded-xl border border-[#e2e8f0] bg-white shadow-sm">
            {/* Header */}
            <div className="grid grid-cols-3 bg-[#0a1628] text-white text-sm font-semibold">
              <div className="px-4 py-3">Característica</div>
              <div className="px-4 py-3 text-center text-white/60">Agencia tradicional</div>
              <div className="px-4 py-3 text-center text-[#60a5fa]">Arcode</div>
            </div>

            {/* Rows con stagger */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {comparison.map((row, i) => (
                <motion.div
                  key={row.feature}
                  variants={fadeInUp}
                  className={`grid grid-cols-3 text-sm border-t border-[#e2e8f0] ${
                    i % 2 === 0 ? "bg-white" : "bg-[#f8fafc]"
                  }`}
                >
                  <div className="px-4 py-3 font-medium text-[#0f172a]">{row.feature}</div>
                  <div className="px-4 py-3 text-center text-[#94a3b8] flex items-center justify-center gap-1.5">
                    <X className="h-3.5 w-3.5 text-[#ef4444] shrink-0" />
                    {row.traditional}
                  </div>
                  <div className="px-4 py-3 text-center text-[#10b981] font-medium flex items-center justify-center gap-1.5">
                    <Check className="h-3.5 w-3.5 shrink-0" />
                    {row.arcode}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
