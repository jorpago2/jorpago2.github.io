import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const output = new URL("../out/index.html", import.meta.url);

test("exports the English simulator dashboard", async () => {
  const html = await readFile(output, "utf8");

  assert.match(html, /Jorge Parra · Scientific Simulators/);
  assert.match(html, /Assistant Professor at University of Valencia · Photonics · Electronics/);
  assert.match(html, /avatars\.githubusercontent\.com\/u\/297438018\?v=4/);
  assert.match(html, /href="https:\/\/github\.com\/jorpago2"[^>]*>GitHub/);
  assert.match(html, /href="https:\/\/jorpago2\.blogs\.uv\.es"[^>]*>Webpage/);
  assert.doesNotMatch(html, /<a[^>]*class="identity"/);
  assert.match(html, /Electromagnetic Wave Simulator/);
  assert.match(html, /2D FDTD · Electromagnetics &amp; photonics/);
  assert.match(html, /Semiconductor Device Simulator/);
  assert.match(html, /1D Drift–Diffusion · PN junction/);
  assert.match(html, /https:\/\/jorpago2\.github\.io\/fdtd-2d-simulator\//);
  assert.match(html, /https:\/\/jorpago2\.github\.io\/drift-difussion-simulator\//);
  assert.doesNotMatch(html, /PCMWriter|PICBench|Explorar|Proyectos/);
});
