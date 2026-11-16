const puppeteer = require('puppeteer-core');
const fs = require('fs');
(async () => {
  const [from, to, fps, out] = [parseFloat(process.argv[2]), parseFloat(process.argv[3]), +process.argv[4], process.argv[5]];
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--allow-file-access-from-files'] });
  const p = await b.newPage(); await p.setViewport({ width: 1080, height: 1080 });
  await p.goto('file://' + __dirname + '/' + (process.argv[6] || 'zoth-motion.html'), { waitUntil: 'networkidle0' });
  await p.evaluate(() => window.ready);
  fs.mkdirSync(out, { recursive: true });
  let i = 0;
  for (let t = from; t < to - 1e-6; t += 1 / fps) {
    await p.evaluate((t) => window.render(t), t);
    await p.screenshot({ path: `${out}/f${String(i++).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 92 });
  }
  await b.close();
})();
