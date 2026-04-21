import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

type Caso = Database["public"]["Tables"]["casos"]["Row"];

export async function getCasos(limit?: number): Promise<Caso[]> {
  const supabase = await createClient();
  let query = supabase
    .from("casos")
    .select("*")
    .eq("publicado", true)
    .order("orden", { ascending: true });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  if (error) {
    console.error("getCasos error:", error);
    return [];
  }
  return data ?? [];
}

export async function getCasoBySlug(slug: string): Promise<Caso | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("casos")
    .select("*")
    .eq("slug", slug)
    .eq("publicado", true)
    .single();

  if (error) {
    console.error("getCasoBySlug error:", error);
    return null;
  }
  return data;
}

export async function getCasosBySector(sector: string): Promise<Caso[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("casos")
    .select("*")
    .eq("publicado", true)
    .eq("sector", sector)
    .order("orden", { ascending: true });

  if (error) {
    console.error("getCasosBySector error:", error);
    return [];
  }
  return data ?? [];
}
