"use client";

import Image from "next/image";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServiceCard } from "@/components/shared/ServiceCard";
import type { Database } from "@/lib/supabase/types";

type Servicio = Database["public"]["Tables"]["servicios"]["Row"];

const verticals = [
  {
    key: "restaurante",
    label: "Restaurantes",
    image: "/images/Arcode_Agent.jpeg",
    subtitle: "Atiende pedidos y reservas automáticamente",
  },
  {
    key: "spa",
    label: "Spas & Salud",
    image: "/images/Arcode_Agent.jpeg",
    subtitle: "Agenda citas y reduce cancelaciones",
  },
  {
    key: "profesional",
    label: "Profesionales",
    image: "/images/Arcode_Web.jpeg",
    subtitle: "Automatiza tareas y recupera horas facturables",
  },
  {
    key: "pyme",
    label: "PYMEs",
    image: "/images/Arcode_Web.jpeg",
    subtitle: "Escala sin contratar más personal",
  },
];

interface ServicesGridProps {
  servicios: Servicio[];
}

export function ServicesGrid({ servicios }: ServicesGridProps) {
  const [activeTab, setActiveTab] = useState("restaurante");
  const activeVertical = verticals.find((v) => v.key === activeTab) ?? verticals[0];

  return (
    <section className="py-16 md:py-24 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4"
            style={{ fontFamily: "var(--font-geist)" }}
          >
            ¿Qué necesitas resolver?
          </h2>
          <p className="text-[#64748b] max-w-xl mx-auto">
            Selecciona tu tipo de negocio y te mostramos qué podemos implementar para ti.
          </p>
        </div>

        <Tabs defaultValue="restaurante" onValueChange={setActiveTab}>
          <TabsList className="flex flex-wrap justify-center gap-2 h-auto bg-transparent mb-8">
            {verticals.map((v) => (
              <TabsTrigger
                key={v.key}
                value={v.key}
                className="rounded-full px-5 py-2 data-[state=active]:bg-[#2563eb] data-[state=active]:text-white"
              >
                {v.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {verticals.map((v) => {
            const filtered = servicios.filter((s) => s.verticales?.includes(v.key));
            return (
              <TabsContent key={v.key} value={v.key}>
                {/* Imagen del tab */}
                <div className="mb-8 rounded-2xl overflow-hidden h-48 relative">
                  <Image
                    src={v.image}
                    alt={`Servicio ${v.label} de Arcode`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/80 to-[#0a1628]/20" />
                  <div className="absolute bottom-4 left-6 text-white">
                    <p className="text-xl font-bold" style={{ fontFamily: "var(--font-geist)" }}>
                      {v.label}
                    </p>
                    <p className="text-sm text-slate-300">{v.subtitle}</p>
                  </div>
                </div>

                {filtered.length === 0 ? (
                  <p className="text-center text-[#94a3b8] py-8">
                    Próximamente servicios para este sector.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((s) => (
                      <ServiceCard key={s.id} servicio={s} />
                    ))}
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}
