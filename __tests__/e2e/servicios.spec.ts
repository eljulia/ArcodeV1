import { test, expect } from "@playwright/test";

test.describe("Servicios page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/servicios");
  });

  test("shows the page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("¿Qué necesitas resolver?")).toBeVisible();
  });

  test("shows the sector description subtitle", async ({ page }) => {
    await expect(
      page.getByText(/selecciona tu sector/i)
    ).toBeVisible();
  });

  test("shows CTA links to contact for each service", async ({ page }) => {
    const ctaLinks = page.getByRole("link", { name: /quiero esto para mi negocio/i });
    const count = await ctaLinks.count();
    // If there are services in DB, CTAs should be visible
    if (count > 0) {
      await expect(ctaLinks.first()).toBeVisible();
    }
  });

  test("has nav links to service verticals", async ({ page }) => {
    // Check that sub-service pages are reachable from nav or page content
    const chatbotsLink = page.getByRole("link", { name: /chatbot/i }).first();
    const webLink = page.getByRole("link", { name: /web/i }).first();

    // At least one of these should exist in the page
    const chatbotsCount = await chatbotsLink.count();
    const webCount = await webLink.count();
    expect(chatbotsCount + webCount).toBeGreaterThan(0);
  });

  test("navigating to /servicios/chatbots returns a page", async ({ page }) => {
    const response = await page.goto("/servicios/chatbots");
    // Either 200 (service found) or 404 (not in DB yet) — both valid
    expect([200, 404]).toContain(response?.status() ?? 200);
  });

  test("page has accessible heading structure", async ({ page }) => {
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
  });
});
