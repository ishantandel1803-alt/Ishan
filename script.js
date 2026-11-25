// Always light mode (matches the reference). Clear any theme saved earlier.
try { localStorage.removeItem('theme'); } catch (_) {}
document.documentElement.removeAttribute('data-theme');

// Spark button: a small spin for now
const spark = document.querySelector('.spark-toggle');
spark?.addEventListener('click', () => {
  spark.classList.toggle('spin');
});

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Hero pill carousel + card
(() => {
  const wrap = document.querySelector('.hero-tabs');
  if (!wrap) return;
  const hero = document.querySelector('.hero');
  const track = wrap.querySelector('.hero-tabs-track');
  const tabs = [...wrap.querySelectorAll('.hero-tab')];
  const contents = [...document.getElementById('card-content').content.querySelectorAll('.card-content')];
  const card = document.querySelector('.hero-card');
  const flip = card.querySelector('.card-flip');
  const faces = [...flip.querySelectorAll('.card-face')];
  let front = 0, angle = 0, first = true;

  // Put content i on a face and play its chip animation
  function fill(face, i) {
    face.replaceChildren(contents[i].cloneNode(true));
    prepareDrop(face);
  }
  const stage = card.parentElement;
  function flipTo(i) {
    stage.classList.toggle('with-photo', contents[i].hasAttribute('data-photo'));
    if (first) { fill(faces[0], i); faces[0].classList.add('active'); dropChips(faces[0], 300); first = false; return; }
    const back = faces[1 - front];
    fill(back, i);
    back.classList.remove('active');
    angle += 180;
    flip.style.transform = `rotateY(${angle}deg)`;
    faces[front].classList.remove('active');
    faces[front].setAttribute('aria-hidden', 'true');
    back.removeAttribute('aria-hidden');
    front = 1 - front;
    back.classList.add('active');
    dropChips(back, 380);   // start once the card is half-turned
  }
  const DURATION = 3000;
  const n = tabs.length;
  let current = 0;

  wrap.style.setProperty('--dur', DURATION + 'ms');

  // Endless loop: a copy of the pills on each side, so there is always a
  // neighbour left and right. After a slide lands on a copy, the row jumps
  // (invisibly) back to the identical pill in the middle set.
  const before = tabs.map((t) => t.cloneNode(true));
  const after = tabs.map((t) => t.cloneNode(true));
  [...before, ...after].forEach((c) => { c.setAttribute('aria-hidden', 'true'); c.tabIndex = -1; c.removeAttribute('role'); });
  track.prepend(...before);
  track.append(...after);
  const all = [...track.children];          // [copies][real][copies]
  let pos = n;                              // index into `all`

  function place(animate) {
    const t = all[pos];
    const x = wrap.clientWidth / 2 - (t.offsetLeft + t.offsetWidth / 2);
    if (!animate) {
      track.classList.add('jump');
      track.style.transform = `translateX(${x}px)`;
      void track.offsetWidth;
      track.classList.remove('jump');
    } else {
      track.style.transform = `translateX(${x}px)`;
    }
  }
  function mark() {
    all.forEach((t, k) => {
      const on = k === pos;
      t.classList.toggle('active', on);
      t.classList.remove('timing');
    });
    tabs.forEach((t, k) => { t.setAttribute('aria-selected', k === current); t.tabIndex = k === current ? 0 : -1; });
  }
  let settleTimer = 0;
  function settle() {
    clearTimeout(settleTimer);
    if (pos < n || pos >= 2 * n) {           // landed on a copy: hop to the real one
      pos = ((pos % n) + n) % n + n;
      track.classList.add('jump');
      mark();
      place(false);
      track.classList.remove('jump');
    }
    void all[pos].offsetWidth;               // restart the fill
    if (!reduced) all[pos].classList.add('timing');
  }

  // go to a position in `all` (may be a copy)
  function go(target, animate = true) {
    pos = target;
    current = ((pos % n) + n) % n;
    mark();
    flipTo(current);
    place(animate && !reduced);
    clearTimeout(settleTimer);
    settleTimer = setTimeout(settle, animate && !reduced ? 720 : 0);
  }
  const step = (d) => go(pos + d);
  const show = (i) => go(n + (((i % n) + n) % n));   // jump straight to a real pill

  all.forEach((t, k) => {
    t.addEventListener('click', () => go(k));
    t.addEventListener('animationend', (e) => { if (k === pos && e.animationName === 'fill') step(1); });
  });

  // Keyboard: arrow keys move between pills
  wrap.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { step(1); setTimeout(() => tabs[current].focus({ preventScroll: true }), 750); }
    if (e.key === 'ArrowLeft')  { step(-1); setTimeout(() => tabs[current].focus({ preventScroll: true }), 750); }
  });

  // Swipe on touch screens
  let x0 = null;
  wrap.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  wrap.addEventListener('touchend', (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 30) step(dx < 0 ? 1 : -1);
    x0 = null;
  });

  // Click the card to flip to the next one
  card.addEventListener('click', () => step(1));

  // Gentle tilt toward the cursor
  if (!reduced && matchMedia('(hover: hover)').matches) {
    let tiltQueued = false, lastE;
    card.addEventListener('mousemove', (e) => {
      lastE = e;
      if (tiltQueued) return;
      tiltQueued = true;
      requestAnimationFrame(() => {
        tiltQueued = false;
        const r = card.getBoundingClientRect();
        const x = (lastE.clientX - r.left) / r.width - 0.5;
        const y = (lastE.clientY - r.top) / r.height - 0.5;
        card.style.transform = `rotateX(${-y * 10}deg) rotateY(${x * 12}deg)`;
      });
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  }

  // Pause while the pointer is on the pills or the card
  [wrap, document.querySelector('.hero-stage')].forEach((el) => {
    el.addEventListener('mouseenter', () => wrap.classList.add('paused'));
    el.addEventListener('mouseleave', () => wrap.classList.remove('paused'));
  });

  window.addEventListener('resize', () => place(false));
  document.fonts?.ready.then(() => place(false));
  go(n, false);

  // Stop the carousel and card while the hero is scrolled out of view
  new IntersectionObserver(([e]) => hero.classList.toggle('offscreen', !e.isIntersecting)).observe(hero);
})();

