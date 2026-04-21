import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/home/Hero";

describe("Hero", () => {
  it("renders the H1 heading as visible", () => {
    render(<Hero />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toBeInTheDocument();
    expect(h1).toBeVisible();
  });

  it("shows a CTA link with 'demo gratuita' text", () => {
    render(<Hero />);
    const ctaLink = screen.getByRole("link", { name: /demo gratuita/i });
    expect(ctaLink).toBeInTheDocument();
    expect(ctaLink).toBeVisible();
  });

  it("shows a WhatsApp link", () => {
    render(<Hero />);
    const waLink = screen.getByRole("link", { name: /whatsapp/i });
    expect(waLink).toBeInTheDocument();
    expect(waLink.getAttribute("href")).toContain("wa.me");
  });
});
