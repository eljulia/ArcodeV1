import Image from "next/image";
import { Clock, UserX, BarChart2 } from "lucide-react";
import { AnimateIn } from "@/components/shared/AnimateIn";

const problems = [
  {
    icon: Clock,
    sector: "Restaurantes",
    title: "Horas perdidas respondiendo lo mismo",
    description:
      "Tus empleados pierden horas respondiendo las mismas preguntas por WhatsApp: menú, horarios, reservas. Tiempo que podrían usar atendiendo mesas.",
  },
  {
    icon: UserX,
    sector: "Spas & Salud",
    title: "Pacientes que se van sin cita",
    description:
      "Clientes que te escriben a las 11pm para reservar y no encuentran respuesta. Al día siguiente ya agendaron con la competencia.",
  },
  {
    icon: BarChart2,
    sector: "Profesionales",
    title: "Cobras por hora pero pierdes tiempo",
    description:
      "Eres abogado, contador o consultor. Cada hora en tareas repetitivas es dinero que no cobras. Las automatizaciones pueden devolverte ese tiempo.",
  },
];

export function ProblemSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4"
            style={{ fontFamily: "var(--font-geist)" }}
          >
            ¿Te suena familiar?
          </h2>
          <p className="text-[#64748b] max-w-xl mx-auto">
            Antes de hablar de soluciones, hablemos de los problemas reales de tu negocio.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Imagen antes/después */}
          <AnimateIn>
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/Arcode_AnnDesp.jpeg"
                alt="Negocio local antes y después de implementar automatización con IA"
                width={560}
                height={400}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/70 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm font-semibold">Antes de Arcode</p>
                <p className="text-xs text-slate-300">
                  Respuestas manuales · Horario limitado · Clientes perdidos
                </p>
              </div>
            </div>
          </AnimateIn>

          {/* Cards de problema */}
          <div className="flex flex-col gap-4">
            {problems.map((problem, i) => (
              <AnimateIn key={problem.title} delay={i * 0.1}>
                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6 hover:scale-[1.02] hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2563eb]/10 shrink-0">
                      <problem.icon className="h-5 w-5 text-[#2563eb]" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#2563eb]">
                      {problem.sector}
                    </span>
                  </div>
                  <h3
                    className="text-lg font-semibold text-[#0f172a] mb-2"
                    style={{ fontFamily: "var(--font-geist)" }}
                  >
                    {problem.title}
                  </h3>
                  <p className="text-sm text-[#64748b] leading-relaxed">{problem.description}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