/* ---------- Chip drop: simple rigid-body physics ----------
   Chips fall from above the card under gravity, land bottom-first, bounce
   a little, squash on impact and settle their tilt. Each landing also
   jolts the chips already resting underneath. */
function prepareDrop(face) {
  if (reduced) return;
  cancelAnimationFrame(face._raf);
  clearTimeout(face._wait);
  const box = face.querySelector('.chips');
  face.querySelectorAll('.chip').forEach((el) => {
    // distance from the card top to the chip's bottom, plus a margin, so it starts out of view
    const lift = box.offsetTop + el.offsetTop + el.offsetHeight + 24;
    el.style.transform = `translateY(${-lift}px)`;
  });
}

function dropChips(face, delay = 0) {
  if (reduced) return;
  const G = 3200;                // gravity, px/s²
  const BOUNCE = 0.32;           // restitution
  const box = face.querySelector('.chips');
  const chips = [...face.querySelectorAll('.chip')].reverse();   // bottom chip first
  const s = chips.map((el, i) => ({
    el,
    y: -(box.offsetTop + el.offsetTop + el.offsetHeight + 24 + i * 40),
    vy: 0,
    start: i * 0.17,                              // stagger, seconds
    rot: (Math.random() * 2 - 1) * 14,            // tilt while falling
    vr: (Math.random() * 2 - 1) * 40,
    sq: 0, vs: 0,                                 // squash spring
    landed: false, done: false,
  }));

  face._wait = setTimeout(() => {
    let t = 0, last = performance.now();
    const step = (now) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now; t += dt;
      let settled = true;

      s.forEach((c, i) => {
        if (t < c.start) { settled = false; return; }

        // vertical motion
        if (!c.done) {
          c.vy += G * dt;
          c.y += c.vy * dt;
          if (c.y >= 0 && c.vy > 0) {
            const impact = c.vy;
            c.y = 0;
            c.vy = -impact * BOUNCE;
            c.vs -= impact * 0.0011;                       // squash this chip
            for (let k = 0; k < i; k++) s[k].vs -= impact * 0.00045 / (i - k); // jolt the ones below
            if (!c.landed) { c.landed = true; c.vr += -c.rot * 6; }
            if (Math.abs(c.vy) < 70) { c.vy = 0; c.done = true; }
          }
        }

        // tilt: free spin in the air, damped spring back to level once landed
        if (c.landed) { c.vr += (-260 * c.rot - 16 * c.vr) * dt; }
        c.rot += c.vr * dt;

        // squash spring
        c.vs += (-900 * c.sq - 20 * c.vs) * dt;
        c.sq += c.vs * dt;

        if (!c.done || Math.abs(c.rot) > 0.05 || Math.abs(c.vr) > 0.5 || Math.abs(c.sq) > 0.001 || Math.abs(c.vs) > 0.01) settled = false;

        const sy = 1 + c.sq, sx = 1 - c.sq * 0.6;
        c.el.style.transform = `translateY(${c.y}px) rotate(${c.rot}deg) scale(${sx}, ${sy})`;
      });

      if (settled) { s.forEach((c) => { c.el.style.transform = ''; }); return; }
      face._raf = requestAnimationFrame(step);
    };
    face._raf = requestAnimationFrame(step);
  }, delay);
}

