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
        const visible = (element) => {
          if (!element) return false;
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
        };
        const header = document.querySelector(".scientific-header");
        const rail = document.querySelector(".scientific-tool-rail");
        const context = document.querySelector(".scientific-header__context");
        const taskPanel = [...document.querySelectorAll(".scientific-task-panel")].find(visible);
        const headerRect = header?.getBoundingClientRect();
        const railRect = rail?.getBoundingClientRect();
        const contextRect = visible(context) ? context.getBoundingClientRect() : null;
        const panelRect = taskPanel?.getBoundingClientRect();
        const activeRailItems = rail ? rail.querySelectorAll('[aria-current="page"]').length : 0;
        const undersizedTouchTargets = window.innerWidth <= 414
          ? [...document.querySelectorAll(".scientific-header button, .scientific-header a, .scientific-tool-rail button, .scientific-task-panel__header button")].filter((element) => {
              if (!visible(element) || element.closest('[aria-hidden="true"]')) return false;
              const rect = element.getBoundingClientRect();
              return rect.width < 44 || rect.height < 44;
            }).length
          : 0;
        return {
          overflow: Math.max(0, documentWidth - viewportWidth),
          viewportWidth,
          mainCount,
          namedPrimaryAction,
          unnamedControls,
          title: document.title,
          headerCount: document.querySelectorAll(".scientific-header").length,
          headerHeight: headerRect?.height ?? 0,
          railCount: document.querySelectorAll(".scientific-tool-rail").length,
          railWidth: railRect?.width ?? 0,
          railHeight: railRect?.height ?? 0,
          activeRailItems,
          contextCenterOffset: contextRect ? Math.abs(contextRect.left + contextRect.width / 2 - window.innerWidth / 2) : 0,
          panelWidth: panelRect?.width ?? null,
          undersizedTouchTargets,
        };
      });
      const failures = [];
      if (!response?.ok()) failures.push(`HTTP ${response?.status() ?? "no response"}`);
      if (checks.overflow > 1) failures.push(`horizontal overflow ${checks.overflow}px`);
      if (checks.mainCount !== 1) failures.push(`expected one main landmark, found ${checks.mainCount}`);
      if (!checks.namedPrimaryAction) failures.push("primary action not identifiable");
      if (checks.unnamedControls > 0) failures.push(`${checks.unnamedControls} unnamed controls`);
      if (checks.headerCount !== 1) failures.push(`expected one shared header, found ${checks.headerCount}`);
      if (Math.abs(checks.headerHeight - 48) > 1) failures.push(`header height ${checks.headerHeight}px`);
      if (checks.railCount !== 1) failures.push(`expected one shared tool rail, found ${checks.railCount}`);
      if (checks.activeRailItems !== 1) failures.push(`expected one active rail item, found ${checks.activeRailItems}`);
      if (width >= 1056 && Math.abs(checks.railWidth - 256) > 1) failures.push(`desktop rail width ${checks.railWidth}px`);
      if (width < 1056 && Math.abs(checks.railHeight - 56) > 1) failures.push(`responsive rail height ${checks.railHeight}px`);
      if (width < 1056 && Math.abs(checks.railWidth - checks.viewportWidth) > 1) failures.push(`responsive rail width ${checks.railWidth}px`);
      if (checks.contextCenterOffset > 8) failures.push(`header context offset ${checks.contextCenterOffset}px`);
      if (checks.panelWidth !== null && width >= 1056 && (checks.panelWidth < 360 || checks.panelWidth > 400)) failures.push(`desktop panel width ${checks.panelWidth}px`);
      if (checks.panelWidth !== null && width <= 414 && checks.panelWidth < checks.viewportWidth - 2) failures.push(`mobile panel width ${checks.panelWidth}px`);
      if (checks.undersizedTouchTargets > 0) failures.push(`${checks.undersizedTouchTargets} touch targets smaller than 44px`);
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
