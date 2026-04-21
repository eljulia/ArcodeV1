import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/components/shared/ContactForm";

// Mock fetch globally
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

beforeEach(() => {
  vi.clearAllMocks();
});

describe("ContactForm", () => {
  it("renders all required fields", () => {
    render(<ContactForm />);

    expect(screen.getByPlaceholderText("Tu nombre")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("tucorreo@empresa.com")).toBeInTheDocument();
    expect(screen.getByText("Tipo de negocio *")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("3XX XXX XXXX")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /enviar mensaje/i })).toBeInTheDocument();
  });

  it("shows validation errors when submitting with empty required fields", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));

    await waitFor(() => {
      expect(screen.getByText(/debe tener al menos 2 caracteres/i)).toBeInTheDocument();
    });
  });

  it("shows email validation error for invalid email", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByPlaceholderText("Tu nombre"), "Juan");
    await user.type(screen.getByPlaceholderText("tucorreo@empresa.com"), "not-an-email");
    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));

    await waitFor(() => {
      expect(screen.getByText(/correo válido/i)).toBeInTheDocument();
    });
  });

  it("shows success message after successful submission", async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ ok: true }),
    });

    render(<ContactForm />);

    await user.type(screen.getByPlaceholderText("Tu nombre"), "Juan Pérez");
    await user.type(screen.getByPlaceholderText("tucorreo@empresa.com"), "juan@test.com");

    // Open select and pick an option
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByText("Restaurante / Bar / Cafetería"));

    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));

    await waitFor(() => {
      expect(screen.getByText(/mensaje recibido/i)).toBeInTheDocument();
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({ method: "POST" })
    );
  });

  it("shows server error message on failed submission", async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ ok: false, error: "Error del servidor" }),
    });

    render(<ContactForm />);

    await user.type(screen.getByPlaceholderText("Tu nombre"), "Ana López");
    await user.type(screen.getByPlaceholderText("tucorreo@empresa.com"), "ana@test.com");

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByText("Spa / Salud / Bienestar"));

    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));

    await waitFor(() => {
      expect(screen.getByText("Error del servidor")).toBeInTheDocument();
    });
  });
});
