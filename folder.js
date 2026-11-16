/* ---------- Visual archive folder ----------
   Edit the pictures here.
     name   shown as alt text (and on the placeholder until you add an image)
     src    image path, e.g. 'img/visual/app.webp' ('' = placeholder)
     video  optional .mp4 that plays instead of the image
     ratio  width / height of the picture
     size   how big it opens, relative to the others (1 = normal)
     at     [x, y] centre on desktop, as fractions of the section (0–1)
   Add another { label, color, pictures } block to FOLDERS for another folder.
--------------------------------------------- */
const FOLDERS = [
  {
    label: 'UI archive',
    color: '#49a862',
    pictures: [
      { name: 'Invite screen',   src: '', ratio: 0.66, size: 2.1, at: [0.70, 0.23] },
      { name: 'Share template',  src: '', ratio: 1.2,  size: 1.9, at: [0.28, 0.21] },
      { name: 'Interface demo',  src: '', ratio: 0.44, size: 3.6, at: [0.12, 0.61] },
      { name: 'AI agent',        src: '', ratio: 0.46, size: 2.2, at: [0.28, 0.78] },
      { name: 'Fitness app',     src: '', ratio: 0.41, size: 3.6, at: [0.885, 0.50] },
      { name: '3D objects',      src: '', ratio: 3.15, size: 1.15, at: [0.64, 0.85] },
    ],
  },
  {
    label: 'Brand & graphics',
    color: '#fc7a69',
    pictures: [
      { name: 'Logo explorations', src: '', ratio: 1.0,  size: 2.0, at: [0.72, 0.22] },
      { name: 'Poster',            src: '', ratio: 0.72, size: 2.6, at: [0.30, 0.25] },
      { name: 'Social posts',      src: '', ratio: 1.0,  size: 1.9, at: [0.13, 0.62] },
      { name: 'Illustration',      src: '', ratio: 0.8,  size: 2.2, at: [0.34, 0.80] },
      { name: 'Packaging',         src: '', ratio: 0.75, size: 2.6, at: [0.88, 0.55] },
      { name: 'Banner',            src: '', ratio: 3.0,  size: 1.15, at: [0.64, 0.86] },
    ],
  },
];
const FOLDER_OPTS = {
  peek: 3,          // how many pictures peek out of a closed folder
  stagger: 70,      // ms between pictures flying out
  windowSize: 168,  // px height of a size-1 picture on a big screen
};

