import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";

const applications = [
  ["FDTD", "https://jorpago2.github.io/fdtd-2d-simulator/"],
  ["Drift–Diffusion", "https://jorpago2.github.io/drift-difussion-simulator/"],
  ["RF", "https://jorpago2.github.io/rf-web-simulator/"],
  ["Waveguide", "https://jorpago2.github.io/waveguide-mode-solver/"],
  ["GDS2GOO", "https://jorpago2.github.io/gds2goo/"],
  ["SpinCoatSim", "https://jorpago2.github.io/spincoatsim/"],
  ["Reflectometry", "https://jorpago2.github.io/reflectometry/"],
  ["SetupSketch", "https://jorpago2.github.io/setupsketch/"],
];
const widths = [320, 375, 414, 768, 1024, 1440];
const browser = await chromium.launch();
const results = [];

try {
  for (const [application, defaultUrl] of applications) {
    const url = process.env[`INTERFACE_URL_${application.toUpperCase().replaceAll(/[^A-Z0-9]+/g, "_")}`] ?? defaultUrl;
    for (const width of widths) {
      const page = await browser.newPage({ viewport: { width, height: width < 600 ? 844 : 900 }, reducedMotion: "reduce" });
      const consoleErrors = [];
      page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
      const response = await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
      const checks = await page.evaluate(() => {
        const documentWidth = document.documentElement.scrollWidth;
        const viewportWidth = document.documentElement.clientWidth;
        const mainCount = document.querySelectorAll("main").length;
        const namedPrimaryAction = [...document.querySelectorAll("button, a")].some((element) => {
          const text = `${element.textContent ?? ""} ${element.getAttribute("aria-label") ?? ""}`;
          return /run|solve|simulate|calculate|load|export|fit|add|configure/i.test(text) && element.getBoundingClientRect().width > 0;
        });
        const unnamedControls = [...document.querySelectorAll("button, input, select, textarea")].filter((element) => {
          const rect = element.getBoundingClientRect();
          if (element.hidden || element.getAttribute("aria-hidden") === "true" || rect.width === 0 || rect.height === 0) return false;
          const labels = element.labels?.length ?? 0;
          const name = element.getAttribute("aria-label") || element.getAttribute("aria-labelledby") || element.textContent?.trim();
          return labels === 0 && !name && element.getAttribute("type") !== "hidden";
        }).length;
        return {
          overflow: Math.max(0, documentWidth - viewportWidth),
          mainCount,
          namedPrimaryAction,
          unnamedControls,
          title: document.title,
        };
      });
      const failures = [];
      if (!response?.ok()) failures.push(`HTTP ${response?.status() ?? "no response"}`);
      if (checks.overflow > 1) failures.push(`horizontal overflow ${checks.overflow}px`);
      if (checks.mainCount !== 1) failures.push(`expected one main landmark, found ${checks.mainCount}`);
      if (!checks.namedPrimaryAction) failures.push("primary action not identifiable");
      if (checks.unnamedControls > 0) failures.push(`${checks.unnamedControls} unnamed controls`);
      if (consoleErrors.length) failures.push(`${consoleErrors.length} console errors`);
      results.push({ application, url, width, checks, consoleErrors, failures });
      await page.close();
    }
  }
} finally {
  await browser.close();
}

await writeFile("interface-conformance-results.json", `${JSON.stringify(results, null, 2)}\n`, "utf8");
const failed = results.filter((result) => result.failures.length > 0);
for (const result of failed) console.error(`${result.application} @ ${result.width}px: ${result.failures.join("; ")}`);
console.log(`${results.length - failed.length}/${results.length} interface viewport checks passed.`);
if (failed.length) process.exitCode = 1;
