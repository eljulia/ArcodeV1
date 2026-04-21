import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("shows hero heading and CTAs", async ({ page }) => {
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByRole("link", { name: /demo gratuita/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /whatsapp/i })).toBeVisible();
  });

  test("WhatsApp float button is visible", async ({ page }) => {
    const btn = page.getByTestId("whatsapp-float");
    await expect(btn).toBeVisible();
    const href = await btn.getAttribute("href");
    expect(href).toContain("wa.me");
  });

  test("navbar contains main links", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Servicios" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Casos" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Precios" }).first()).toBeVisible();
  });

  test("problem section shows 3 pain points", async ({ page }) => {
    const cards = page.locator("text=Restaurantes, text=Spas & Salud, text=Profesionales");
    await expect(page.getByText("¿Te suena familiar?")).toBeVisible();
  });

  test("how it works shows 3 steps", async ({ page }) => {
    await expect(page.getByText("Cómo funciona")).toBeVisible();
    await expect(page.getByText("Diagnóstico gratuito")).toBeVisible();
    await expect(page.getByText("Implementación")).toBeVisible();
    await expect(page.getByText("Resultado medible")).toBeVisible();
  });
});
