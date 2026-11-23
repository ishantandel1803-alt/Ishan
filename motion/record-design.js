// Deterministic frame recorder using an injected virtual clock (timers, Date, rAF, Web/CSS animations).
// node rec.js <puppeteer-core> <html> <outdir> <w> <h> <seconds> [fps] [scale]
const puppeteer = require(process.argv[2]);
const fs = require('fs');
const [file, out, w, h, secs, fps = 30, scale = 2] = process.argv.slice(3);
const shim = () => {
  let now = 0; const epoch = Date.now(); const RD = Date;
  const timers = new Map(); let seq = 1; let rafs = [];
  const born = new WeakMap(); const done = new WeakSet();
  window.setTimeout = (fn, d = 0, ...a) => { const id = seq++; timers.set(id, { fn, at: now + Math.max(0, +d || 0), a }); return id; };
  window.setInterval = (fn, d = 0, ...a) => { const id = seq++; timers.set(id, { fn, at: now + Math.max(1, +d || 0), a, every: Math.max(1, +d || 0) }); return id; };
  window.clearTimeout = window.clearInterval = (id) => timers.delete(id);
  window.requestAnimationFrame = (fn) => { rafs.push(fn); return rafs.length; };
  window.cancelAnimationFrame = () => {};
  performance.now = () => now;
  window.Date = class extends RD { constructor(...a) { a.length ? super(...a) : super(epoch + now); } static now() { return epoch + now; } };
  const syncAnims = () => {
    for (const an of document.getAnimations()) {
      if (!born.has(an)) { born.set(an, now - (an.currentTime || 0)); an.pause(); }
      if (done.has(an)) continue;
      const t = now - born.get(an);
      const end = an.effect && an.effect.getComputedTiming().endTime;
      if (isFinite(end) && t >= end) { done.add(an); an.finish(); } else an.currentTime = t;
    }
  };
  window.__advance = (ms) => {
    const target = now + ms;
    for (;;) {
      let next = null, nid = null;
      for (const [id, t] of timers) if (t.at <= target && (!next || t.at < next.at)) { next = t; nid = id; }
      if (!next) break;
      now = next.at;
      if (next.every) next.at += next.every; else timers.delete(nid);
      try { next.fn(...next.a); } catch (e) { console.error(e); }
    }
    now = target;
    const r = rafs; rafs = []; r.forEach(f => { try { f(now); } catch (e) { console.error(e); } });
    syncAnims();
  };
};
(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--allow-file-access-from-files'] });
  const pg = await b.newPage();
  await pg.setViewport({ width: +w, height: +h, deviceScaleFactor: +scale });
  await pg.evaluateOnNewDocument(shim);
  const errs = []; pg.on('pageerror', e => errs.push(e.message));
  await pg.goto('file://' + file, { waitUntil: 'networkidle0' });
  await pg.evaluate(() => document.fonts.ready);
  await pg.evaluate(() => window.__advance(+0));
  fs.mkdirSync(out, { recursive: true });
  const n = Math.round(secs * fps), step = 1000 / fps;
  for (let i = 0; i < n; i++) {
    await pg.evaluate((s) => window.__advance(s), i === 0 ? 0 : step);
    await pg.screenshot({ path: `${out}/f${String(i).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 90 });
  }
  console.log(out, n, errs.slice(0, 3));
  await b.close();
})();