(() => {
  const mount = document.querySelector('.prism-folder');
  if (!mount) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const EDGE = 24, TOP_CLEAR = 40, GAP = 40;
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // Damped spring sampled into a CSS linear() easing
  function spring(k, c) {
    const w0 = Math.sqrt(k), z = c / (2 * w0), wd = w0 * Math.sqrt(1 - z * z);
    const x = (t) => 1 - Math.exp(-z * w0 * t) * (Math.cos(wd * t) + (z * w0 / wd) * Math.sin(wd * t));
    let T = 0;
    for (let t = 0; t < 4; t += 1 / 240) if (Math.abs(1 - x(t)) > 0.001) T = t;
    T += 1 / 60;
    const pts = Array.from({ length: 49 }, (_, i) => (i === 48 ? 1 : +x((T * i) / 48).toFixed(4)));
    return { easing: `linear(${pts.join(',')})`, duration: Math.round(T * 1000) };
  }
  const linearOK = CSS.supports('transition-timing-function', 'linear(0, 1)');
  const FLY = spring(170, 19), GIVE = spring(420, 15);
  const flyEase = linearOK ? FLY.easing : 'cubic-bezier(.34,1.4,.64,1)';
  const giveEase = linearOK ? GIVE.easing : 'cubic-bezier(.34,1.56,.64,1)';

  const folderMarkup = (f, i) => {
    const n = f.pictures.length;
    return `
      <div class="pf-anchor" data-i="${i}" style="--pf-color:${esc(f.color || '#49a862')}">
        <button class="pf-folder" type="button" aria-expanded="false" aria-label="${esc(f.label)}, ${n} items. Open to view.">
          <span class="pf-tab"></span>
          <span class="pf-back"></span>
          <span class="pf-peek"></span>
          <span class="pf-flap"><span class="pf-light"></span></span>
        </button>
        <p class="pf-label"><span class="pf-title">${esc(f.label)}</span><span class="pf-count">${n} item${n === 1 ? '' : 's'}</span></p>
      </div>`;
  };
  mount.innerHTML = `
    <div class="pf-stage">
      <div class="pf-row">${FOLDERS.map(folderMarkup).join('')}</div>
      <div class="pf-windows"></div>
      <p class="pf-hint" aria-hidden="true"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3l14 7-6 2-2 6z"/></svg><span>Drag the pictures around</span></p>
    </div>`;

  const stage = mount.querySelector('.pf-stage');
  const layer = mount.querySelector('.pf-windows');
  const hint = mount.querySelector('.pf-hint');
  const F = [...mount.querySelectorAll('.pf-anchor')].map((anchor, i) => ({
    cfg: FOLDERS[i], anchor,
    folder: anchor.querySelector('.pf-folder'),
    peek: anchor.querySelector('.pf-peek'),
    flap: anchor.querySelector('.pf-flap'),
  }));

  const media = (p, cls, allowVideo) =>
    p.video && allowVideo
      ? `<video class="${cls}" src="${esc(p.video)}" ${p.src ? `poster="${esc(p.src)}"` : ''} aria-label="${esc(p.name)}" autoplay muted loop playsinline draggable="false"></video>`
      : p.src
      ? `<img class="${cls}" src="${esc(p.src)}" alt="${esc(p.name)}" draggable="false">`
      : `<span class="${cls} pf-ph" aria-hidden="true"><span>${esc(p.name)}</span></span>`;

  // Pictures peeking out of each closed folder
  const PEEK_POSE = [{ y: 20, r: -4 }, { y: 4, r: 0 }, { y: 14, r: 4 }];
  F.forEach((f) => {
    const pics = f.cfg.pictures;
    f.peek.innerHTML = pics.slice(0, Math.min(FOLDER_OPTS.peek, 3)).map((p) => media(p, 'pf-peek-item', false)).join('');
    const layoutPeek = () => {
      const items = [...f.peek.children], k = items.length, fw = f.folder.clientWidth;
      if (!k || !fw) return;
      const H = fw * 0.39, maxW = fw * 0.52;
      items.forEach((el, i) => {
        const ar = pics[i].ratio || 0.8;
        const w = Math.min(H * ar, maxW), h = w / ar;
        const cx = (fw * (i + 1)) / (k + 1) + (i - (k - 1) / 2) * fw * 0.04;
        el.style.cssText += `;--w:${w.toFixed(1)}px;--h:${h.toFixed(1)}px;--x:${(cx - w / 2).toFixed(1)}px;--y:${PEEK_POSE[i].y}px;--r:${PEEK_POSE[i].r}deg`;
      });
    };
    new ResizeObserver(layoutPeek).observe(f.folder);
  });

  // Hint under the folder once the pictures are out
  let hintTimer = 0;
  function showHint(after) {
    clearTimeout(hintTimer);
    hint.classList.remove('on');
    hintTimer = setTimeout(() => {
      const a = (current || F[0]).anchor.getBoundingClientRect(), sr = stage.getBoundingClientRect();
      hint.style.top = (stage.clientWidth < 640 ? stage.offsetHeight + (parseFloat(stage.style.marginBottom) || 0) - 40 : a.bottom - sr.top - 24) + 'px';
      hint.classList.add('on');
    }, after);
  }
  const hideHint = () => { clearTimeout(hintTimer); hint.classList.remove('on'); };

  let current = null, z = 10, wins = [];   // current = the open folder
  const fit = () => Math.max(0.42, Math.min(1, (stage.clientWidth - 32) / 900, stage.clientHeight / 640));
  function folderCentre(fo) {
    const s = stage.getBoundingClientRect(), f = fo.folder.getBoundingClientRect();
    return { x: f.left - s.left + f.width / 2, y: f.top - s.top + f.height / 2 };
  }

  // Push overlapping boxes apart (the folder itself stays put)
  function relax(boxes, W, H, gap) {
    for (let it = 0; it < 80; it++) {
      let moved = false;
      for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i], b = boxes[j];
        if (a.fixed && b.fixed) continue;
        const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x) + gap;
        const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y) + gap;
        if (ox <= 0 || oy <= 0) continue;
        moved = true;
        const share = a.fixed || b.fixed ? 1 : 0.5;
        if (ox < oy) {
          const d = (a.x + a.w / 2 < b.x + b.w / 2 ? -1 : 1) * ox * share;
          if (!a.fixed) a.x += d; if (!b.fixed) b.x -= d;
        } else {
          const d = (a.y + a.h / 2 < b.y + b.h / 2 ? -1 : 1) * oy * share;
          if (!a.fixed) a.y += d; if (!b.fixed) b.y -= d;
        }
      }
      boxes.forEach((b) => {
        if (b.fixed) return;
        b.x = Math.max(EDGE, Math.min(W - b.w - EDGE, b.x));
        b.y = Math.max(TOP_CLEAR, Math.min(H - b.h - EDGE, b.y));
      });
      if (!moved) break;
    }
  }

  // Phones: two staggered columns below the folder, wide pictures full-width on top
  function phoneLayout(boxes, W, pics) {
    const g = 16, colW = (W - EDGE * 2 - g) / 2, cols = [[], []], wide = [];
    boxes.forEach((b, i) => (pics[i].ratio > 2 ? wide : cols[i % 2]).push(b));
    boxes.forEach((b) => {
      const k = (wide.includes(b) ? W - EDGE * 2 : colW) / b.w;
      b.w = Math.round(b.w * k); b.h = Math.round(b.h * k);
    });
    let y0 = TOP_CLEAR, bottom = y0;
    wide.forEach((b) => { b.x = EDGE; b.y = y0; y0 += b.h + g; });
    cols.forEach((c, ci) => {
      let y = y0 + (ci ? 40 : 0);
      c.forEach((b) => { b.x = ci ? W - EDGE - colW : EDGE; b.y = y; y += b.h + g; });
      bottom = Math.max(bottom, y);
    });
    return bottom;
  }

  function openAll(f) {
    if (current === f) return;
    if (current) closeAll(true);
    current = f;
    const pics = f.cfg.pictures, n = pics.length;
    stage.classList.add('has-open');
    f.anchor.classList.add('open');
    f.folder.setAttribute('aria-expanded', 'true');
    const s = fit(), c = folderCentre(f), W = stage.clientWidth, H = stage.clientHeight;
    const baseH = FOLDER_OPTS.windowSize * Math.max(0.62, s);
    const a = f.anchor.getBoundingClientRect(), sr = stage.getBoundingClientRect();
    const fr = { x: a.left - sr.left, y: a.top - sr.top, w: a.width, h: a.height, fixed: true };
    const gap = Math.max(16, Math.round(GAP * s));
    let boxes;
    // shrink a little at a time until nothing overlaps
    for (let k = 1; k >= 0.44; k -= 0.04) {
      boxes = pics.map((p) => {
        const h = Math.round(baseH * k * (p.size || 1));
        const w = Math.round(h * (p.ratio || 0.8));
        return { w, h, x: 0, y: 0 };
      });
      if (W < 640) {
        const bottom = phoneLayout(boxes, W, pics);
        stage.style.marginBottom = Math.max(0, bottom + 64 - H) + 'px';
        break;
      }
      boxes.forEach((b, i) => { const [ax, ay] = pics[i].at || [0.5, 0.5]; b.x = ax * W - b.w / 2; b.y = ay * H - b.h / 2; });
      relax([...boxes, fr], W, H, gap);
      const clash = boxes.some((b, i) => [...boxes.slice(i + 1), fr].some((o) =>
        Math.min(b.x + b.w, o.x + o.w) - Math.max(b.x, o.x) > -gap / 2 &&
        Math.min(b.y + b.h, o.y + o.h) - Math.max(b.y, o.y) > -gap / 2));
      if (!clash) break;
    }

    wins = pics.map((p, i) => {
      const box = boxes[i];
      const el = document.createElement('div');
      el.className = 'pf-win';
      el.setAttribute('role', 'group');
      el.setAttribute('aria-label', p.name);
      el.innerHTML = media(p, 'pf-media', true);
      el.style.cssText = `left:${box.x}px;top:${box.y}px;z-index:${++z};--pf-w:${box.w}px;--pf-h:${box.h}px;--pf-color:${f.cfg.color || '#49a862'}`;
      layer.appendChild(el);
      const dx = c.x - (box.x + box.w / 2), dy = c.y - (box.y + box.h / 2);
      const w = { el, alive: true, owner: f };
      w.anim = reduced
        ? el.animate({ opacity: [0, 1] }, { duration: 160, delay: i * 30, fill: 'backwards' })
        : el.animate([
            { transform: `translate(${dx}px, ${dy}px) scale(.3)`, opacity: 0 },
            { transform: `translate(${dx * 0.6}px, ${dy * 0.6}px) scale(.6)`, opacity: 1, offset: 0.18 },
            { transform: 'none', opacity: 1 },
          ], { duration: FLY.duration + 120, delay: i * FOLDER_OPTS.stagger, easing: flyEase, fill: 'backwards' });
      drag(w);
      el.addEventListener('pointerenter', hideHint);
      return w;
    });
    showHint(reduced ? 200 : n * FOLDER_OPTS.stagger + FLY.duration);
  }

  function sendBack(w, delay) {
    if (!w.alive) return Promise.resolve();
    w.alive = false;
    const c = folderCentre(w.owner), b = w.el.getBoundingClientRect(), sb = stage.getBoundingClientRect();
    const dx = c.x - (b.left - sb.left + b.width / 2), dy = c.y - (b.top - sb.top + b.height / 2);
    w.anim?.cancel();
    return w.el.animate([
      { transform: 'none', opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px) scale(.3)`, opacity: 0 },
    ], { duration: reduced ? 120 : 340, delay, easing: 'cubic-bezier(.5,0,.75,0)', fill: 'forwards' })
      .finished.then(() => w.el.remove());
  }

  // quick = switching straight to another folder: put these away fast
  function closeAll(quick) {
    if (!current) return;
    hideHint();
    const f = current;
    current = null;
    f.folder.setAttribute('aria-expanded', 'false');
    f.anchor.classList.remove('open');
    const live = wins.filter((w) => w.alive).reverse();
    wins = [];
    const done = live.map((w, i) => sendBack(w, quick ? 0 : i * Math.round(FOLDER_OPTS.stagger / 2)));
    if (!quick) Promise.all(done).then(() => {
      if (current) return;
      stage.classList.remove('has-open');
      stage.style.marginBottom = '';
    });
  }

  // Drag a picture; pressing one brings it to the front
  function drag(w) {
    const el = w.el;
    el.addEventListener('pointerdown', (e) => {
      el.style.zIndex = ++z;
      if (e.button !== 0) return;
      if (w.anim?.playState === 'running') w.anim.finish();
      const sx = e.clientX, sy = e.clientY, l = parseFloat(el.style.left), t = parseFloat(el.style.top);
      el.setPointerCapture(e.pointerId);
      el.classList.add('dragging');
      let qx = 0, qy = 0, queued = false;
      const move = (ev) => {
        qx = ev.clientX; qy = ev.clientY;
        if (queued) return;
        queued = true;
        requestAnimationFrame(() => {
          queued = false;
          el.style.left = l + qx - sx + 'px';
          el.style.top = t + qy - sy + 'px';
        });
      };
      const up = () => {
        el.classList.remove('dragging');
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerup', up);
        el.removeEventListener('pointercancel', up);
      };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerup', up);
      el.addEventListener('pointercancel', up);
    });
  }

  // Press: the folder gives a little, then springs back
  const scaleNow = (el) => { const m = getComputedStyle(el).transform; return m && m !== 'none' ? new DOMMatrixReadOnly(m).a : 1; };
  const squeeze = (el) => {
    if (reduced) return;
    const from = scaleNow(el);
    el.getAnimations().forEach((x) => x.cancel());
    el.animate([{ transform: `scale(${from})` }, { transform: 'scale(.96)' }], { duration: 110, easing: 'cubic-bezier(.3,0,.5,1)', fill: 'forwards' });
  };
  const springBack = (el) => {
    if (reduced) return;
    const from = scaleNow(el);
    el.getAnimations().forEach((x) => x.cancel());
    el.animate([{ transform: `scale(${from})` }, { transform: 'scale(1)' }], { duration: GIVE.duration, easing: giveEase });
  };

  F.forEach((f) => {
    const { folder, flap } = f;
    let pressed = false;
    folder.addEventListener('pointerdown', (e) => { if (e.button === 0) { pressed = true; squeeze(folder); } });
    folder.addEventListener('pointerleave', () => { if (pressed) { pressed = false; springBack(folder); } });
    folder.addEventListener('click', () => {
      if (pressed) { pressed = false; springBack(folder); } else { squeeze(folder); setTimeout(() => springBack(folder), 110); }
      current === f ? closeAll() : openAll(f);
    });

    // Light on the glass follows the pointer (once per frame)
    let lx = 0.7, ly = 0.15, queued = false;
    folder.addEventListener('pointermove', (e) => {
      const r = flap.getBoundingClientRect();
      lx = (e.clientX - r.left) / r.width; ly = (e.clientY - r.top) / r.height;
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        flap.style.setProperty('--lx', (lx * 100).toFixed(1) + '%');
        flap.style.setProperty('--ly', (ly * 100).toFixed(1) + '%');
      });
    });
    folder.addEventListener('pointerleave', () => { flap.style.setProperty('--lx', '70%'); flap.style.setProperty('--ly', '15%'); });
  });

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && current) closeAll(); });
  document.addEventListener('pointerdown', (e) => {
    if (current && !e.target.closest('.pf-win, .pf-folder')) closeAll();
  });

  addEventListener('resize', () => {
    if (!current) return;
    const f = current;
    wins.forEach((w) => w.el.remove());
    wins = []; current = null;
    openAll(f);
  });
})();
