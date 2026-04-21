import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RecursoForm } from "./RecursoForm";

const recursos: Record<string, { titulo: string; descripcion: string; tipo: string }> = {
  "automatizar-restaurante": {
    titulo: "Guía: Cómo automatizar tu restaurante con IA",
    descripcion:
      "Paso a paso para implementar chatbots, reservas automáticas y seguimiento de pedidos en tu restaurante. Sin código, sin tecnicismos.",
    tipo: "Guía",
  },
  "checklist-chatbot": {
    titulo: "Checklist: 10 tareas que puedes delegar a un chatbot",
    descripcion:
      "Lista práctica con las tareas más comunes que los chatbots resuelven en negocios colombianos.",
    tipo: "Checklist",
  },
  "template-whatsapp": {
    titulo: "Template: Flujo de atención para WhatsApp Business",
    descripcion:
      "Plantilla lista para usar con los mensajes y flujos más efectivos para atender clientes por WhatsApp.",
    tipo: "Template",
  },
};

export function generateStaticParams() {
  return [
    { slug: "automatizar-restaurante" },
    { slug: "checklist-chatbot" },
    { slug: "template-whatsapp" },
  ];
}

interface RecursoPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: RecursoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const recurso = recursos[slug];
  if (!recurso) return { title: "Recurso — Arcode" };
  return {
    title: `${recurso.titulo} — Arcode`,
    description: recurso.descripcion,
  };
}

export default async function RecursoPage({ params }: RecursoPageProps) {
  const { slug } = await params;
  const recurso = recursos[slug];
  if (!recurso) notFound();

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-[#2563eb] uppercase tracking-wide mb-3">
            {recurso.tipo}
          </p>
          <h1
            className="text-2xl md:text-3xl font-bold text-[#0f172a] mb-4"
            style={{ fontFamily: "var(--font-geist)" }}
          >
            {recurso.titulo}
          </h1>
          <p className="text-[#64748b]">{recurso.descripcion}</p>
        </div>

        <div className="bg-white border border-[#e2e8f0] rounded-xl p-8 shadow-sm">
          <RecursoForm slug={slug} />
        </div>
      </div>
    </div>
  );
}
