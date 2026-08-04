import { readFile, rm, writeFile } from "node:fs/promises";

const templatePath = new URL("../dist/index.html", import.meta.url);
const serverEntry = new URL("../.ssr/entry-server.js", import.meta.url);
const { render } = await import(serverEntry.href);
const template = await readFile(templatePath, "utf8");

if (!template.includes("<!--app-html-->")) {
  throw new Error("Missing prerender placeholder in dist/index.html");
}

await writeFile(templatePath, template.replace("<!--app-html-->", render()));
await rm(new URL("../.ssr", import.meta.url), { recursive: true, force: true });
