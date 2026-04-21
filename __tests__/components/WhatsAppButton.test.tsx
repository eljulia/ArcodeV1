import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

describe("WhatsAppButton", () => {
  it("renders the WhatsApp float button", () => {
    render(<WhatsAppButton />);
    const btn = screen.getByTestId("whatsapp-float");
    expect(btn).toBeInTheDocument();
  });

  it("href contains wa.me", () => {
    render(<WhatsAppButton />);
    const btn = screen.getByTestId("whatsapp-float");
    const href = btn.getAttribute("href");
    expect(href).toContain("wa.me");
  });

  it("has data-testid='whatsapp-float'", () => {
    render(<WhatsAppButton />);
    expect(screen.getByTestId("whatsapp-float")).toBeInTheDocument();
  });

  it("opens in a new tab", () => {
    render(<WhatsAppButton />);
    const btn = screen.getByTestId("whatsapp-float");
    expect(btn.getAttribute("target")).toBe("_blank");
  });

  it("has accessible aria-label", () => {
    render(<WhatsAppButton />);
    const btn = screen.getByLabelText("Escribir por WhatsApp");
    expect(btn).toBeInTheDocument();
  });
});
