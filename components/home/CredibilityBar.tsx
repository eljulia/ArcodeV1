"use client";

import Image from "next/image";
import { useCountUp } from "@/hooks/useCountUp";

const tools = [
  { name: "n8n", src: "/images/tools/n8n.svg", width: 48, height: 28 },
  { name: "WhatsApp Business", src: "/images/tools/whatsapp.svg", width: 28, height: 28 },
  { name: "Supabase", src: "/images/tools/supabase.svg", width: 100, height: 24 },
  { name: "Make", src: "/images/tools/make.svg", width: 56, height: 24 },
];

function AnimatedStat({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label: string;
}) {
  const { count, ref } = useCountUp(target);
  return (
    <div ref={ref} className="text-center">
      <div
        className="text-2xl md:text-3xl font-bold text-[#2563eb]"
        style={{ fontFamily: "var(--font-geist)" }}
      >
        {count}
        {suffix}
      </div>
      <div className="text-xs md:text-sm text-[#64748b] mt-1">{label}</div>
    </div>
  );
}

function StaticStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div
        className="text-2xl md:text-3xl font-bold text-[#2563eb]"
        style={{ fontFamily: "var(--font-geist)" }}
      >
        {value}
      </div>
      <div className="text-xs md:text-sm text-[#64748b] mt-1">{label}</div>
    </div>
  );
}

export function CredibilityBar() {
  return (
    <section className="bg-[#f8fafc] border-y border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats con contadores animados */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AnimatedStat target={7} suffix=" días" label="Tiempo promedio de implementación" />
          <AnimatedStat target={80} suffix="%" label="Reducción de consultas repetitivas" />
          <StaticStat value="3 sectores" label="Restaurantes · Spas · Profesionales" />
          <StaticStat value="24/7" label="Respuesta automática a clientes" />
        </div>

        {/* Divider */}
        <div className="border-t border-[#e2e8f0] pt-6">
          <p className="text-xs text-[#94a3b8] text-center mb-4 uppercase tracking-wide">
            Tecnologías que usamos
          </p>
          <div className="flex flex-wrap justify-center gap-6 items-center">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="flex items-center justify-center px-4 py-1.5 bg-white rounded-full border border-[#e2e8f0] h-9"
              >
                <Image
                  src={tool.src}
                  alt={tool.name}
                  width={tool.width}
                  height={tool.height}
                  className="object-contain"
                  onError={() => {}}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
