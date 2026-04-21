import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("can navigate from home to contacto", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /demo gratuita/i }).first().click();
    await expect(page).toHaveURL("/contacto");
  });

  test("can navigate to servicios", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Servicios" }).first().click();
    await expect(page).toHaveURL("/servicios");
  });

  test("can navigate to casos", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Casos" }).first().click();
    await expect(page).toHaveURL(/\/casos/);
  });

  test("can navigate to precios", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Precios" }).first().click();
    await expect(page).toHaveURL("/precios");
  });

  test("WhatsApp button is present on all core pages", async ({ page }) => {
    const pages = ["/", "/servicios", "/casos", "/precios", "/sobre", "/contacto"];
    for (const path of pages) {
      await page.goto(path);
      await expect(page.getByTestId("whatsapp-float")).toBeVisible();
    }
  });
});
