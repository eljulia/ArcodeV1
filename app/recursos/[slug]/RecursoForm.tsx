"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface RecursoFormProps {
  slug: string;
}

export function RecursoForm({ slug }: RecursoFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, recurso_descargado: slug }),
      });
      const json = await res.json();
      if (json.ok) {
        setSubmitted(true);
      } else {
        setError(json.error ?? "Ocurrió un error. Intenta de nuevo.");
      }
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-8 gap-4">
        <CheckCircle2 className="h-12 w-12 text-[#10b981]" />
        <h2
          className="text-xl font-semibold text-[#0f172a]"
          style={{ fontFamily: "var(--font-geist)" }}
        >
          ¡Recurso enviado!
        </h2>
        <p className="text-[#64748b] max-w-sm">
          Revisa tu correo en los próximos minutos. Si no lo encuentras, mira en spam.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <h2
        className="text-lg font-semibold text-[#0f172a] mb-1"
        style={{ fontFamily: "var(--font-geist)" }}
      >
        Recíbelo en tu correo
      </h2>
      <p className="text-sm text-[#64748b] mb-4">
        Es gratis. Te enviamos el recurso de inmediato.
      </p>

      <div>
        <label className="block text-sm font-medium text-[#0f172a] mb-1.5">Nombre *</label>
        <Input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Tu nombre"
          className="rounded-lg border-[#e2e8f0]"
          required
          minLength={2}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#0f172a] mb-1.5">
          Correo electrónico *
        </label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="tucorreo@empresa.com"
          className="rounded-lg border-[#e2e8f0]"
          required
        />
      </div>

      {error && (
        <p className="text-sm text-[#ef4444] bg-[#ef4444]/10 px-4 py-2 rounded-lg">{error}</p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] h-11"
      >
        {isSubmitting ? "Enviando..." : "Descargar gratis"}
      </Button>

      <p className="text-xs text-[#94a3b8] text-center">
        Sin spam. Puedes darte de baja cuando quieras.
      </p>
    </form>
  );
}
