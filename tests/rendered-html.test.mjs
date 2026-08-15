import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { selectReleaseAsset } from "../src/github-release.mjs";

const output = new URL("../dist/index.html", import.meta.url);

test("exports the English simulator dashboard", async () => {
  const html = await readFile(output, "utf8");
  const source = await readFile(new URL("../src/App.tsx", import.meta.url), "utf8");
  const mainSource = await readFile(new URL("../src/main.tsx", import.meta.url), "utf8");
  const styles = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");

  await Promise.all([
    access(new URL("../dist/fdtd-background.webp", import.meta.url)),
    access(new URL("../dist/gds2goo-background.webp", import.meta.url)),
    access(new URL("../dist/pcmwriter-background.webp", import.meta.url)),
    access(new URL("../dist/picbench-background.webp", import.meta.url)),
    access(new URL("../dist/reflectometry-background.webp", import.meta.url)),
    access(new URL("../dist/rf-simulator-background.webp", import.meta.url)),
    access(new URL("../dist/semiconductor-background.webp", import.meta.url)),
    access(new URL("../dist/spincoatsim-background.webp", import.meta.url)),
    access(new URL("../dist/waveguide-mode-solver-background.webp", import.meta.url)),
  ]);

  assert.match(html, /<title>Online Simulators &amp; Tools<\/title>/);
  for (const metadata of [
    'name="description"',
    'name="theme-color"',
    'rel="canonical" href="https://jorpago2.github.io/"',
    'property="og:site_name"',
    'property="og:url" content="https://jorpago2.github.io/"',
    'name="twitter:image:alt"',
  ]) assert.match(html, new RegExp(metadata));
  assert.match(html, /Assistant Professor at University of Valencia · Photonics · Electronics/);
  assert.match(html, /avatars\.githubusercontent\.com\/u\/297438018\?v=4/);
  assert.match(html, /<link rel="icon" href="\/favicon\.svg"/);
  assert.match(html, /href="https:\/\/github\.com\/jorpago2"[^>]*>GitHub/);
  assert.match(html, /href="https:\/\/www\.uv\.es\/jorpago2"[^>]*>Webpage/);
  assert.doesNotMatch(html, /<a[^>]*class="identity"/);
  assert.match(html, /ENGINEERING · PHYSICS · EDUCATION/);
  assert.match(html, /Learn engineering and physics interactively\./);
  assert.match(html, /class="skip-link" href="#main-content"/);
  assert.match(html, /<main[^>]*id="main-content"[^>]*tabindex="-1">/);
  const carbon = await readFile(new URL("../src/carbon.scss", import.meta.url), "utf8");
  assert.match(carbon, /@use ["']@carbon\/react["']/);
  assert.doesNotMatch(styles, /tailwindcss|@theme inline/);
  assert.match(source, /<Grid as="main"/);
  assert.match(html, /Explore electromagnetic waves, photonic modes, RF networks/);
  assert.match(html, /Electromagnetic Wave Simulator/);
  assert.match(html, /2D FDTD · Electromagnetics &amp; photonics/);
  assert.match(html, /Semiconductor Device Simulator/);
  assert.match(html, /1D Drift–Diffusion · PN junction/);
  assert.match(html, /https:\/\/jorpago2\.github\.io\/fdtd-2d-simulator\//);
  assert.match(html, /https:\/\/jorpago2\.github\.io\/drift-difussion-simulator\//);
  assert.match(html, /class="simulator-link"[^>]*target="_blank"/);
  assert.equal((html.match(/class="simulator-link"/g) ?? []).length, 11);
  assert.doesNotMatch(html, /Coming soon/);
  assert.match(html, /RF Network Simulator/);
  assert.match(html, /Two-port networks · S-parameters/);
  assert.match(html, /https:\/\/jorpago2\.github\.io\/rf-web-simulator\//);
  assert.match(html, /https:\/\/github\.com\/jorpago2\/rf-web-simulator/);
  assert.match(html, /Waveguide Mode Solver/);
  assert.match(html, /Full-vector FDM · Integrated photonics/);
  assert.match(html, /https:\/\/jorpago2\.github\.io\/waveguide-mode-solver\//);
  assert.match(html, /https:\/\/github\.com\/jorpago2\/waveguide-mode-solver/);
  assert.match(html, /Optothermal Simulator/);
  assert.match(html, /https:\/\/jorpago2\.github\.io\/optothermal_simulator\//);
  assert.match(html, /https:\/\/github\.com\/jorpago2\/optothermal_simulator/);
  assert.match(mainSource, /if \(root\.childElementCount > 0\) hydrateRoot/);
  assert.match(styles, /grid-auto-rows:\s*minmax\(190px, 1fr\)/);
  assert.match(html, />RESEARCH<\/p>/);
  assert.match(html, /Tools for fabrication and optical characterization\./);
  assert.match(
    html,
    /Prepare lithography files, model thin-film processing/,
  );
  assert.doesNotMatch(html, /RESEARCH SOFTWARE/);
  assert.match(html, /GDS2GOO/);
  assert.match(html, /https:\/\/jorpago2\.github\.io\/gds2goo\//);
  assert.match(html, /https:\/\/github\.com\/jorpago2\/gds2goo/);
  assert.match(html, /All processing stays in the browser\./);
  assert.match(html, /SpinCoatSim/);
  assert.match(html, /https:\/\/jorpago2\.github\.io\/spincoatsim\//);
  assert.match(html, /https:\/\/github\.com\/jorpago2\/spincoatsim/);
  assert.match(html, /RPM-calibrated film/);
  assert.match(html, /Reflectometry/);
  assert.match(html, /https:\/\/jorpago2\.github\.io\/reflectometry\//);
  assert.match(html, /https:\/\/github\.com\/jorpago2\/reflectometry/);
  assert.match(html, /Thin-film optics · R\/T fitting/);
  assert.ok((html.match(/React · TypeScript · Vite/g) ?? []).length >= 6);
  assert.doesNotMatch(html, /Next\.js/);
  assert.match(html, /DESKTOP SOFTWARE/);
  assert.match(html, /Laboratory software\./);
  assert.doesNotMatch(html, /Laboratory software for Windows\./);
  assert.match(html, /PCMWriter/);
  assert.match(html, /PICBench/);
  assert.match(html, /PCMWriter-Windows-x64-v0\.5\.0\.zip/);
  assert.match(html, /picbench\/releases\/download\/v0\.2\.0\/PICBench\.exe/);
  assert.match(html, /Download PCMWriter v0\.5\.0 for Windows/);
  assert.match(html, /Download PICBench v0\.2\.0 for Windows/);
  assert.match(html, /Built for open research and hands-on learning\./);
  assert.match(html, /aria-label="Footer links"/);
  assert.match(html, /href="#top">Back to top/);
  assert.doesNotMatch(html, /Open simulator/);
  assert.doesNotMatch(html, /Explorar|Proyectos/);
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
