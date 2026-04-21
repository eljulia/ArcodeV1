import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

type Precio = Database["public"]["Tables"]["precios"]["Row"];

export async function getPrecios(): Promise<Precio[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("precios")
    .select("*")
    .order("orden", { ascending: true });

  if (error) {
    console.error("getPrecios error:", error);
    return [];
  }
  return data ?? [];
}

export async function getPreciosByServicio(servicioId: string): Promise<Precio[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("precios")
    .select("*")
    .eq("servicio_id", servicioId)
    .order("orden", { ascending: true });

  if (error) {
    console.error("getPreciosByServicio error:", error);
    return [];
  }
  return data ?? [];
}
