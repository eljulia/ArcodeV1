import { test, expect } from "@playwright/test";

test.describe("Contacto page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contacto");
  });

  test("shows WhatsApp link prominently", async ({ page }) => {
    const whatsappLink = page.getByRole("link", { name: /whatsapp/i }).first();
    await expect(whatsappLink).toBeVisible();
    const href = await whatsappLink.getAttribute("href");
    expect(href).toContain("wa.me");
  });

  test("contact form renders all required fields", async ({ page }) => {
    await expect(page.getByLabel(/nombre/i)).toBeVisible();
    await expect(page.getByLabel(/correo/i)).toBeVisible();
    await expect(page.getByLabel(/tipo de negocio/i)).toBeVisible();
  });

  test("form shows validation errors on empty submit", async ({ page }) => {
    await page.getByRole("button", { name: /enviar/i }).click();
    await expect(page.getByText(/al menos 2 caracteres/i)).toBeVisible();
  });

  test("WhatsApp float button is visible on contact page", async ({ page }) => {
    await expect(page.getByTestId("whatsapp-float")).toBeVisible();
  });
});
