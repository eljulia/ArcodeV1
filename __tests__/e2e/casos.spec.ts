import { test, expect } from "@playwright/test";

test.describe("Casos page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/casos");
  });

  test("shows heading 'Resultados reales'", async ({ page }) => {
    await expect(page.getByText("Resultados reales.")).toBeVisible();
  });

  test("renders sector filter buttons", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Todos" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Restaurantes" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Spas & Salud" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Profesionales" }).first()).toBeVisible();
  });

  test("filters by restaurante sector", async ({ page }) => {
    await page.getByRole("link", { name: "Restaurantes" }).first().click();
    await expect(page).toHaveURL(/sector=restaurante/);
    await expect(page.getByText("Resultados reales.")).toBeVisible();
  });

  test("filters by spa sector", async ({ page }) => {
    await page.getByRole("link", { name: "Spas & Salud" }).first().click();
    await expect(page).toHaveURL(/sector=spa/);
  });

  test("clicking 'Todos' goes back to all cases", async ({ page }) => {
    // First navigate to a filter
    await page.goto("/casos?sector=restaurante");
    // Then click Todos
    await page.getByRole("link", { name: "Todos" }).first().click();
    await expect(page).toHaveURL(/\/casos$/);
  });

  test("navigates to first case if one exists", async ({ page }) => {
    const firstCaseLink = page.getByRole("link", { name: /ver caso completo/i }).first();
    const count = await firstCaseLink.count();
    if (count > 0) {
      const href = await firstCaseLink.getAttribute("href");
      expect(href).toMatch(/^\/casos\/.+/);
      await firstCaseLink.click();
      await expect(page).toHaveURL(/\/casos\/.+/);
    } else {
      await expect(page.getByText(/aún no hay casos/i)).toBeVisible();
    }
  });
});
