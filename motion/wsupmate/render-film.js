// Renders wsupmate-cover.html (1080x1080). Usage:
//   node render-film.js <puppeteer-core path> frames <outdir> [fps]   -> f0000.jpg …
//   node render-film.js <puppeteer-core path> stills <outdir> t1,t2…  -> still-<t>.jpg
//   FILM=lookafter-cover.html node render-film.js …   renders the square cover instead
const puppeteer = require(process.argv[2]);
const fs = require('fs');
const [mode, out, arg] = process.argv.slice(3);
(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--allow-file-access-from-files'] });
  const pg = await b.newPage();
  const file = process.env.FILM || 'wsupmate-cover.html';
  await pg.setViewport(file.includes('cover') ? { width: 1080, height: 1080 } : { width: 1920, height: 1080 });
  const errs = []; pg.on('pageerror', (e) => errs.push(e.message));
  await pg.goto('file://' + __dirname + '/' + file, { waitUntil: 'networkidle0' });
  await pg.evaluate(() => window.ready);
  fs.mkdirSync(out, { recursive: true });
  const shot = async (t, path) => { await pg.evaluate((t) => window.render(t), t); await pg.screenshot({ path, type: 'jpeg', quality: 92 }); };
  if (mode === 'stills') for (const t of arg.split(',').map(Number)) await shot(t, `${out}/still-${t}.jpg`);
  else { const fps = +(arg || 30), dur = await pg.evaluate(() => window.DURATION); let i = 0;
    for (let t = 0; t < dur - 1e-6; t += 1 / fps) await shot(t, `${out}/f${String(i++).padStart(4, '0')}.jpg`); }
  console.log('done', errs);
  await b.close();
})();
