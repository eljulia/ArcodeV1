import type { Metadata } from "next";
import { getServicios } from "@/lib/queries/servicios";
import { ServicesGrid } from "@/components/home/ServicesGrid";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Servicios — IA y automatización por vertical",
  description:
    "Chatbots de IA, automatizaciones, desarrollo web y academia para restaurantes, spas y profesionales en Colombia.",
};

export default async function ServiciosPage() {
  const servicios = await getServicios();

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h1
            className="text-3xl md:text-4xl font-bold text-[#0f172a]"
            style={{ fontFamily: "var(--font-geist)" }}
          >
            ¿Qué necesitas resolver?
          </h1>
          <p className="text-[#64748b] mt-4 max-w-xl mx-auto">
            Selecciona tu sector para ver los servicios que hemos diseñado específicamente para ti.
          </p>
        </div>
      </div>
      <ServicesGrid servicios={servicios} />
    </div>
  );
}
