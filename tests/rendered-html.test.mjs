import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

/**
 * Renders the built worker the way the platform does. The query string keeps
 * each `import()` distinct so tests do not share a module instance.
 */
async function render(path = "/en") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

let cached;
async function html() {
  cached ??= await render("/en").then((response) => response.text());
  return cached;
}

test("serves the document", async () => {
  const rootResponse = await render("/");
  assert.equal(rootResponse.status, 307);
  assert.equal(rootResponse.headers.get("location"), "/en");

  const response = await render("/en");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
});

test("renders the page identity and its social metadata", async () => {
  const page = await html();
  assert.match(page, /<title>Anatomy Atelier — Learn anatomy like an artist<\/title>/);
  assert.match(page, /<meta name="description" content="Explore medically detailed 3D organs/);
  assert.match(page, /og:image/);
  assert.match(page, /apple-touch-icon/);
});

test("renders the organ library with every organ", async () => {
  const page = await html();
  assert.match(page, /Organ library/);
  for (const organ of ["Heart", "Brain", "Lungs", "Liver", "Kidneys", "Eye", "Intestine", "Pancreas", "Skin"]) {
    assert.ok(page.includes(`>${organ}<`), `organ library is missing ${organ}`);
  }
});

test("server-renders the selected organ rather than an empty shell", async () => {
  const page = await html();
  // Heart is the default selection: name, scientific name, poetic line, the
  // tissue and a clinical note all come from anatomy-data.
  assert.match(page, /The tireless pump/);
  assert.match(page, /Cardiovascular/);
  assert.match(page, /Cor/);
  assert.match(page, /Cardiac muscle tissue/);
  assert.match(page, /Coronary artery disease/);
  assert.match(page, /anatomy\/heart\/thumb\.webp/);
});

test("ships the viewer mount and a text equivalent for its hotspots", async () => {
  const page = await html();
  // The canvas is created on the client, so the server must at least emit the
  // mount and the labelled controls around it.
  assert.match(page, /three-mount/);
  assert.match(page, /viewer-tools/);
  assert.match(page, /aria-label/);
  // Hotspot dots live inside the canvas; this list is their accessible
  // equivalent and has to be in the server output to be of any use.
  assert.match(page, /hotspot-index/);
  assert.match(page, /Aorta/);
  assert.match(page, /Left Atrium/);
});

test("carries no trace of the vinext starter it was scaffolded from", async () => {
  const page = await html();
  for (const leftover of [
    "react-loading-skeleton",
    "Your site is taking shape",
    "Starter Project",
    "codex-preview",
  ]) {
    assert.ok(!page.includes(leftover), `starter leftover in rendered output: ${leftover}`);
  }
  await assert.rejects(access(new URL("app/_sites-preview", templateRoot)));
  await assert.rejects(access(new URL("public/_sites-preview", templateRoot)));
});
