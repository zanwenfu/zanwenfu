// Renders the scene banner. Pass 1 photographs the text alone (its mask); pass 2 draws the
// scene around it and saves each frame. Usage: node render.cjs <out-dir> <frames> <fps> [query]
const { chromium } = require("@playwright/test");
const [OUT, FRAMES, FPS, QUERY = ""] = process.argv.slice(2);
const PAGE = `file://${__dirname}/banner.html`;
(async () => {
  const browser = await chromium.launch({ channel: "chrome" });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 400 }, deviceScaleFactor: 2 });
  const t0 = Date.now();
  const m = await ctx.newPage();
  await m.goto(`${PAGE}?mask=1&${QUERY}`); await m.evaluate(() => document.fonts.ready); await m.waitForTimeout(200);
  const mask = await m.locator("#banner").screenshot({ omitBackground: true });
  await m.close();
  const page = await ctx.newPage();
  page.on("pageerror", e => { console.error("page error:", e.message); process.exit(1); });
  await page.goto(`${PAGE}?${QUERY}`); await page.evaluate(() => document.fonts.ready);
  await page.evaluate(url => window.setMask(url), `data:image/png;base64,${mask.toString("base64")}`);
  await page.waitForFunction(() => window.ready === true);
  const banner = page.locator("#banner");
  let drawMs = 0;
  for (let i = 0; i < +FRAMES; i++) {
    const s = Date.now(); await page.evaluate(t => window.draw(t), i / +FPS); drawMs += Date.now() - s;
    await banner.screenshot({ path: `${OUT}/f_${String(i).padStart(4, "0")}.png` });
  }
  console.log(`${FRAMES} frames in ${Date.now() - t0} ms (drawing ${Math.round(drawMs / +FRAMES)} ms a frame)`);
  await browser.close();
})().catch(e => { console.error("render failed:", e.message); process.exit(1); });