/* ---------- Page colour follows whichever section is at mid-screen ---------- */
(() => {
  const sections = [...document.querySelectorAll('[data-bg]:not(body)')];
  let queued = false;
  const sync = () => {
    queued = false;
    const y = innerHeight * 0.5;
    const hit = sections.find((s) => { const r = s.getBoundingClientRect(); return r.top <= y && r.bottom > y; });
    if (hit && document.body.dataset.bg !== hit.dataset.bg) document.body.dataset.bg = hit.dataset.bg;
  };
  // at most once per frame
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(sync); } }, { passive: true });
  addEventListener('resize', sync);
  addEventListener('load', sync);
  sync();
})();

/* ---------- Word-by-word reveal ---------- */
function splitWords(el) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  let i = 0;
  nodes.forEach((tn) => {
    const frag = document.createDocumentFragment();
    tn.textContent.split(/(\s+)/).forEach((tok) => {
      if (!tok) return;
      if (/^\s+$/.test(tok)) { frag.appendChild(document.createTextNode(tok)); return; }
      const wrap = document.createElement('span'); wrap.className = 'word-wrap';
      const w = document.createElement('span'); w.className = 'word'; w.textContent = tok;
      w.style.setProperty('--i', i++);
      wrap.appendChild(w); frag.appendChild(wrap);
    });
    tn.replaceWith(frag);
  });
  el.classList.add('split');
}

(() => {
  const about = document.getElementById('about');
  const text = about?.querySelector('.about-text');
  const cta = about?.querySelector('.about-cta');
  if (!about || !text) return;
  splitWords(text);
  cta.classList.add('pre');
  // play once when the section's top passes 60% of the screen
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    text.classList.add('in'); cta.classList.add('in');
    io.disconnect();
  }, { rootMargin: '0px 0px -40% 0px' });
  io.observe(about);
})();

/* ---------- Cursor pill (desktop with a mouse) ----------
   Any element can turn the cursor into a dark glass pill with its own text
   and icon: Cursor.attach(el, 'text', 'arrow' | 'out' | 'copy'). */
window.Cursor = (() => {
  const label = document.querySelector('.cursor-label');
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!label || !fine) return { attach() {}, flash() {}, active: false };
  const text = label.querySelector('.cursor-label-text');
  let px = 0, py = 0, queued = false, owner = null, flashTimer = 0;
  const place = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; label.style.translate = `${px}px ${py}px`; });
  };
  addEventListener('pointermove', (e) => { px = e.clientX; py = e.clientY; if (owner) place(); }, { passive: true });
  const set = (t, icon) => { text.textContent = t; label.dataset.icon = icon; };
  const api = {
    active: false,
    attach(el, t, icon = 'arrow') {
      el.classList.add('has-cursor');
      el.addEventListener('pointerenter', (e) => {
        owner = el; api.active = true; clearTimeout(flashTimer);
        px = e.clientX; py = e.clientY; place();
        set(t, icon); label.classList.add('visible');
      });
      el.addEventListener('pointerleave', () => {
        if (owner !== el) return;
        owner = null; api.active = false; label.classList.remove('visible');
      });
    },
    flash(t, icon) {
      const prev = [text.textContent, label.dataset.icon];
      set(t, icon);
      clearTimeout(flashTimer);
      flashTimer = setTimeout(() => { if (owner) set(...prev); }, 1400);
    },
  };
  // hide when the page scrolls the element out from under the pointer
  addEventListener('scroll', () => {
    if (!owner) return;
    const r = owner.getBoundingClientRect();
    if (py < r.top || py > r.bottom || px < r.left || px > r.right) { owner = null; api.active = false; label.classList.remove('visible'); }
  }, { passive: true });
  return api;
})();
(() => {
  const about = document.getElementById('about');
  if (about) window.Cursor.attach(about, 'more about me', 'arrow');
})();

