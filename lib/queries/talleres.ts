import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

type Taller = Database["public"]["Tables"]["talleres"]["Row"];

export async function getTalleres(): Promise<Taller[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("talleres")
    .select("*")
    .eq("activo", true)
    .order("fecha", { ascending: true });

  if (error) {
    console.error("getTalleres error:", error);
    return [];
  }
  return data ?? [];
}

export async function getTallerById(id: string): Promise<Taller | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("talleres")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("getTallerById error:", error);
    return null;
  }
  return data;
}
