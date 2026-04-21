import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock must be hoisted before the import of the module under test
vi.mock("@/lib/supabase/admin", () => ({
  createAdminClient: vi.fn(),
}));

import { insertLead } from "@/lib/queries/leads";
import { createAdminClient } from "@/lib/supabase/admin";

const mockInsert = vi.fn();
const mockFrom = vi.fn().mockReturnValue({ insert: mockInsert });

beforeEach(() => {
  vi.clearAllMocks();
  (createAdminClient as ReturnType<typeof vi.fn>).mockReturnValue({ from: mockFrom });
});

describe("insertLead", () => {
  it("calls supabase insert with the correct data and returns ok: true on success", async () => {
    mockInsert.mockResolvedValueOnce({ data: { id: "abc-123" }, error: null });

    const leadData = {
      nombre: "María García",
      email: "maria@restaurante.com",
      tipo_negocio: "restaurante" as const,
      necesidad: "Automatizar reservas",
      telefono: "3101234567",
      fuente: "formulario" as const,
      landing_origen: "https://arcode.ia",
    };

    const result = await insertLead(leadData);

    expect(mockFrom).toHaveBeenCalledWith("leads");
    expect(mockInsert).toHaveBeenCalledWith(leadData);
    expect(result).toEqual({ ok: true });
  });

  it("returns ok: false with error message when supabase returns an error", async () => {
    mockInsert.mockResolvedValueOnce({
      data: null,
      error: { message: "duplicate key value" },
    });

    const result = await insertLead({
      nombre: "Juan",
      email: "juan@test.com",
      tipo_negocio: "spa" as const,
    });

    expect(result.ok).toBe(false);
    expect(result.error).toBe("duplicate key value");
  });

  it("calls createAdminClient once per invocation", async () => {
    mockInsert.mockResolvedValueOnce({ data: {}, error: null });

    await insertLead({
      nombre: "Test",
      email: "test@test.com",
      tipo_negocio: "pyme" as const,
    });

    expect(createAdminClient).toHaveBeenCalledTimes(1);
  });
});
