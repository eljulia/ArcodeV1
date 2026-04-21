import { z } from "zod";

export const contactSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede superar 100 caracteres"),
  email: z.string().email("Ingresa un correo válido"),
  tipo_negocio: z.enum(["restaurante", "spa", "profesional", "pyme", "otro"] as const, {
    error: "Selecciona el tipo de negocio",
  }),
  necesidad: z
    .string()
    .max(500, "La descripción no puede superar 500 caracteres")
    .optional(),
  telefono: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
