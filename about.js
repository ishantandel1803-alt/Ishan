/* ---------- About me page: edit your content here ----------
   headline   the statement at the top. Wrap the phrase to bold in *stars*.
   photos     the ring. src = image path ('' = coloured placeholder),
              cap = the caption shown in the middle while that photo is in front.
              Square photos work best (they're cropped to squares).
   lead/tail  the two paragraphs either side of the photo.
   portrait   the photo between them (portrait shape, about 437 x 611).
-------------------------------------------------------------- */
const ABOUT = {
  headline: 'I believe the *best work* comes from people who stay curious, keep making things, and make time for what keeps them going',
  photos: [
    { src: 'img/about/ring/01.jpg', cap: 'Bright Ideas finalist' },
    { src: 'img/about/ring/04.jpg', cap: 'Hat, beach, freedom' },
    { src: 'img/about/ring/03.jpg', cap: 'Meta VR Innovation Day' },
    { src: 'img/about/ring/10.jpg', cap: 'Trails over treadmills' },
    { src: 'img/about/ring/05.jpg', cap: 'New York, new energy' },
    { src: 'img/about/ring/11.jpg', cap: 'Salt water therapy' },
    { src: 'img/about/ring/06.jpg', cap: 'Streets of Dubai' },
    { src: 'img/about/ring/12.jpg', cap: 'Found my quiet place' },
    { src: 'img/about/ring/07.jpg', cap: 'City never sleeps' },
    { src: 'img/about/ring/13.jpg', cap: 'No brakes, just rapids' },
    { src: 'img/about/ring/08.jpg', cap: 'Vegas did not disappoint' },
    { src: 'img/about/ring/14.jpg', cap: 'Barefoot & unbothered' },
    { src: 'img/about/ring/09.jpg', cap: 'Above it all' },
    { src: 'img/about/ring/15.jpg', cap: 'Breathing underwater' },
    { src: 'img/about/ring/16.jpg', cap: 'Walked into a postcard' },
  ],
  lead: 'Placeholder: what you love most about design, and the moment that makes the work feel worth it. Two or three sentences in your own voice.',
  tail: "Placeholder: who you are when you're not designing: what you do for fun, what you're learning, what keeps you going.",
  portrait: '',
};

