export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          nombre: string;
          email: string;
          tipo_negocio: "restaurante" | "spa" | "profesional" | "pyme" | "otro";
          necesidad: string | null;
          telefono: string | null;
          fuente: string | null;
          landing_origen: string | null;
          estado: "nuevo" | "contactado" | "calificado" | "cerrado" | "descartado";
          notas: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          nombre: string;
          email: string;
          tipo_negocio: "restaurante" | "spa" | "profesional" | "pyme" | "otro";
          necesidad?: string | null;
          telefono?: string | null;
          fuente?: string | null;
          landing_origen?: string | null;
          estado?: "nuevo" | "contactado" | "calificado" | "cerrado" | "descartado";
          notas?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
      };
      casos: {
        Row: {
          id: string;
          slug: string;
          empresa: string;
          sector: "restaurante" | "spa" | "profesional" | "pyme";
          problema: string;
          solucion: string;
          servicio_utilizado: "chatbots" | "web" | "flow" | "academia";
          metrica_principal: string;
          tiempo_implementacion: string | null;
          contexto: string | null;
          resultado_detalle: Record<string, unknown> | null;
          cita_cliente: string | null;
          imagen_url: string | null;
          publicado: boolean;
          orden: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["casos"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["casos"]["Insert"]>;
      };
      servicios: {
        Row: {
          id: string;
          slug: string;
          nombre: string;
          descripcion_corta: string;
          problema: string;
          solucion: string;
          precio_base: string | null;
          verticales: string[] | null;
          orden: number;
          activo: boolean;
        };
        Insert: Omit<Database["public"]["Tables"]["servicios"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["servicios"]["Insert"]>;
      };
      precios: {
        Row: {
          id: string;
          servicio_id: string;
          nivel: "entrada" | "crecimiento" | "premium";
          nombre: string;
          precio: string;
          caracteristicas: string[];
          destacado: boolean;
          orden: number;
        };
        Insert: Omit<Database["public"]["Tables"]["precios"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["precios"]["Insert"]>;
      };
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          titulo: string;
          contenido: string;
          extracto: string | null;
          imagen_url: string | null;
          tags: string[] | null;
          publicado: boolean;
          published_at: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["blog_posts"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["blog_posts"]["Insert"]>;
      };
      talleres: {
        Row: {
          id: string;
          titulo: string;
          tipo: "presencial" | "in-company" | "online";
          ciudad: string | null;
          fecha: string | null;
          precio: string | null;
          cupos_disponibles: number | null;
          descripcion: string | null;
          activo: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["talleres"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["talleres"]["Insert"]>;
      };
      suscriptores: {
        Row: {
          id: string;
          email: string;
          nombre: string | null;
          recurso_descargado: string | null;
          fuente: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["suscriptores"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["suscriptores"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
