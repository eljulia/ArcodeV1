import { createAdminClient } from "@/lib/supabase/admin";
import type { Database } from "@/lib/supabase/types";

export type LeadInsert = Database["public"]["Tables"]["leads"]["Insert"];

export async function insertLead(data: LeadInsert): Promise<{ ok: boolean; error?: string }> {
  const supabase = createAdminClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any).from("leads").insert(data);

  if (error) {
    console.error("insertLead error:", error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}
