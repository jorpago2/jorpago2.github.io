import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const output = new URL("../out/index.html", import.meta.url);

test("exports the English simulator dashboard", async () => {
  const html = await readFile(output, "utf8");

  await Promise.all([
    access(new URL("../out/fdtd-background.webp", import.meta.url)),
    access(new URL("../out/semiconductor-background.webp", import.meta.url)),
  ]);

  assert.match(html, /<title>Educational simulators<\/title>/);
  assert.match(html, /Assistant Professor at University of Valencia · Photonics · Electronics/);
  assert.match(html, /avatars\.githubusercontent\.com\/u\/297438018\?v=4/);
  assert.match(html, /<link rel="icon" href="\/favicon\.svg"/);
  assert.match(html, /href="https:\/\/github\.com\/jorpago2"[^>]*>GitHub/);
  assert.match(html, /href="https:\/\/www\.uv\.es\/jorpago2"[^>]*>Webpage/);
  assert.doesNotMatch(html, /<a[^>]*class="identity"/);
  assert.match(html, /ENGINEERING · PHYSICS · EDUCATION/);
  assert.match(html, /Learn engineering and physics interactively\./);
  assert.match(html, /Explore electromagnetic waves and semiconductor devices/);
  assert.match(html, /Electromagnetic Wave Simulator/);
  assert.match(html, /2D FDTD · Electromagnetics &amp; photonics/);
  assert.match(html, /Semiconductor Device Simulator/);
  assert.match(html, /1D Drift–Diffusion · PN junction/);
  assert.match(html, /https:\/\/jorpago2\.github\.io\/fdtd-2d-simulator\//);
  assert.match(html, /https:\/\/jorpago2\.github\.io\/drift-difussion-simulator\//);
  assert.match(html, /class="simulator-link"[^>]*target="_blank"/);
  assert.equal((html.match(/class="simulator-link"/g) ?? []).length, 3);
  assert.match(html, /Coming soon/);
  assert.match(html, /New educational simulators and engineering tools/);
  assert.match(html, /RESEARCH SOFTWARE/);
  assert.match(html, /Tools for experimental workflows\./);
  assert.match(html, /GDS2GOO/);
  assert.match(html, /https:\/\/jorpago2\.github\.io\/gds2goo\//);
  assert.match(html, /https:\/\/github\.com\/jorpago2\/gds2goo/);
  assert.match(html, /All processing stays in the browser\./);
  assert.doesNotMatch(html, /Open simulator/);
  assert.doesNotMatch(html, /PCMWriter|PICBench|Explorar|Proyectos/);
});
