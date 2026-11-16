/* ---------- Case study renderer ----------
   Builds the page from CASE (cases/<name>.js). You shouldn't need to edit
   this file to change content — edit the case file instead.
------------------------------------------ */
(() => {
  if (typeof CASE === 'undefined') return;
  const root = document.getElementById('case');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.title = `${CASE.title} — Ishan Tandel`;
  if (CASE.accent) document.documentElement.style.setProperty('--cs-accent', CASE.accent);

  const esc = (t) => String(t ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const rich = (t, tag = 'strong') => esc(t).replace(/\*(.+?)\*/g, `<${tag}>$1</${tag}>`);
  const eyebrow = (t) => (t ? `<p class="cs-eyebrow cs-reveal">${esc(t)}</p>` : '');
  const h2 = (t) => `<h2 class="cs-h2 cs-reveal">${rich(t)}</h2>`;
  const lede = (t) => (t ? `<p class="cs-lede cs-reveal">${rich(t)}</p>` : '');

  // A phone screen: the image, or a labelled placeholder in the same shape
  const phone = (img = {}, extra = '') => `
    <figure class="cs-phone ${extra}">
      ${img.src
        ? (/\.(mp4|webm)$/i.test(img.src)
            ? `<video src="${esc(img.src)}" autoplay muted loop playsinline aria-label="${esc(img.label)}"></video>`
            : `<img src="${esc(img.src)}" alt="${esc(img.label)}" loading="lazy" decoding="async">`)
        : `<span class="cs-ph">${esc(img.label || 'Screen')}</span>`}
    </figure>`;

  // A labelled bullet list: { label, items: [] }
  const listHTML = (g) => `
    ${g.label ? `<p class="cs-tag">${esc(g.label)}</p>` : ''}
    <ul class="cs-bullets">${g.items.map((x) => `<li>${rich(x)}</li>`).join('')}</ul>`;

  // A wide image that opens full size in a new tab
  const figure = (im) => `
    <figure class="cs-fig cs-reveal ${im.bg ? 'cs-fig--bg' : ''}" style="${im.max ? `max-width:${im.max}px;` : ''}${im.bg ? `--fig-bg:${esc(im.bg)}` : ''}">
      ${im.src
        ? `<a href="${esc(im.src)}" target="_blank" rel="noopener"><img src="${esc(im.src)}" alt="${esc(im.label)}" loading="lazy" decoding="async"></a>`
        : `<span class="cs-ph">${esc(im.label || 'Image')}</span>`}
      ${im.caption ? `<figcaption>${rich(im.caption)}</figcaption>` : ''}
    </figure>`;

  const R = {
    hero: (b) => `
      <section class="cs-sec cs-hero">
        <div class="cs-icon cs-reveal">${b.icon ? `<img src="${esc(b.icon)}" alt="">` : '<span></span>'}</div>
        <h1 class="cs-title cs-reveal">${rich(b.title, 'em')}</h1>
        <p class="cs-intro cs-reveal">${rich(b.intro)}</p>
        ${b.meta ? `<dl class="cs-meta cs-reveal">${b.meta.map((m) => `<div><dt>${esc(m.label)}</dt><dd>${esc(m.value)}</dd></div>`).join('')}</dl>` : ''}
      </section>`,

    showcase: (b) => `
      <section class="cs-sec cs-showcase">
        <div class="cs-row">${b.images.map((im, i) => phone(im, 'cs-reveal" style="--d:' + i)).join('')}</div>
      </section>`,

    context: (b) => `
      <section class="cs-sec">
        ${eyebrow(b.eyebrow)}${h2(b.title)}
        <div class="cs-duo">
          ${[b.before, b.after].map((s) => `
            <div class="cs-duo-col cs-reveal">
              <p class="cs-tag">${esc(s.label)}</p>
              ${phone(s.image)}
              <p class="cs-note">${rich(s.text)}</p>
            </div>`).join('')}
        </div>
      </section>`,

    ask: (b) => `
      <section class="cs-sec">
        ${eyebrow(b.eyebrow)}${h2(b.title)}${lede(b.text)}
        <div class="cs-voices">
          ${b.voices.map((v, i) => `
            <figure class="cs-voice cs-reveal" style="--d:${i}">
              <p class="cs-voice-method">${esc(v.method)}</p>
              <blockquote>“${esc(v.quote)}”</blockquote>
              <figcaption>${esc(v.who)}</figcaption>
            </figure>`).join('')}
        </div>
        ${b.insight ? `<div class="cs-insight cs-reveal"><span>${esc(b.insight.label)}</span><p>${rich(b.insight.text)}</p></div>` : ''}
      </section>`,

    statement: (b) => `
      <section class="cs-sec cs-statement">
        ${eyebrow(b.eyebrow)}${h2(b.title)}${lede(b.text)}
      </section>`,

    journey: (b) => `
      <section class="cs-sec cs-journey" data-view="after">
        ${eyebrow(b.eyebrow)}${h2(b.title)}
        <div class="cs-seg cs-reveal" role="tablist" aria-label="Journey">
          <button type="button" role="tab" data-v="before">Before</button>
          <button type="button" role="tab" data-v="after" class="on">After</button>
          <span class="cs-seg-key"><i></i> Drop-off point</span>
        </div>
        ${['before', 'after'].map((k) => `
          <ol class="cs-steps cs-steps--${k} cs-reveal">
            ${b[k].map((s, i) => `<li class="${s.drop ? 'drop' : ''}" style="--i:${i}"><span class="cs-step-n">${String(i + 1).padStart(2, '0')}</span><span class="cs-step-l">${esc(s.label)}</span></li>`).join('')}
          </ol>`).join('')}
        <p class="cs-note cs-reveal cs-journey-sum"></p>
      </section>`,

    research: (b) => `
      <section class="cs-sec cs-tabs-sec">
        ${eyebrow(b.eyebrow)}${h2(b.title)}
        <div class="cs-tabs cs-reveal" role="tablist">
          ${b.tabs.map((t, i) => `<button type="button" role="tab" class="${i ? '' : 'on'}" data-t="${i}"><span>${String(i + 1).padStart(2, '0')}</span>${esc(t.name)}</button>`).join('')}
        </div>
        ${b.tabs.map((t, i) => `
          <div class="cs-panel cs-reveal" data-t="${i}" ${i ? 'hidden' : ''}>
            ${t.note ? `<p class="cs-note">${rich(t.note)}</p>` : ''}
            ${t.kind === 'grid' ? `<div class="cs-chipgrid">${t.items.map((x) => `<span>${esc(x)}</span>`).join('')}</div>` : ''}
            ${t.kind === 'personas' ? `<div class="cs-personas">${t.items.map((p) => `
              <div class="cs-persona"><div class="cs-persona-ph"></div><div><h3>${esc(p.name)}</h3><p>“${esc(p.quote)}”</p><ul>${(p.traits || []).map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div></div>`).join('')}</div>` : ''}
            ${t.kind === 'list' ? `<dl class="cs-list">${t.items.map((x) => `<div><dt>${esc(x.name)}</dt><dd>${esc(x.note)}</dd></div>`).join('')}</dl>` : ''}
          </div>`).join('')}
      </section>`,

    principles: (b) => `
      <section class="cs-sec">
        ${eyebrow(b.eyebrow)}${h2(b.title)}
        <div class="cs-principles">
          ${b.rows.map((r, i) => `
            <div class="cs-pp cs-reveal" style="--d:${i}">
              <span class="cs-pp-n">${String(i + 1).padStart(2, '0')}</span>
              <div><p class="cs-tag">Problem</p><h3>${esc(r.problem)}</h3><p class="cs-note">${rich(r.note)}</p></div>
              <svg class="cs-pp-arrow" viewBox="0 0 24 24" aria-hidden="true"><line x1="4" y1="12" x2="20" y2="12"/><polyline points="14 6 20 12 14 18"/></svg>
              <div><p class="cs-tag">Principle</p><h3 class="cs-accent">${esc(r.principle)}</h3></div>
            </div>`).join('')}
        </div>
      </section>`,

    feature: (b) => `
      <section class="cs-sec cs-feature ${b.before ? '' : 'cs-feature--single'}">
        <div class="cs-feature-head">${eyebrow(b.eyebrow)}${h2(b.title)}${lede(b.text)}</div>
        <div class="cs-ba">
          ${b.before ? `<div class="cs-ba-col cs-ba-col--before cs-reveal"><p class="cs-tag">Before</p>${phone(b.before.image)}<p class="cs-note">${rich(b.before.note)}</p></div>` : ''}
          ${b.after ? `<div class="cs-ba-col cs-ba-col--after cs-reveal" style="--d:1"><p class="cs-tag">${b.before ? 'After' : ''}</p>${phone(b.after.image, 'cs-phone--lg')}<p class="cs-note">${rich(b.after.note)}</p></div>` : ''}
        </div>
      </section>`,

    iterations: (b) => `
      <section class="cs-sec cs-tabs-sec">
        ${eyebrow(b.eyebrow)}${h2(b.title)}${lede(b.text)}
        <div class="cs-tabs cs-reveal" role="tablist">
          ${b.tabs.map((t, i) => `<button type="button" role="tab" class="${i ? '' : 'on'}" data-t="${i}"><span>${String(i + 1).padStart(2, '0')}</span>${esc(t.name)}</button>`).join('')}
        </div>
        ${b.tabs.map((t, i) => `
          <div class="cs-panel" data-t="${i}" ${i ? 'hidden' : ''}>
            ${t.note ? `<p class="cs-note">${rich(t.note)}</p>` : ''}
            <div class="cs-row">${t.images.map((im) => phone(im)).join('')}</div>
          </div>`).join('')}
      </section>`,

    results: (b) => `
      <section class="cs-sec cs-results">
        ${eyebrow(b.eyebrow)}${b.title ? h2(b.title) : ''}
        <div class="cs-nums">
          ${b.items.map((x, i) => `
            <div class="cs-num cs-reveal" style="--d:${i}">
              <span class="cs-num-v" data-v="${esc(x.num)}">${esc(x.num)}</span>
              <span class="cs-num-l">${esc(x.label)}</span>
            </div>`).join('')}
        </div>
      </section>`,

    reflection: (b) => `
      <section class="cs-sec">
        ${eyebrow(b.eyebrow)}${h2(b.title)}
        <ol class="cs-reflect">
          ${b.items.map((x, i) => `
            <li class="cs-reveal" style="--d:${i}">
              <span class="cs-pp-n">${String(i + 1).padStart(2, '0')}</span>
              <div><h3>${esc(x.name)}</h3><p class="cs-tag">${esc(x.tools)}</p></div>
              <p class="cs-note">${rich(x.text)}</p>
            </li>`).join('')}
        </ol>
      </section>`,

    next: (b) => `
      <section class="cs-sec">${eyebrow(b.eyebrow)}${h2(b.title)}${lede(b.text)}</section>`,

    /* ---- text-and-image blocks for longer case studies ---- */

    // A grid of small cards: items [{ title, text }]
    cards: (b) => `
      <section class="cs-sec">
        ${eyebrow(b.eyebrow)}${h2(b.title)}${lede(b.text)}
        <div class="cs-cards" style="--cols:${b.cols || 3}">
          ${b.items.map((x, i) => `
            <div class="cs-card cs-reveal" style="--d:${i}">
              <span class="cs-pp-n">${String(i + 1).padStart(2, '0')}</span>
              <h3>${rich(x.title)}</h3>
              <p class="cs-note">${rich(x.text)}</p>
            </div>`).join('')}
        </div>
        ${b.after ? listHTML(b.after) : ''}
      </section>`,

    // Columns of labelled bullet lists: groups [{ label, items: [] }]
    facts: (b) => `
      <section class="cs-sec">
        ${eyebrow(b.eyebrow)}${h2(b.title)}${lede(b.text)}
        <div class="cs-facts">${b.groups.map((g, i) => `<div class="cs-reveal" style="--d:${i}">${listHTML(g)}</div>`).join('')}</div>
        ${b.callout ? `<div class="cs-callout cs-reveal"><span>${esc(b.callout.label)}</span><p>${rich(b.callout.text)}</p></div>` : ''}
      </section>`,

    // One bullet list, optionally followed by a wide image
    list: (b) => `
      <section class="cs-sec">
        ${eyebrow(b.eyebrow)}${h2(b.title)}${lede(b.text)}
        <div class="cs-reveal">${listHTML(b)}</div>
        ${b.callout ? `<div class="cs-callout cs-reveal"><span>${esc(b.callout.label)}</span><p>${rich(b.callout.text)}</p></div>` : ''}
        ${(b.images || []).map((im) => figure(im)).join('')}
      </section>`,

    // Wide image(s): images [{ src, label, max }]
    figure: (b) => `
      <section class="cs-sec ${b.title ? '' : 'cs-sec--tight'}">
        ${eyebrow(b.eyebrow)}${b.title ? h2(b.title) : ''}${lede(b.text)}
        ${b.images.map((im) => figure(im)).join('')}
      </section>`,

    // Labelled grid of wide screenshots
    gallery: (b) => `
      <section class="cs-sec">
        ${eyebrow(b.eyebrow)}${h2(b.title)}${lede(b.text)}
        <div class="cs-gallery" style="--cols:${b.cols || 3}">
          ${b.images.map((im, i) => `
            <a class="cs-shot cs-reveal" style="--d:${i % 3}" href="${esc(im.src)}" target="_blank" rel="noopener">
              <img src="${esc(im.src)}" alt="${esc(im.label)}" loading="lazy" decoding="async">
              <span>${esc(im.label)}</span>
            </a>`).join('')}
        </div>
      </section>`,

    // Options explored, each with pros, cons and a decision (adopted | partial | rejected)
    approaches: (b) => `
      <section class="cs-sec">
        ${eyebrow(b.eyebrow)}${h2(b.title)}${lede(b.text)}
        <div class="cs-approaches">
          ${b.items.map((a, i) => `
            <article class="cs-approach cs-approach--${esc(a.status)} cs-reveal">
              <header>
                <p class="cs-tag">Approach ${i + 1}</p>
                <h3>${esc(a.title)}</h3>
                <span class="cs-verdict">${{ adopted: 'Adopted', partial: 'Partly adopted', rejected: 'Rejected' }[a.status] || ''}</span>
              </header>
              <p class="cs-note">${rich(a.text)}</p>
              <div class="cs-pc">
                <div><p class="cs-tag">Why it could work</p><ul class="cs-plus">${a.pros.map((p) => `<li>${rich(p)}</li>`).join('')}</ul></div>
                <div><p class="cs-tag">Challenges</p><ul class="cs-minus">${a.cons.map((p) => `<li>${rich(p)}</li>`).join('')}</ul></div>
              </div>
              <p class="cs-decision"><strong>Decision.</strong> ${rich(a.decision)}</p>
            </article>`).join('')}
        </div>
      </section>`,

    // Numbered insight rows: items [{ title, text }]
    insights: (b) => `
      <section class="cs-sec">
        ${eyebrow(b.eyebrow)}${h2(b.title)}${lede(b.text)}
        <ol class="cs-insights">
          ${b.items.map((x, i) => `
            <li class="cs-reveal" style="--d:${i}">
              <span class="cs-pp-n">${String(i + 1).padStart(2, '0')}</span>
              <h3>${rich(x.title)}</h3>
              <p class="cs-note">${rich(x.text)}</p>
            </li>`).join('')}
        </ol>
      </section>`,

    // Link out to a prototype, with an optional preview image
    prototype: (b) => `
      <section class="cs-sec">
        ${eyebrow(b.eyebrow)}${h2(b.title)}${lede(b.text)}
        <a class="cs-proto cs-reveal" href="${esc(b.href)}" target="_blank" rel="noopener">
          ${b.image ? `<img src="${esc(b.image)}" alt="" loading="lazy" decoding="async">` : ''}
          <span class="cs-proto-btn">${esc(b.label || 'Open prototype')}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="8 7 17 7 17 16"/></svg></span>
        </a>
      </section>`,

    end: (b) => `
      <section class="cs-sec cs-end">
        <div class="cs-icon cs-reveal"><span></span></div>
        <h2 class="cs-h2 cs-reveal">${rich(b.title)}</h2>
        ${b.cta ? `<a class="btn cs-reveal" href="${esc(b.cta.href)}">${esc(b.cta.label)}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>` : ''}
      </section>`,
  };

  root.innerHTML = CASE.blocks.map((b) => {
    const html = (R[b.type] || (() => ''))(b);
    return b.dark ? html.replace('class="cs-sec', 'class="cs-sec cs-dark') : html;
  }).join('');

  // reuse the hero's icon at the end
  const heroIcon = root.querySelector('.cs-hero .cs-icon')?.innerHTML;
  root.querySelectorAll('.cs-end .cs-icon').forEach((el) => { if (heroIcon) el.innerHTML = heroIcon; });

  /* ---- reveal on scroll ---- */
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    io.unobserve(e.target);
  }), { rootMargin: '0px 0px -12% 0px' });
  root.querySelectorAll('.cs-reveal').forEach((el) => (reduced ? el.classList.add('in') : io.observe(el)));

  /* ---- tabs (research + iterations) ---- */
  root.querySelectorAll('.cs-tabs-sec').forEach((sec) => {
    const btns = [...sec.querySelectorAll('.cs-tabs button')];
    const panels = [...sec.querySelectorAll('.cs-panel')];
    btns.forEach((b) => b.addEventListener('click', () => {
      btns.forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-selected', x === b); });
      panels.forEach((p) => {
        const on = p.dataset.t === b.dataset.t;
        p.hidden = !on;
        if (on) { p.classList.add('in'); if (!reduced) p.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 350, easing: 'ease-out' }); }
      });
    }));
  });

  /* ---- journey before/after ---- */
  root.querySelectorAll('.cs-journey').forEach((sec) => {
    const btns = [...sec.querySelectorAll('.cs-seg button')];
    const sum = sec.querySelector('.cs-journey-sum');
    const count = (v) => sec.querySelectorAll(`.cs-steps--${v} li`).length;
    const drops = (v) => sec.querySelectorAll(`.cs-steps--${v} li.drop`).length;
    const set = (v) => {
      sec.dataset.view = v;
      btns.forEach((b) => b.classList.toggle('on', b.dataset.v === v));
      sum.textContent = `${count(v)} steps · ${drops(v)} drop-off point${drops(v) === 1 ? '' : 's'}`;
    };
    btns.forEach((b) => b.addEventListener('click', () => set(b.dataset.v)));
    set('after');
  });

  /* ---- results count up ---- */
  const countIO = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    countIO.unobserve(e.target);
    const raw = e.target.dataset.v, m = raw.match(/^([^\d]*)([\d.,]+)(.*)$/);
    if (!m || reduced) return;
    const [, pre, numStr, post] = m, target = parseFloat(numStr.replace(/,/g, '')), dec = (numStr.split('.')[1] || '').length;
    const t0 = performance.now(), dur = 1400;
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / dur), v = target * (1 - Math.pow(1 - k, 3));
      e.target.textContent = pre + v.toFixed(dec) + post;
      if (k < 1) requestAnimationFrame(tick); else e.target.textContent = raw;
    };
    requestAnimationFrame(tick);
  }), { rootMargin: '0px 0px -15% 0px' });
  root.querySelectorAll('.cs-num-v').forEach((el) => countIO.observe(el));

  /* ---- reading progress + dark sections ---- */
  const bar = document.querySelector('.cs-progress span');
  const darks = [...root.querySelectorAll('.cs-dark')];
  const back = document.querySelector('.cs-back');
  let queued = false;
  const onScroll = () => {
    queued = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    const y = 40;   // the back button's height on screen
    back.classList.toggle('on-dark', darks.some((d) => { const r = d.getBoundingClientRect(); return r.top <= y && r.bottom > y; }));
  };
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
})();
