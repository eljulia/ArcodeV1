import { NextRequest, NextResponse } from "next/server";
import { subscribeSchema } from "@/lib/validations/subscribe";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = subscribeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email, nombre, recurso_descargado } = parsed.data;

    const supabase = createAdminClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from("suscriptores").insert({
      email,
      nombre: nombre ?? null,
      recurso_descargado: recurso_descargado ?? null,
      fuente: "recursos",
    });

    if (error) {
      console.error("/api/subscribe error:", error);
      return NextResponse.json(
        { ok: false, error: "Error al guardar. Intenta de nuevo." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("/api/subscribe unexpected error:", err);
    return NextResponse.json({ ok: false, error: "Error inesperado." }, { status: 500 });
  }
}
