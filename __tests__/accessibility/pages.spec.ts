import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pagesToTest = [
  { name: "Home", path: "/" },
  { name: "Servicios", path: "/servicios" },
  { name: "Casos", path: "/casos" },
  { name: "Contacto", path: "/contacto" },
  { name: "Sobre", path: "/sobre" },
  { name: "Precios", path: "/precios" },
];

for (const { name, path } of pagesToTest) {
  test(`${name} page has no critical accessibility violations`, async ({ page }) => {
    await page.goto(path);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const criticalViolations = accessibilityScanResults.violations.filter(
      (v) => v.impact === "critical"
    );

    expect(criticalViolations).toEqual([]);
  });
}
