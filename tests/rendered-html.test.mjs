import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { selectReleaseAsset } from "../src/github-release.mjs";

const output = new URL("../dist/index.html", import.meta.url);

test("exports the Carbon scientific tools index", async () => {
  const html = await readFile(output, "utf8");
  const renderedText = html.replaceAll("<!-- -->", "");
  const source = await readFile(new URL("../src/App.tsx", import.meta.url), "utf8");
  const styles = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");
  const carbon = await readFile(new URL("../src/carbon.scss", import.meta.url), "utf8");
  const document = await readFile(new URL("../index.html", import.meta.url), "utf8");

  await Promise.all([
    "fdtd-background.webp",
    "gds2goo-background.webp",
    "pcmwriter-background.webp",
    "picbench-background.webp",
    "reflectometry-background.webp",
    "rf-simulator-background.webp",
    "semiconductor-background.webp",
    "setupsketch-background.webp",
    "spincoatsim-background.webp",
    "waveguide-mode-solver-background.webp",
  ].map((asset) => access(new URL(`../dist/${asset}`, import.meta.url))));

  assert.match(html, /<title>Online Simulators &amp; Tools<\/title>/);
  for (const metadata of [
    'name="description"',
    'name="theme-color"',
    'rel="canonical" href="https://jorpago2.github.io/"',
    'property="og:site_name"',
    'property="og:url" content="https://jorpago2.github.io/"',
    'name="twitter:image:alt"',
  ]) assert.match(html, new RegExp(metadata));

  assert.match(carbon, /@use ["']@carbon\/react["']/);
  assert.match(source, /HeaderContainer/);
  assert.match(source, /HeaderMenuButton/);
  assert.match(source, /SideNav/);
  assert.match(source, /<Grid as="section"/);
  assert.match(source, /<Tile className="tool-tile">/);
  assert.match(source, /<Tag size="sm"/);
  assert.doesNotMatch(document, /fonts\.googleapis|fonts\.gstatic/);
  assert.doesNotMatch(styles, /tailwindcss|repeating-radial-gradient|body::before/);

  assert.match(html, /class="cds--header"/);
  assert.match(html, /class="cds--skip-to-content" href="#main-content"/);
  assert.match(html, /<main id="main-content" tabindex="-1" class="cds--content site-main">/);
  assert.match(html, /aria-label="Primary navigation"/);
  assert.match(html, /aria-label="Mobile navigation"/);
  assert.equal((html.match(/<h1/g) ?? []).length, 1);
  assert.equal((html.match(/class="cds--tile tool-tile"/g) ?? []).length, 10);
  assert.equal((html.match(/simulator-link/g) ?? []).length, 10);

  for (const text of [
    "Learn engineering and physics interactively.",
    "Electromagnetic Wave Simulator",
    "Semiconductor Device Simulator",
    "RF Network Simulator",
    "Waveguide Mode Solver",
    "GDS2GOO",
    "SpinCoatSim",
    "Reflectometry",
    "SetupSketch",
    "PCMWriter",
    "PICBench",
    "Built for open research and hands-on learning.",
  ]) assert.match(html, new RegExp(text));

  for (const href of [
    "https://jorpago2.github.io/fdtd-2d-simulator/",
    "https://jorpago2.github.io/drift-difussion-simulator/",
    "https://jorpago2.github.io/rf-web-simulator/",
    "https://jorpago2.github.io/waveguide-mode-solver/",
    "https://jorpago2.github.io/gds2goo/",
    "https://jorpago2.github.io/spincoatsim/",
    "https://jorpago2.github.io/reflectometry/",
    "https://jorpago2.github.io/setupsketch/",
  ]) assert.match(html, new RegExp(href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));

  assert.match(html, /PCMWriter-Windows-x64-v0\.5\.0\.zip/);
  assert.match(html, /picbench\/releases\/download\/v0\.2\.0\/PICBench\.exe/);
  assert.match(renderedText, /Download PCMWriter/);
  assert.match(renderedText, /Download PICBench/);
  assert.doesNotMatch(html, /Coming soon|Next\.js|Explorar|Proyectos/);
});

test("selects release downloads instead of checksum files", () => {
  const assets = [
    { name: "Tool.exe.sha256", browser_download_url: "checksum" },
    { name: "Tool.exe", browser_download_url: "download" },
  ];

  assert.equal(
    selectReleaseAsset(assets, ".exe")?.browser_download_url,
    "download",
  );
  assert.equal(selectReleaseAsset(assets, ".zip"), undefined);
});
