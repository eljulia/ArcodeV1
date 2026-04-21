import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

type Servicio = Database["public"]["Tables"]["servicios"]["Row"];

export async function getServicios(): Promise<Servicio[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("servicios")
    .select("*")
    .eq("activo", true)
    .order("orden", { ascending: true });

  if (error) {
    console.error("getServicios error:", error);
    return [];
  }
  return data ?? [];
}

export async function getServicioBySlug(slug: string): Promise<Servicio | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("servicios")
    .select("*")
    .eq("slug", slug)
    .eq("activo", true)
    .single();

  if (error) {
    console.error("getServicioBySlug error:", error);
    return null;
  }
  return data;
}
