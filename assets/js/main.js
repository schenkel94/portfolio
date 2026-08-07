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

    if (nav) nav.classList.toggle('is-stuck', y > 24);

    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    }

    // link ativo — a seção que cruza a linha de 38% da viewport
    const line = y + window.innerHeight * 0.38;
    let current = '';
    for (const sec of sections) {
      if (sec.offsetTop <= line) current = sec.id;
    }
    for (const l of navLinks) {
      l.classList.toggle('is-active', l.getAttribute('href') === `#${current}`);
    }

    parallax(y);
    ticking = false;
  }
  function requestScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }
  window.addEventListener('scroll', requestScroll, { passive: true });
  window.addEventListener('resize', requestScroll, { passive: true });

  /* --------------------------------- parallax do retrato (sobe suave) ---- */
  const portraitImg = $('#portraitImg');
  const hero = $('.hero');
  let py = 0, pyTarget = 0, rafPortrait = null;

  function parallax(y) {
    if (!portraitImg || !hero || reduced) return;
    const h = hero.offsetHeight || 1;
    const t = Math.min(Math.max(y / h, 0), 1.2);
    // o deslocamento acompanha a altura do quadro para nunca descolar da base
    const frame = portraitImg.parentElement;
    const max = Math.min((frame ? frame.offsetHeight : 460) * 0.1, 62);
    pyTarget = -t * max;
    if (!rafPortrait) rafPortrait = requestAnimationFrame(easePortrait);
  }
  function easePortrait() {
    py += (pyTarget - py) * 0.085;   // lerp = movimento macio, sem travar no scroll
    portraitImg.style.setProperty('--py', `${py.toFixed(2)}px`);
    if (Math.abs(pyTarget - py) > 0.12) {
      rafPortrait = requestAnimationFrame(easePortrait);
    } else {
      rafPortrait = null;
    }
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
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revealables.forEach(el => io.observe(el));
  } else {
    revealables.forEach(el => el.classList.add('is-in'));
  }

  /* ------------------------------------------------- contadores -------- */
  const counters = $$('[data-count]');
  function runCounter(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    if (reduced) { el.textContent = target + suffix; return; }
    const dur = 1500;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
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
  if (track) {
    track.innerHTML += track.innerHTML;
  }

  /* --------------------------------------- spotlight que segue o mouse -- */
  $$('[data-spotlight]').forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  /* --------------------------------------- método: trilho + etapas ----- */
  const method = $('#method');
  const rail = $('#methodRail');
  const steps = $$('[data-step]');
  if (method && rail && 'IntersectionObserver' in window) {
    const ioS = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-on');
        const done = steps.filter(s => s.classList.contains('is-on')).length;
        rail.style.setProperty('--p', (done / steps.length).toFixed(3));
        ioS.unobserve(e.target);
      }
    }, { threshold: 0.45 });
    steps.forEach(s => ioS.observe(s));
  } else {
    steps.forEach(s => s.classList.add('is-on'));
    if (rail) rail.style.setProperty('--p', '1');
  }

  /* ----------------------------------------------------- meters -------- */
  const meterWraps = $$('[data-meters]');
  if ('IntersectionObserver' in window) {
    const ioM = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        $$('.meter', e.target).forEach((m, i) =>
          setTimeout(() => m.classList.add('is-on'), i * 110)
        );
        ioM.unobserve(e.target);
      }
    }, { threshold: 0.35 });
    meterWraps.forEach(w => ioM.observe(w));
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
      // acordeão: fecha os outros
      $$('.faq__item.is-open').forEach(other => {
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
  $$('[data-modal]').forEach(btn =>
    btn.addEventListener('click', () => openModal(btn.dataset.modal))
  );
  $$('.modal').forEach(m => {
    $$('[data-close]', m).forEach(b => b.addEventListener('click', () => closeModal(m)));
    m.addEventListener('click', (e) => { if (e.target === m) closeModal(m); });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = $('.modal.is-open');
    if (open) closeModal(open);
  });

  /* ------------------------------------------ canvas do hero ----------- */
  // rede de nós ligados por linhas — leitura de "grafo de dados", sutil
  const canvas = $('#hero-canvas');
  if (canvas && !reduced) {
    const ctx = canvas.getContext('2d', { alpha: true });
    let w = 0, h = 0, dpr = 1, nodes = [], raf = null, visible = true;

    const LINK = 148;   // distância máxima de ligação

    function resize() {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function seed() {
      const density = Math.round((w * h) / 26000);
      const count = Math.max(18, Math.min(density, 74));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.5 + 0.7
      }));
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      // ligações
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d > LINK) continue;
          const alpha = (1 - d / LINK) * 0.17;
          ctx.strokeStyle = `rgba(200, 243, 44, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // nós
      for (const n of nodes) {
        ctx.fillStyle = 'rgba(200, 243, 44, 0.42)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = visible ? requestAnimationFrame(frame) : null;
    }

    // só anima enquanto o hero está na tela
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(frame);
      }, { threshold: 0 }).observe(canvas);
    }

    let rt = null;
    window.addEventListener('resize', () => {
      clearTimeout(rt);
      rt = setTimeout(resize, 180);
    }, { passive: true });

    resize();
    raf = requestAnimationFrame(frame);
  }

  /* --------------------------------------- validação leve do form ------ */
  const form = $('#contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      const btn = $('button[type="submit"]', form);
      if (!form.checkValidity()) return;           // deixa o browser mostrar o erro
      if (btn) {
        btn.disabled = true;
        btn.style.opacity = '.72';
        btn.textContent = 'Enviando…';
      }
      // não faz preventDefault: o POST para o formsubmit.co segue normalmente
    });
  }

  /* ---------------------------------- primeira pintura do estado ------- */
  onScroll();
})();