/* ---------- Work: render cards + filters from projects.js ---------- */
(() => {
  const section = document.getElementById('work');
  if (!section || typeof PROJECTS === 'undefined') return;
  const filtersEl = section.querySelector('.pro-filters');
  const grid = section.querySelector('.pro-grid');
  const esc = (t) => String(t).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  const arrow = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
  const bug = '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><g fill="#1e1e20"><ellipse cx="8" cy="9" rx="3.4" ry="4.4"/><circle cx="8" cy="3.8" r="2"/></g><g stroke="#1e1e20" stroke-width="1.1" stroke-linecap="round"><line x1="4.8" y1="7" x2="2" y2="5.5"/><line x1="4.6" y1="9.5" x2="1.6" y2="9.5"/><line x1="4.8" y1="12" x2="2" y2="13.8"/><line x1="11.2" y1="7" x2="14" y2="5.5"/><line x1="11.4" y1="9.5" x2="14.4" y2="9.5"/><line x1="11.2" y1="12" x2="14" y2="13.8"/><line x1="7" y1="2.2" x2="5.6" y2=".6"/><line x1="9" y1="2.2" x2="10.4" y2=".6"/></g></svg>';

  function media(p) {
    if (!p.media) return '<span class="pro-media-empty">Image coming soon</span>';
    if (/\.(mp4|webm)$/i.test(p.media)) return `<video src="${esc(p.media)}"${p.poster ? ` poster="${esc(p.poster)}"` : ''} autoplay muted loop playsinline preload="metadata" aria-hidden="true"${p.position ? ` style="object-position:${esc(p.position)}"` : ''}></video>`;
    return `<img src="${esc(p.media)}" alt="${esc(p.alt || p.title)}" loading="lazy"${p.position ? ` style="object-position:${esc(p.position)}"` : ''}>`;
  }

  // Store icons (icon-only tiles); a card with them becomes a div with a full-card link behind them (no nested links)
  const BADGE = {
    appstore: ['<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#1e1e20" d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg>', 'Download on the App Store'],
    googleplay: ['<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#00A0FF" d="M3.6 1.8 13.4 12 3.6 22.2c-.3-.2-.5-.6-.5-1.1V2.9c0-.5.2-.9.5-1.1z"/><path fill="#00D46A" d="M3.6 1.8c.3-.2.7-.2 1 0l12 6.9L13.4 12z"/><path fill="#FFC400" d="m16.6 8.7 3.7 2.1c1 .6 1 1.8 0 2.4l-3.7 2.1-3.2-3.3z"/><path fill="#FF3A44" d="M3.6 22.2 13.4 12l3.2 3.3-12 6.9c-.3.2-.7.2-1 0z"/></svg>', 'Get it on Google Play'],
  };
  const badges = (list) => {
    const items = (list || []).filter((x) => BADGE[x.store] && (x.href || x.show));
    return items.length ? `<div class="pro-stores">${items.map((x) => {
      const img = BADGE[x.store][0];
      return x.href ? `<a class="pro-store" href="${esc(x.href)}" target="_blank" rel="noopener" aria-label="${BADGE[x.store][1]}" title="${BADGE[x.store][1]}">${img}</a>` : `<span class="pro-store" role="img" aria-label="${BADGE[x.store][1]}">${img}</span>`;
    }).join('')}</div>` : '';
  };

  grid.innerHTML = PROJECTS.map((p) => {
    const storeRow = badges(p.stores);
    const tag = p.href && !storeRow ? 'a' : 'div';
    const ext = p.href && /^https?:/.test(p.href) ? ' target="_blank" rel="noopener"' : '';
    const link = tag === 'a' ? ` href="${esc(p.href)}"${ext}` : '';
    const cover = p.href && storeRow ? `<a class="pro-link" href="${esc(p.href)}"${ext} aria-label="${esc(p.title)}"></a>` : '';
    const foot = p.status === 'wip'
      ? `<button class="pro-sign" type="button" aria-label="Still fixing bugs — click to squash one">
           <span class="pro-sign-bug">${bug}</span>
           <span class="pro-sign-board"><span class="pro-sign-text">Fixing bugs</span><span class="pro-sign-count"></span></span>
         </button>`
      : `<span class="btn btn--icon pro-cta" aria-hidden="true">${arrow}</span>`;
    return `<${tag} class="pro-card${storeRow ? ' has-stores' : ''}" data-filters="${esc(p.filters.join('|'))}"${p.hideInAll ? ' data-hide-all="1" hidden' : ''}${link}>
      ${cover}<div class="pro-media">${media(p)}${p.badge ? `<span class="pro-badge">${esc(p.badge)}</span>` : ''}</div>
      <p class="pro-eyebrow">${p.company ? `<b class="pro-company">${esc(p.company)}</b><span>·</span>` : ''}${esc(p.audience)}<span>·</span>${esc(p.descriptor)}</p>
      <h3 class="pro-title">${esc(p.title)}</h3>
      <p class="pro-summary">${esc(p.summary)}</p>
      ${storeRow ? `<div class="pro-foot">${foot}${storeRow}</div>` : foot}
    </${tag}>`;
  }).join('');

  // Filter pills (inside a glass segmented control)
  const seg = document.createElement('div');
  seg.className = 'glass-seg';
  filtersEl.appendChild(seg);
  ['All', ...FILTERS].forEach((name, k) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'pro-filter' + (k === 0 ? ' active' : '');
    b.textContent = name; b.setAttribute('aria-pressed', k === 0);
    b.addEventListener('click', () => {
      seg.querySelectorAll('.pro-filter').forEach((x) => { x.classList.toggle('active', x === b); x.setAttribute('aria-pressed', x === b); });
      grid.querySelectorAll('.pro-card').forEach((card) => {
        const show = name === 'All' ? !card.dataset.hideAll : card.dataset.filters.split('|').includes(name);
        card.hidden = !show;
        if (show && !reduced) card.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], { duration: 350, easing: 'ease-out' });
      });
    });
    seg.appendChild(b);
  });

  // Bug sign: squash on click, count, a new bug crawls on
  grid.querySelectorAll('.pro-sign').forEach((sign) => {
    const board = sign.querySelector('.pro-sign-board');
    const count = sign.querySelector('.pro-sign-count');
    const setW = () => sign.style.setProperty('--sign-w', board.offsetWidth + 'px');
    setW(); document.fonts?.ready.then(setW);
    let n = 0;
    sign.addEventListener('click', (e) => {
      e.preventDefault(); e.stopPropagation();
      if (sign.classList.contains('squashed')) return;
      sign.classList.add('squashed');
      n++; count.textContent = `${n} squashed`;
      setTimeout(() => sign.classList.remove('squashed'), 1100);
    });
  });

  // Title word reveal + cards rise in as they scroll into view
  const title = section.querySelector('.section-title');
  splitWords(title);
  const cards = [...grid.querySelectorAll('.pro-card')];
  if (!reduced) cards.forEach((c) => c.classList.add('pre'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      e.target.classList.remove('pre');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -28% 0px' });
  io.observe(title);
  cards.forEach((c) => io.observe(c));
})();

