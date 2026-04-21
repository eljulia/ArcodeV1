"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "@/lib/validations/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2 } from "lucide-react";

const tiposNegocio = [
  { value: "restaurante", label: "Restaurante / Bar / Cafetería" },
  { value: "spa", label: "Spa / Salud / Bienestar" },
  { value: "profesional", label: "Profesional independiente" },
  { value: "pyme", label: "PYME / Empresa" },
  { value: "otro", label: "Otro" },
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.ok) {
        setSubmitted(true);
      } else {
        setServerError(json.error ?? "Ocurrió un error. Intenta de nuevo.");
      }
    } catch {
      setServerError("Error de conexión. Intenta de nuevo.");
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
        <CheckCircle2 className="h-12 w-12 text-[#10b981]" />
        <h3
          className="text-xl font-semibold text-[#0f172a]"
          style={{ fontFamily: "var(--font-geist)" }}
        >
          ¡Mensaje recibido!
        </h3>
        <p className="text-[#64748b] max-w-sm">
          Te contactaré en menos de 24 horas. También puedes escribirme por WhatsApp si prefieres respuesta inmediata.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium text-[#0f172a] mb-1.5">
          Nombre *
        </label>
        <Input
          {...register("nombre")}
          placeholder="Tu nombre"
          className="rounded-lg border-[#e2e8f0]"
        />
        {errors.nombre && (
          <p className="text-xs text-[#ef4444] mt-1">{errors.nombre.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-[#0f172a] mb-1.5">
          Correo electrónico *
        </label>
        <Input
          {...register("email")}
          type="email"
          placeholder="tucorreo@empresa.com"
          className="rounded-lg border-[#e2e8f0]"
        />
        {errors.email && (
          <p className="text-xs text-[#ef4444] mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Tipo negocio */}
      <div>
        <label className="block text-sm font-medium text-[#0f172a] mb-1.5">
          Tipo de negocio *
        </label>
        <Select onValueChange={(v) => setValue("tipo_negocio", v as ContactFormData["tipo_negocio"])}>
          <SelectTrigger className="rounded-lg border-[#e2e8f0]">
            <SelectValue placeholder="Selecciona tu tipo de negocio" />
          </SelectTrigger>
          <SelectContent>
            {tiposNegocio.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.tipo_negocio && (
          <p className="text-xs text-[#ef4444] mt-1">{errors.tipo_negocio.message}</p>
        )}
      </div>

      {/* Teléfono */}
      <div>
        <label className="block text-sm font-medium text-[#0f172a] mb-1.5">
          WhatsApp / Teléfono
        </label>
        <Input
          {...register("telefono")}
          placeholder="3XX XXX XXXX"
          className="rounded-lg border-[#e2e8f0]"
        />
      </div>

      {/* Necesidad */}
      <div>
        <label className="block text-sm font-medium text-[#0f172a] mb-1.5">
          ¿Qué quieres automatizar?
        </label>
        <Textarea
          {...register("necesidad")}
          placeholder="Cuéntame en una o dos líneas qué problema quieres resolver..."
          className="rounded-lg border-[#e2e8f0] resize-none"
          rows={3}
        />
        {errors.necesidad && (
          <p className="text-xs text-[#ef4444] mt-1">{errors.necesidad.message}</p>
        )}
      </div>

      {serverError && (
        <p className="text-sm text-[#ef4444] bg-[#ef4444]/10 px-4 py-2 rounded-lg">
          {serverError}
        </p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] h-11"
      >
        {isSubmitting ? "Enviando..." : "Enviar mensaje"}
      </Button>

      <p className="text-xs text-[#94a3b8] text-center">
        Tu información es confidencial. No spam.
      </p>
    </form>
  );
}
