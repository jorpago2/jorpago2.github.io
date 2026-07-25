import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const output = new URL("../out/index.html", import.meta.url);

test("exports the public project dashboard", async () => {
  const html = await readFile(output, "utf8");

  assert.match(html, /Jorge Parra · Research Software/);
  assert.match(html, /2D FDTD Browser Simulator/);
  assert.match(html, /PCMWriter/);
  assert.match(html, /PICBench/);
  assert.match(html, /https:\/\/jorpago2\.github\.io\/fdtd-2d-simulator\//);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/);
});
