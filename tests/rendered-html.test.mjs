import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const output = new URL("../out/index.html", import.meta.url);

test("exports the English simulator dashboard", async () => {
  const html = await readFile(output, "utf8");

  assert.match(html, /Jorge Parra · Scientific Simulators/);
  assert.match(html, /Electromagnetic Wave Simulator/);
  assert.match(html, /2D FDTD · Electromagnetics &amp; photonics/);
  assert.match(html, /Semiconductor Device Simulator/);
  assert.match(html, /1D Drift–Diffusion · PN junction/);
  assert.match(html, /https:\/\/jorpago2\.github\.io\/fdtd-2d-simulator\//);
  assert.match(html, /https:\/\/jorpago2\.github\.io\/drift-difussion-simulator\//);
  assert.doesNotMatch(html, /PCMWriter|PICBench|Explorar|Proyectos/);
});