/* ---------- Tab bar: highlight follows the section in view ---------- */
(() => {
  const bar = document.querySelector('.tabbar');
  if (!bar) return;
  const glow = bar.querySelector('.tab-glow');
  const tabs = [...bar.querySelectorAll('.tab[data-section]')];
  const sections = tabs.map((t) => document.getElementById(t.dataset.section));
  let activeIdx = -1, lockUntil = 0;

  // Tabs are equal width, so the highlight only ever slides (transform), never resizes
  function setActive(i) {
    if (i === activeIdx || i < 0) return;
    activeIdx = i;
    tabs.forEach((t, k) => {
      t.classList.toggle('active', k === i);
      if (k === i) t.setAttribute('aria-current', 'true'); else t.removeAttribute('aria-current');
    });
    glow.style.setProperty('--glow-x', tabs[i].offsetLeft - 8 + 'px');
  }

  // Section tops are measured once (and on resize), not on every scroll frame
  let tops = [];
  const measure = () => { tops = sections.map((s) => (s ? s.getBoundingClientRect().top + scrollY : Infinity)); };

  let queued = false;
  const sync = () => {
    queued = false;
    if (performance.now() < lockUntil) return;          // a tap is scrolling us there; don't flicker through sections
    const y = scrollY + innerHeight * 0.45;
    // the section whose top is closest above the line (tabs aren't in page order)
    let idx = 0, best = -Infinity;
    tops.forEach((t, k) => { if (y >= t && t > best) { best = t; idx = k; } });
    setActive(idx);
  };
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(sync); } }, { passive: true });
  addEventListener('scrollend', () => { lockUntil = 0; sync(); });
  addEventListener('resize', () => { measure(); const i = activeIdx; activeIdx = -1; setActive(i); });
  addEventListener('load', () => { measure(); sync(); });
  document.fonts?.ready.then(() => { measure(); sync(); });
  measure(); sync();
  requestAnimationFrame(() => bar.classList.add('ready'));

  // Tap: highlight goes straight to the tab and stays put while the page scrolls
  tabs.forEach((t, k) => t.addEventListener('click', () => { setActive(k); lockUntil = performance.now() + 1200; }));

  // Get out of the way while pictures are spread out of a folder
  const pf = document.querySelector('.pf-stage');
  if (pf) new MutationObserver(() => bar.classList.toggle('hide', pf.classList.contains('has-open'))).observe(pf, { attributes: true, attributeFilter: ['class'] });

  // Sections change height when a folder opens on phones: re-measure
  new ResizeObserver(measure).observe(document.body);
})();
