import { z } from "zod";

export const subscribeSchema = z.object({
  email: z.string().email("Ingresa un correo válido"),
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres").optional(),
  recurso_descargado: z.string().optional(),
});

export type SubscribeFormData = z.infer<typeof subscribeSchema>;
