/* ---------- Testimonials + Contact: edit your content here ----------
   TESTIMONIALS  quote, name, role, company, image ('' = initial letter)
   CONTACT       each row: text with the *bold word* in stars,
                 type 'email' (copies the address) or 'link' (opens href),
                 hint = what the cursor pill says over that row
----------------------------------------------------------------------- */
const TESTIMONIALS = [
  { quote: "Working with Ishan, I've come to appreciate his intuitive understanding of design. From a client's perspective, it's ideal when your designer not only understands the brief but consistently exceeds expectations without needing detailed instructions.", name: 'Chaitanya Pandit', role: 'Co-founder', company: 'EnableWealth', image: 'img/testimonials/chaitanya-pandit.jpg' },
  { quote: 'Ishan has a great design and UX sense. Very keen on experimenting and learning new things as well.', name: 'Badal Agrawal', role: 'Sr. Product Manager', company: 'CoinDCX (previously PM at Zoth)', image: 'img/testimonials/badal-agrawal.jpg' },
  { quote: 'Ishan is inquisitive in nature and performs all his given tasks in perfection. He goes beyond what is expected and explores various solutions.', name: 'Jay Kiruthika', role: 'Senior Lecturer', company: 'Kingston University', image: 'img/testimonials/jay-kiruthika.jpg' },
];

const CONTACT = [
  { text: 'say hello by *email*',        type: 'email', value: 'ishan.tandel1803@gmail.com', hint: 'copy email address' },
  { text: 'connect on *LinkedIn*',       type: 'link',  href: 'https://www.linkedin.com/in/ishan-tandel-90b592222/', hint: 'in/ishan-tandel' },
  { text: 'quick thoughts on *X*',       type: 'link',  href: 'https://x.com/',            hint: '@yourhandle' },
  { text: 'longer reads on *Medium*',    type: 'link',  href: 'https://medium.com/',       hint: '@yourhandle' },
];

(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const revealOnce = (el, margin = '-35%') => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect(); } }, { rootMargin: `0px 0px ${margin} 0px` });
    io.observe(el);
  };

  /* ---- Testimonials: a slow marquee that eases down on hover ---- */
  const tmSection = document.getElementById('testimonials');
  if (tmSection) {
    const viewport = tmSection.querySelector('.tm-viewport');
    const track = tmSection.querySelector('.tm-track');
    track.innerHTML = TESTIMONIALS.map((t) => `
      <figure class="tm-card">
        <blockquote class="tm-quote">${esc(t.quote)}</blockquote>
        <figcaption class="tm-attrib">
          ${t.image ? `<img class="tm-avatar" src="${esc(t.image)}" alt="${esc(t.name)}" loading="lazy" draggable="false">`
                    : `<span class="tm-avatar tm-avatar--empty" aria-hidden="true">${esc((t.name || '?').trim().charAt(0).toUpperCase())}</span>`}
          <span class="tm-who"><span class="tm-name">${esc(t.name)}</span><span class="tm-role">${esc([t.role, t.company].filter(Boolean).join(', '))}</span></span>
        </figcaption>
      </figure>`).join('');

    const title = tmSection.querySelector('.tm-title');
    splitWords(title); revealOnce(title);

    if (!fine || reduced) {
      viewport.classList.add('is-swipe');           // touch: a native, snapping swipe row
    } else {
      viewport.classList.add('is-marquee');
      const clone = track.cloneNode(true);
      clone.classList.add('tm-track--clone');
      clone.setAttribute('aria-hidden', 'true');
      viewport.appendChild(clone);
      const SPEED = 74, SLOW = 26;                  // px per second
      let setW = 0, offset = 0, speed = SPEED, target = SPEED, last = 0, on = false;
      const measure = () => { setW = track.scrollWidth + (parseFloat(getComputedStyle(track).columnGap) || 0); };
      const frame = (t) => {
        if (!on) return;
        const dt = Math.min(50, t - (last || t)) / 1000; last = t;
        speed += (target - speed) * (target > speed ? 0.08 : 0.16);
        offset = (offset + speed * dt) % (setW || 1);
        track.style.transform = `translate3d(${-offset}px,0,0)`;
        clone.style.transform = `translate3d(${setW - offset}px,0,0)`;
        requestAnimationFrame(frame);
      };
      viewport.addEventListener('pointerenter', () => { target = SLOW; });
      viewport.addEventListener('pointerleave', () => { target = SPEED; });
      viewport.addEventListener('focusin', () => { target = SLOW; });
      viewport.addEventListener('focusout', () => { target = SPEED; });
      addEventListener('resize', measure);
      document.fonts?.ready.then(measure);
      measure();
      // only run while on screen
      new IntersectionObserver(([e]) => {
        on = e.isIntersecting;
        if (on) { last = 0; requestAnimationFrame(frame); }
      }).observe(viewport);
    }
  }

  /* ---- Contact rows ---- */
  const contact = document.getElementById('contact');
  if (!contact) return;
  const table = contact.querySelector('.contact-table');
  const bold = (t) => esc(t).replace(/\*(.+?)\*/g, '<strong>$1</strong>');
  table.innerHTML = CONTACT.map((c, i) => c.type === 'email'
    ? `<button type="button" class="contact-row" data-i="${i}" aria-label="Copy email address ${esc(c.value)}">
         <span class="contact-row-text">${bold(c.text)}</span>
       </button>`
    : `<a class="contact-row" data-i="${i}" href="${esc(c.href)}" target="_blank" rel="noopener">
         <span class="contact-row-text">${bold(c.text)}</span>
       </a>`).join('');
  const rows = [...table.querySelectorAll('.contact-row')];
  rows.forEach((r) => { splitWords(r.querySelector('.contact-row-text')); });
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    rows.forEach((r, k) => setTimeout(() => r.querySelector('.contact-row-text').classList.add('in'), k * 90));
    io.disconnect();
  }, { rootMargin: '0px 0px -30% 0px' });
  io.observe(table);

  // Copy the address; a glass toast confirms on touch screens, the cursor pill on desktop
  const toast = document.querySelector('.copy-toast');
  let toastTimer = 0;
  const showToast = (msg) => {
    toast.textContent = msg; toast.classList.add('visible');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('visible'), 1600);
  };
  rows.forEach((r) => {
    const c = CONTACT[r.dataset.i];
    if (c.type !== 'email') return;
    r.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(c.value); }
      catch (_) { location.href = `mailto:${c.value}`; return; }
      if (window.Cursor?.active) window.Cursor.flash('copied!', 'check');
      else showToast(`Copied ${c.value}`);
    });
  });

  // Cursor pill over each row
  if (window.Cursor) rows.forEach((r) => {
    const c = CONTACT[r.dataset.i];
    window.Cursor.attach(r, c.hint, c.type === 'email' ? 'copy' : 'out');
  });
})();
