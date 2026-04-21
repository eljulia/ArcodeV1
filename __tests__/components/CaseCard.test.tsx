import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CaseCard } from "@/components/shared/CaseCard";
import type { Database } from "@/lib/supabase/types";

type Caso = Database["public"]["Tables"]["casos"]["Row"];

const mockCaso: Caso = {
  id: "test-id-1",
  slug: "restaurante-el-sabor",
  empresa: "Restaurante El Sabor",
  sector: "restaurante",
  problema: "Perdían 3 horas diarias respondiendo mensajes de WhatsApp.",
  solucion: "Implementamos un chatbot que gestiona reservas y preguntas frecuentes.",
  servicio_utilizado: "chatbots",
  metrica_principal: "+40% reservas en 30 días",
  tiempo_implementacion: "2 semanas",
  contexto: null,
  resultado_detalle: null,
  cita_cliente: "El chatbot atiende a nuestros clientes mejor que nosotros.",
  imagen_url: null,
  publicado: true,
  orden: 1,
  created_at: "2024-01-01T00:00:00Z",
};

describe("CaseCard", () => {
  it("displays the company name", () => {
    render(<CaseCard caso={mockCaso} />);
    expect(screen.getByText("Restaurante El Sabor")).toBeInTheDocument();
  });

  it("shows the sector as a badge", () => {
    render(<CaseCard caso={mockCaso} />);
    expect(screen.getByText("Restaurante")).toBeInTheDocument();
  });

  it("shows the main metric", () => {
    render(<CaseCard caso={mockCaso} />);
    expect(screen.getByText("+40% reservas en 30 días")).toBeInTheDocument();
  });

  it("renders a 'Ver caso completo' link", () => {
    render(<CaseCard caso={mockCaso} />);
    const link = screen.getByRole("link", { name: /ver caso completo/i });
    expect(link).toBeInTheDocument();
    expect(link.getAttribute("href")).toBe("/casos/restaurante-el-sabor");
  });

  it("shows the client quote when available", () => {
    render(<CaseCard caso={mockCaso} />);
    expect(
      screen.getByText(/el chatbot atiende a nuestros clientes/i)
    ).toBeInTheDocument();
  });

  it("shows implementation time when available", () => {
    render(<CaseCard caso={mockCaso} />);
    expect(screen.getByText("2 semanas")).toBeInTheDocument();
  });
});