(() => {
  const page = document.getElementById('about-page');
  if (!page) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ---- fill content ----
  const head = page.querySelector('.ap-head');
  head.innerHTML = esc(ABOUT.headline).replace(/\*(.+?)\*/g, '<span class="about-bold">$1</span>');
  page.querySelector('.ap-bio--lead').textContent = ABOUT.lead;
  page.querySelector('.ap-bio--tail').textContent = ABOUT.tail;
  page.querySelector('.ap-photo').innerHTML = ABOUT.portrait
    ? `<img src="${esc(ABOUT.portrait)}" alt="Portrait" loading="lazy" decoding="async">`
    : '<span class="ap-photo-ph">Your photo</span>';
  splitWords(head);

  // ---- the photo ring ----
  const orbit = page.querySelector('.orbit');
  const stage = page.querySelector('.orbit-stage');
  const capOuter = page.querySelector('.orbit-cap');
  const capInner = capOuter.querySelector('span');
  const HUES = [150, 20, 200, 40, 280, 120, 0, 220, 60, 180, 330, 100, 260, 30, 170];
  stage.innerHTML = ABOUT.photos.map((p, i) => `
    <figure class="orbit-photo">
      ${p.src
        ? `<img src="${esc(p.src)}" alt="${esc(p.cap)}" loading="lazy" decoding="async" draggable="false">`
        : `<span class="orbit-ph" style="--h:${HUES[i % HUES.length]}"></span>`}
    </figure>`).join('');
  const nodes = [...stage.querySelectorAll('.orbit-photo')];

  const R = { radiusX: 330, radiusY: 300, baseWidth: 250 };
  const RING = { speed: 0.22, focalAngle: 359, minScale: 0.17, maxScale: 1, falloff: 1.5 };
  function size() {
    const W = orbit.clientWidth;
    // full size on wide screens, scaled down so the ring always fits
    R.baseWidth = Math.round(Math.min(250, W * (W < 700 ? 0.3 : 0.24)));
    R.radiusX = Math.round(Math.min(330, W / 2 - R.baseWidth / 2 - (W < 700 ? 8 : 24)));
    R.radiusY = Math.round(Math.min(300, R.radiusX * (W < 700 ? 1 : 0.91)));
    orbit.style.height = 2 * R.radiusY + R.baseWidth + 48 + 'px';
    nodes.forEach((n) => { n.style.width = R.baseWidth + 'px'; });
  }

  let angle = 0, focus = -1, running = false, last = 0, visible = false;
  function render() {
    const n = nodes.length, focal = (RING.focalAngle * Math.PI) / 180;
    let best = -1, bestIdx = 0;
    for (let i = 0; i < n; i++) {
      const a = angle + (i / n) * Math.PI * 2;
      const depth = Math.pow((Math.cos(a - focal) + 1) / 2, RING.falloff);
      const scale = RING.minScale + (RING.maxScale - RING.minScale) * depth;
      const x = Math.cos(a) * R.radiusX, y = Math.sin(a) * R.radiusY;
      const el = nodes[i];
      el.style.transform = `translate(-50%,-50%) translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) scale(${scale.toFixed(4)})`;
      el.style.zIndex = Math.round(depth * 1000);
      if (depth > best) { best = depth; bestIdx = i; }
    }
    if (bestIdx !== focus) { focus = bestIdx; swapCaption(ABOUT.photos[bestIdx].cap); }
  }
  function swapCaption(text) {
    if (reduced || !capInner.textContent) { capInner.textContent = text; return; }
    capInner.getAnimations().forEach((a) => a.cancel());
    const out = capInner.animate([{ transform: 'none', opacity: 1 }, { transform: 'translateY(-110%)', opacity: 0 }],
      { duration: 90, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'forwards' });
    out.finished.then(() => {
      capInner.textContent = text;
      capInner.animate([{ transform: 'translateY(110%)', opacity: 0 }, { transform: 'none', opacity: 1 }],
        { duration: 110, easing: 'cubic-bezier(.65,0,.35,1)' });
    }).catch(() => {});
  }
  function tick(t) {
    if (!running) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    if (!reduced) angle += RING.speed * dt;
    render();
    requestAnimationFrame(tick);
  }
  const start = () => { if (!running && visible && !page.hidden) { running = true; last = 0; requestAnimationFrame(tick); } };
  const stop = () => { running = false; };
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); }, { root: page }).observe(orbit);

  // ---- open / close ----
  const back = page.querySelector('.about-back');
  const cursor = document.querySelector('.cursor-label');
  let lastFocus = null;
  function openPage(push = true) {
    if (!page.hidden) return;
    lastFocus = document.activeElement;
    page.hidden = false;
    page.scrollTop = 0;
    document.documentElement.classList.add('ap-open');
    cursor?.classList.remove('visible');
    if (window.Cursor) window.Cursor.active = false;
    if (push && location.hash !== '#about-me') history.pushState({ aboutMe: true }, '', '#about-me');
    size(); render();
    requestAnimationFrame(() => {
      page.classList.add('visible');
      setTimeout(() => head.classList.add('in'), 150);
      back.focus({ preventScroll: true, focusVisible: false });
      visible = true; start();
    });
  }
  function closePage(fromHistory = false) {
    if (page.hidden) return;
    page.classList.remove('visible');
    document.documentElement.classList.remove('ap-open');
    stop();
    if (!fromHistory && location.hash === '#about-me') history.back();
    setTimeout(() => {
      page.hidden = true;
      head.classList.remove('in');
      page.querySelectorAll('.ap-reveal').forEach((el) => el.classList.remove('in'));
    }, 450);
    lastFocus?.focus?.({ preventScroll: true });
  }

  document.getElementById('about')?.addEventListener('click', (e) => { e.preventDefault(); openPage(); });
  back.addEventListener('click', () => closePage());
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !page.hidden) closePage(); });
  addEventListener('popstate', () => { location.hash === '#about-me' ? openPage(false) : closePage(true); });
  addEventListener('resize', () => { if (!page.hidden) { size(); render(); } });
  if (location.hash === '#about-me') openPage(false);

  // The profile block rises in as you scroll down the page
  const profile = page.querySelector('.ap-profile');
  [...profile.children].forEach((el, i) => { el.classList.add('ap-reveal'); el.style.transitionDelay = i * 120 + 'ms'; });
  new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) [...profile.children].forEach((el) => el.classList.add('in'));
  }), { root: page, rootMargin: '0px 0px -20% 0px' }).observe(profile);
})();
