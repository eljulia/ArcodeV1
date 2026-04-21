import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { insertLead } from "@/lib/queries/leads";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { nombre, email, tipo_negocio, necesidad, telefono } = parsed.data;

    const referer = req.headers.get("referer") ?? undefined;

    const result = await insertLead({
      nombre,
      email,
      tipo_negocio,
      necesidad: necesidad ?? null,
      telefono: telefono ?? null,
      fuente: "formulario",
      landing_origen: referer ?? null,
    });

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: "Error al guardar. Intenta de nuevo." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("/api/contact error:", err);
    return NextResponse.json(
      { ok: false, error: "Error inesperado." },
      { status: 500 }
    );
  }
}
