import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, MapPin, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getTalleres } from "@/lib/queries/talleres";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { cn, formatDate } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Talleres — Academia Arcode",
  description:
    "Talleres presenciales e in-company para aprender IA aplicada a tu negocio. Grupos pequeños, casos reales del mercado colombiano.",
};

export default async function TalleresPage() {
  const talleres = await getTalleres();

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Talleres disponibles"
          subtitle="Aprende a implementar IA en tu negocio con talleres prácticos. Sin tecnicismos, con casos reales del mercado colombiano."
        />

        {talleres.length === 0 ? (
          <div className="text-center py-16 bg-[#f8fafc] rounded-2xl border border-[#e2e8f0]">
            <p className="text-[#64748b] mb-2 font-medium">Próximos talleres disponibles pronto.</p>
            <p className="text-[#94a3b8] text-sm mb-6">
              Escríbenos por WhatsApp y te avisamos cuando abran cupos.
            </p>
            <a
              href="https://wa.me/573000000000?text=Hola%2C%20quiero%20recibir%20información%20sobre%20los%20talleres%20de%20Academia%20Arcode"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants(), "rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] inline-flex items-center justify-center text-sm font-medium text-white")}
            >
              Escríbenos por WhatsApp
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {talleres.map((taller) => (
              <div
                key={taller.id}
                className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary" className="text-xs capitalize">
                    {taller.tipo}
                  </Badge>
                  {taller.cupos_disponibles !== null && taller.cupos_disponibles <= 5 && (
                    <Badge variant="destructive" className="text-xs">
                      Solo {taller.cupos_disponibles} cupos
                    </Badge>
                  )}
                </div>

                <h3
                  className="text-lg font-semibold text-[#0f172a] mb-3"
                  style={{ fontFamily: "var(--font-geist)" }}
                >
                  {taller.titulo}
                </h3>

                {taller.descripcion && (
                  <p className="text-sm text-[#64748b] mb-4 leading-relaxed flex-1">
                    {taller.descripcion}
                  </p>
                )}

                <div className="space-y-1.5 text-sm text-[#64748b] mb-4">
                  {taller.fecha && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 shrink-0" />
                      {formatDate(taller.fecha)}
                    </div>
                  )}
                  {taller.ciudad && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      {taller.ciudad}
                    </div>
                  )}
                  {taller.cupos_disponibles !== null && (
                    <div className="flex items-center gap-2">
                      <Users className="h-3.5 w-3.5 shrink-0" />
                      {taller.cupos_disponibles} cupos disponibles
                    </div>
                  )}
                </div>

                {taller.precio && (
                  <p className="text-lg font-bold text-[#2563eb] mb-4">{taller.precio}</p>
                )}

                <Link
                  href={`/contacto?taller=${taller.id}`}
                  className={cn(buttonVariants(), "w-full rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] mt-auto inline-flex items-center justify-center text-sm font-medium text-white")}
                >
                  Reservar cupo
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
