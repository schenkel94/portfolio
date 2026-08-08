/* ==========================================================================
   S³ LABS — interações
   Vanilla JS, sem dependências. Tudo que anima respeita prefers-reduced-motion.
   ========================================================================== */
(() => {
  'use strict';

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------- ano ---- */
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------------------------------------------- navbar + progresso ---- */
  const nav = $('#nav');
  const progress = $('#scrollProgress');
  const sections = $$('main section[id]');
  const navLinks = $$('.nav__link');

  let ticking = false;
  function onScroll() {
    const y = window.scrollY;

    if (nav) nav.classList.toggle('is-stuck', y > 20);

    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    }

    // link ativo — a seção que cruza a linha de 38% da viewport
    const line = y + window.innerHeight * 0.38;
    let current = '';
    for (const sec of sections) if (sec.offsetTop <= line) current = sec.id;
    for (const l of navLinks) l.classList.toggle('is-active', l.getAttribute('href') === `#${current}`);

    parallax();
    ticking = false;
  }
  function requestScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }
  window.addEventListener('scroll', requestScroll, { passive: true });
  window.addEventListener('resize', requestScroll, { passive: true });

  /* ---------------- parallax do retrato (sobe suave ao rolar a seção) ---- */
  const portraitImg = $('#portraitImg');
  let py = 0, pyTarget = 0, rafPortrait = null;

  function parallax() {
    if (!portraitImg || reduced) return;
    const frame = portraitImg.parentElement;          // .portrait
    const r = frame.getBoundingClientRect();
    // só calcula enquanto o quadro está na tela
    if (r.bottom < -80 || r.top > window.innerHeight + 80) return;

    // t = 0 quando o quadro acabou de entrar por baixo; 1 quando saiu por cima
    const t = 1 - (r.top + r.height) / (window.innerHeight + r.height);
    // o deslocamento fica abaixo da folga da imagem (bottom: -10%), então
    // ela nunca descola da base do quadro
    const max = Math.min(r.height * 0.08, 36);
    pyTarget = -Math.min(Math.max(t, 0), 1) * max;

    if (!rafPortrait) rafPortrait = requestAnimationFrame(easePortrait);
  }
  function easePortrait() {
    py += (pyTarget - py) * 0.08;                     // lerp: movimento macio
    portraitImg.style.setProperty('--py', `${py.toFixed(2)}px`);
    rafPortrait = Math.abs(pyTarget - py) > 0.1 ? requestAnimationFrame(easePortrait) : null;
  }

  /* ---------------------------------------------------- menu mobile ---- */
  const burger = $('#burger');
  if (burger) {
    const toggle = (open) => {
      document.body.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', () => toggle(!document.body.classList.contains('menu-open')));
    $$('.mobile-menu__link, .mobile-menu__foot a').forEach(a =>
      a.addEventListener('click', () => toggle(false))
    );
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) toggle(false);
    });
  }

  /* -------------------------------------------- reveal ao rolar -------- */
  const revealables = $$('[data-reveal], [data-line]');
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.1 });
    revealables.forEach(el => io.observe(el));
  } else {
    revealables.forEach(el => el.classList.add('is-in'));
  }

  /* ------------------------------------------------- contadores -------- */
  const counters = $$('[data-count]');
  function runCounter(el) {
    const target = parseFloat(el.dataset.count);
    if (reduced) { el.textContent = target; return; }
    const dur = 1300;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window) {
    const ioC = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        runCounter(e.target);
        ioC.unobserve(e.target);
      }
    }, { threshold: 0.6 });
    counters.forEach(el => ioC.observe(el));
  } else {
    counters.forEach(runCounter);
  }

  /* ----------------------------------------------------- marquee ------- */
  // duplica os itens para o translateX(-50%) fechar o loop sem salto
  const track = $('#marqueeTrack');
  if (track) track.innerHTML += track.innerHTML;

  /* --------------------------------------- spotlight que segue o mouse -- */
  $$('[data-spotlight]').forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  /* --------------------------------------- método: trilho + etapas ----- */
  const rail = $('#methodRail');
  const steps = $$('[data-step]');
  if (rail && 'IntersectionObserver' in window) {
    const ioS = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-on');
        const done = steps.filter(s => s.classList.contains('is-on')).length;
        rail.style.setProperty('--p', (done / steps.length).toFixed(3));
        ioS.unobserve(e.target);
      }
    }, { threshold: 0.4 });
    steps.forEach(s => ioS.observe(s));
  } else {
    steps.forEach(s => s.classList.add('is-on'));
    if (rail) rail.style.setProperty('--p', '1');
  }

  /* ----------------------------------------------------- meters -------- */
  if ('IntersectionObserver' in window) {
    const ioM = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        $$('.meter', e.target).forEach((m, i) => setTimeout(() => m.classList.add('is-on'), i * 100));
        ioM.unobserve(e.target);
      }
    }, { threshold: 0.35 });
    $$('[data-meters]').forEach(w => ioM.observe(w));
  } else {
    $$('.meter').forEach(m => m.classList.add('is-on'));
  }

  /* -------------------------------------------- filtros dos cases ------ */
  const filters = $$('.filter');
  const cases = $$('.case');
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      filters.forEach(b => {
        const on = b === btn;
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-selected', String(on));
      });
      cases.forEach(c => {
        const show = f === 'all' || (c.dataset.cat || '').split(' ').includes(f);
        c.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* ----------------------------------------------------- FAQ ----------- */
  $$('.faq__item').forEach(item => {
    const q = $('.faq__q', item);
    const a = $('.faq__a', item);
    if (!q || !a) return;
    q.addEventListener('click', () => {
      const open = item.classList.contains('is-open');
      $$('.faq__item.is-open').forEach(other => {     // acordeão: fecha os outros
        if (other === item) return;
        other.classList.remove('is-open');
        $('.faq__q', other).setAttribute('aria-expanded', 'false');
        $('.faq__a', other).style.height = '0px';
      });
      item.classList.toggle('is-open', !open);
      q.setAttribute('aria-expanded', String(!open));
      a.style.height = open ? '0px' : `${a.firstElementChild.offsetHeight}px`;
    });
  });
  window.addEventListener('resize', () => {
    $$('.faq__item.is-open .faq__a').forEach(a => {
      a.style.height = `${a.firstElementChild.offsetHeight}px`;
    });
  }, { passive: true });

  /* --------------------------------------------------- modais ---------- */
  let lastFocus = null;
  function openModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    lastFocus = document.activeElement;
    m.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    const close = $('[data-close]', m);
    if (close) close.focus();
  }
  function closeModal(m) {
    m.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  $$('[data-modal]').forEach(btn => btn.addEventListener('click', () => openModal(btn.dataset.modal)));
  $$('.modal').forEach(m => {
    $$('[data-close]', m).forEach(b => b.addEventListener('click', () => closeModal(m)));
    m.addEventListener('click', (e) => { if (e.target === m) closeModal(m); });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = $('.modal.is-open');
    if (open) closeModal(open);
  });

  /* --------------------------------------- feedback de envio do form --- */
  const form = $('#contactForm');
  if (form) {
    form.addEventListener('submit', () => {
      if (!form.checkValidity()) return;              // o browser mostra o erro
      const btn = $('button[type="submit"]', form);
      if (btn) { btn.disabled = true; btn.style.opacity = '.7'; btn.textContent = 'Enviando…'; }
      // sem preventDefault: o POST para o formsubmit.co segue normalmente
    });
  }

  onScroll();
})();
