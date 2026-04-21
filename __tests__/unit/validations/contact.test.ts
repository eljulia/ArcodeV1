import { describe, it, expect } from "vitest";
import { contactSchema } from "@/lib/validations/contact";

describe("contactSchema", () => {
  it("validates a valid form submission", () => {
    const result = contactSchema.safeParse({
      nombre: "Juan Pérez",
      email: "juan@ejemplo.com",
      tipo_negocio: "restaurante",
    });
    expect(result.success).toBe(true);
  });

  it("rejects missing nombre", () => {
    const result = contactSchema.safeParse({
      email: "juan@ejemplo.com",
      tipo_negocio: "restaurante",
    });
    expect(result.success).toBe(false);
  });

  it("rejects nombre shorter than 2 chars", () => {
    const result = contactSchema.safeParse({
      nombre: "J",
      email: "juan@ejemplo.com",
      tipo_negocio: "restaurante",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.nombre).toBeDefined();
    }
  });

  it("rejects invalid email", () => {
    const result = contactSchema.safeParse({
      nombre: "Juan",
      email: "not-an-email",
      tipo_negocio: "restaurante",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid tipo_negocio", () => {
    const result = contactSchema.safeParse({
      nombre: "Juan",
      email: "juan@ejemplo.com",
      tipo_negocio: "empresa_desconocida",
    });
    expect(result.success).toBe(false);
  });

  it("accepts optional fields as undefined", () => {
    const result = contactSchema.safeParse({
      nombre: "Juan Pérez",
      email: "juan@ejemplo.com",
      tipo_negocio: "spa",
      necesidad: undefined,
      telefono: undefined,
    });
    expect(result.success).toBe(true);
  });

  it("rejects necesidad longer than 500 chars", () => {
    const result = contactSchema.safeParse({
      nombre: "Juan",
      email: "juan@ejemplo.com",
      tipo_negocio: "profesional",
      necesidad: "a".repeat(501),
    });
    expect(result.success).toBe(false);
  });

  it("accepts all valid tipo_negocio values", () => {
    const tipos = ["restaurante", "spa", "profesional", "pyme", "otro"] as const;
    tipos.forEach((tipo) => {
      const result = contactSchema.safeParse({
        nombre: "Test",
        email: "test@test.com",
        tipo_negocio: tipo,
      });
      expect(result.success).toBe(true);
    });
  });
});
