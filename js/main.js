/* ═══════════════════════════════════════════════════════════
   Sanjay Portfolio — Premium Animations & Interactions
   ═══════════════════════════════════════════════════════════ */

/* ── 0. WELCOME INTRO ─────────────────────────────────────── */
(function() {
  document.body.classList.add('intro-active');
  const overlay = document.getElementById('intro-overlay');
  if (!overlay) return;
  const lines = overlay.querySelectorAll('.intro-line');
  
  /* Stagger reveal lines */
  lines.forEach((line, i) => {
    setTimeout(() => line.classList.add('intro-vis'), 300 + i * 400);
  });
  
  /* Fade out after 3 seconds */
  setTimeout(() => {
    overlay.classList.add('intro-hidden');
    document.body.classList.remove('intro-active');
    document.documentElement.classList.remove('intro-active');
  }, 3000);
  
  /* Remove from DOM after transition */
  setTimeout(() => {
    overlay.remove();
  }, 3900);
})();

/* ── 1. SMOOTH CUSTOM CURSOR ──────────────────────────────── */
const cur = document.getElementById('cursor');
const dot = document.getElementById('cdot');
let mx = 0, my = 0, cx = 0, cy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top  = my + 'px';
});

(function animCursor() {
  cx += (mx - cx) * 0.08;
  cy += (my - cy) * 0.08;
  cur.style.left = cx + 'px';
  cur.style.top  = cy + 'px';
  requestAnimationFrame(animCursor);
})();

/* Cursor interactions */
document.querySelectorAll('a, button, .proj-card, .blog-card, .stat-card, .edu-card, .sk-panel, .sk-tool-tag').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cur.style.width = '56px';
    cur.style.height = '56px';
    cur.style.borderColor = 'rgba(91,143,217,0.6)';
    cur.style.background = 'rgba(91,143,217,0.04)';
  });
  el.addEventListener('mouseleave', () => {
    cur.style.width = '40px';
    cur.style.height = '40px';
    cur.style.borderColor = 'rgba(91,143,217,0.4)';
    cur.style.background = 'transparent';
  });
});

/* ── 2. MOBILE NAV ────────────────────────────────────────── */
function toggleNav() {
  document.getElementById('mobnav').classList.toggle('open');
}
function closeNav() {
  document.getElementById('mobnav').classList.remove('open');
}

/* ── 3. NAVBAR SCROLL EFFECT ──────────────────────────────── */
const navEl = document.querySelector('nav');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .mob-nav a');

let lastScroll = 0;
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  
  /* Navbar shrink on scroll */
  if (scrollY > 50) {
    navEl.classList.add('scrolled');
  } else {
    navEl.classList.remove('scrolled');
  }
  
  /* Active section tracking */
  let current = 'home';
  sections.forEach(s => {
    if (scrollY >= s.offsetTop - 140) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
  
  lastScroll = scrollY;
}, { passive: true });

/* ── 4. SCROLL REVEAL WITH STAGGER ───────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        /* Add stagger delay based on sibling position */
        const siblings = entry.target.parentElement.querySelectorAll('.fade-up');
        let siblingIndex = 0;
        siblings.forEach((sib, i) => { if (sib === entry.target) siblingIndex = i; });
        
        setTimeout(() => {
          entry.target.classList.add('vis');
        }, siblingIndex * 80);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.fade-up').forEach(el => revealObserver.observe(el));

/* ── 5. HERO TEXT STAGGER ANIMATION ──────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  /* Set up hero image */
  const heroImg = document.getElementById('hero-img');
  const aboutImg = document.getElementById('about-img');
  if (heroImg && typeof HERO_IMG !== 'undefined') heroImg.src = HERO_IMG;
  if (aboutImg && typeof ABOUT_IMG !== 'undefined') aboutImg.src = ABOUT_IMG;

  /* Hero text stagger */
  const heroLeft = document.querySelector('.hero-left');
  if (heroLeft) {
    const children = heroLeft.children;
    Array.from(children).forEach((child, i) => {
      child.style.opacity = '0';
      child.style.transform = 'translateY(24px)';
      child.style.transition = `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1 + 0.2}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1 + 0.2}s`;
      
      setTimeout(() => {
        child.style.opacity = '1';
        child.style.transform = 'translateY(0)';
      }, 100);
    });
  }

  /* Photo entrance */
  const photoWrap = document.querySelector('.photo-wrap');
  if (photoWrap) {
    photoWrap.style.opacity = '0';
    photoWrap.style.transform = 'translateY(30px) scale(0.97)';
    photoWrap.style.transition = 'opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s';
    setTimeout(() => {
      photoWrap.style.opacity = '1';
      photoWrap.style.transform = 'translateY(0) scale(1)';
    }, 100);
  }
});

/* ── 6. SUBTLE PARALLAX ON SCROLL ─────────────────────────── */
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      
      /* Hero background parallax */
      const home = document.getElementById('home');
      if (home && scrollY < window.innerHeight) {
        const beforeEl = home.style;
        beforeEl.setProperty('--parallax-y', `${scrollY * 0.15}px`);
      }
      
      /* Photo subtle float */
      const photo = document.querySelector('.photo-card');
      if (photo && scrollY < window.innerHeight) {
        photo.style.transform = `translateY(${scrollY * 0.03}px)`;
      }
      
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

/* ── 7. SKILL BAR ANIMATION ───────────────────────────────── */
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll('.sk-item-fill');
        bars.forEach((bar, i) => {
          const width = bar.style.width;
          bar.style.width = '0%';
          setTimeout(() => {
            bar.style.width = width;
          }, i * 80 + 200);
        });
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);
document.querySelectorAll('.sk-panel').forEach(el => barObserver.observe(el));

/* ── 8. TIMELINE REVEAL ───────────────────────────────────── */
const tlObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
);
document.querySelectorAll('.tl-item').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateX(-20px)';
  el.style.transition = `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`;
  tlObserver.observe(el);
});

/* ── 9. CONTACT FORM ──────────────────────────────────────── */
function sendForm() {
  const name  = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const msg   = document.getElementById('fmsg').value.trim();
  const btn   = document.getElementById('fsend');

  if (!name || !email || !msg) {
    alert('Please fill all fields.');
    return;
  }
  btn.textContent = 'Message Sent! ✓';
  btn.classList.add('sent');

  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.classList.remove('sent');
    document.getElementById('fname').value  = '';
    document.getElementById('femail').value = '';
    document.getElementById('fmsg').value   = '';
  }, 3000);
}

/* ── 10. SMOOTH SECTION TRANSITIONS ───────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── 11. SCROLL PROGRESS BAR ──────────────────────────────── */
const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress';
document.body.appendChild(progressBar);
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progressBar.style.width = pct + '%';
}, { passive: true });

/* ── 12. AMBIENT BACKGROUND ORBS ──────────────────────────── */
const orbWrap = document.createElement('div');
orbWrap.id = 'bg-orbs';
orbWrap.innerHTML = '<div class="orb orb-1"></div><div class="orb orb-2"></div><div class="orb orb-3"></div>';
document.body.appendChild(orbWrap);

/* ═══════════════════════════════════════════════════════════
   ULTRA PREMIUM EFFECTS
   ═══════════════════════════════════════════════════════════ */

/* ── 13. PARTICLE STARFIELD (canvas) ─────────────────────── */
(function() {
  const canvas = document.createElement('canvas');
  canvas.id = 'starfield';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let stars = [], w, h;
  const STAR_COUNT = Math.min(90, Math.floor(window.innerWidth / 14));

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.3 + 0.3,
      vy: -(Math.random() * 0.25 + 0.05),
      tw: Math.random() * Math.PI * 2,
      tws: Math.random() * 0.02 + 0.005
    });
  }

  (function draw() {
    ctx.clearRect(0, 0, w, h);
    stars.forEach(s => {
      s.y += s.vy;
      s.tw += s.tws;
      if (s.y < -4) { s.y = h + 4; s.x = Math.random() * w; }
      const alpha = 0.35 + Math.sin(s.tw) * 0.3;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(140,170,230,${Math.max(0, alpha)})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  })();
})();

/* ── 14. 3D TILT ON CARDS ────────────────────────────────── */
(function() {
  if (window.matchMedia('(hover:none)').matches) return;
  const cards = document.querySelectorAll('.proj-card, .blog-card, .stat-card, .edu-card');
  cards.forEach(card => {
    card.classList.add('tilt-card');
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${py * -6}deg) rotateY(${px * 6}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ── 15. STAT COUNT-UP ───────────────────────────────────── */
(function() {
  const nums = document.querySelectorAll('.stat-num');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const match = el.textContent.match(/^(\d+)\+?$/);
      if (!match) { obs.unobserve(el); return; }
      const target = parseInt(match[1], 10);
      const dur = 1400, t0 = performance.now();
      (function tick(t) {
        const p = Math.min((t - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + (match[2] ? '+' : '+');
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
      obs.unobserve(el);
    });
  }, { threshold: 0.4 });
  nums.forEach(n => obs.observe(n));
})();

/* ── 16. HERO ROLE TYPING EFFECT ─────────────────────────── */
(function() {
  const role = document.querySelector('.hero-role');
  if (!role) return;
  const phrases = [role.textContent.trim(),
    'DevOps & AI Engineer', 'Full Stack Developer', 'Cloud Enthusiast'];
  let pi = 0, ci = 0, deleting = false;
  const caret = document.createElement('span');
  caret.className = 'caret';
  caret.innerHTML = '&nbsp;';

  function type() {
    const phrase = phrases[pi];
    if (!deleting) {
      ci++;
      if (ci === phrase.length) { deleting = true; setTimeout(type, 1800); render(phrase); return; }
    } else {
      ci--;
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    render(phrase);
    setTimeout(type, deleting ? 38 : 75);
  }
  function render(phrase) {
    role.textContent = phrase.slice(0, ci);
    role.appendChild(caret);
  }
  setTimeout(type, 2500);
})();

/* ── 17. CURSOR TRAIL ────────────────────────────────────── */
(function() {
  if (window.matchMedia('(hover:none)').matches) return;
  const DOTS = 7;
  const dots = [];
  for (let i = 0; i < DOTS; i++) {
    const d = document.createElement('div');
    d.className = 'trail-dot';
    d.style.opacity = String(0.5 - i * 0.06);
    d.style.width = d.style.height = (6 - i * 0.6) + 'px';
    document.body.appendChild(d);
    dots.push({ el: d, x: 0, y: 0 });
  }
  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function trail() {
    let px = mx, py = my;
    dots.forEach(d => {
      d.x += (px - d.x) * 0.35;
      d.y += (py - d.y) * 0.35;
      d.el.style.left = d.x + 'px';
      d.el.style.top = d.y + 'px';
      px = d.x; py = d.y;
    });
    requestAnimationFrame(trail);
  })();
})();

/* ── 18. MAGNETIC BUTTONS ────────────────────────────────── */
(function() {
  if (window.matchMedia('(hover:none)').matches) return;
  document.querySelectorAll('.btn-primary, .btn-outline, .form-btn, .blog-cta a').forEach(btn => {
    btn.classList.add('magnetic');
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) * 0.18;
      const dy = (e.clientY - r.top - r.height / 2) * 0.28;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
})();

/* ═══════════════════════════════════════════════════════════
   PRO ULTRA — full-site scroll animations
   ═══════════════════════════════════════════════════════════ */

/* ── 19. SECTION HEADING LETTER SPLIT ────────────────────── */
document.querySelectorAll('.sec-head').forEach(head => {
  let i = 0;
  function splitNode(node) {
    if (node.nodeType === 3) {
      const frag = document.createDocumentFragment();
      node.textContent.split('').forEach(ch => {
        if (ch === ' ') { frag.appendChild(document.createTextNode(' ')); return; }
        const s = document.createElement('span');
        s.className = 'ltr';
        s.textContent = ch;
        s.style.transitionDelay = (0.15 + i * 0.03) + 's';
        i++;
        frag.appendChild(s);
      });
      node.replaceWith(frag);
    } else if (node.nodeType === 1) {
      Array.from(node.childNodes).forEach(splitNode);
    }
  }
  Array.from(head.childNodes).forEach(splitNode);
  head.classList.add('ltr-ready');
});

/* ── 20. SITE-WIDE SCROLL REVEAL ─────────────────────────── */
(function() {
  const targets = document.querySelectorAll(
    '.sec-badge, .sec-head, .sec-sub, .blog-sub-txt, ' +
    '.c-work, .c-link, .c-form .form-g, .c-form .form-btn, ' +
    '.blog-cta, .sk-tools-panel, .resp-list li, .tech-tags, footer'
  );
  targets.forEach(el => el.classList.add('sr'));

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('sr-vis');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
  targets.forEach(el => obs.observe(el));

  /* Stagger sibling form groups & contact links */
  document.querySelectorAll('.c-form').forEach(form => {
    form.querySelectorAll('.form-g, .form-btn').forEach((el, i) => {
      el.style.transitionDelay = (i * 0.1) + 's';
    });
  });
  const ccol = document.querySelector('.contact-grid > div:first-child');
  if (ccol) ccol.querySelectorAll('.c-work, .c-link').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.08) + 's';
  });
})();

/* ── 21. TIMELINE LINE DRAW ──────────────────────────────── */
(function() {
  const tl = document.querySelector('.timeline');
  if (!tl) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { tl.classList.add('tl-draw'); obs.disconnect(); }
    });
  }, { threshold: 0.1 });
  obs.observe(tl);
})();

/* ── 22. SKILL PERCENTAGE COUNT-UP ───────────────────────── */
(function() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const pct = entry.target;
      const target = parseInt(pct.textContent, 10);
      if (isNaN(target)) { obs.unobserve(pct); return; }
      pct.classList.add('counting');
      const dur = 1100, t0 = performance.now();
      (function tick(t) {
        const p = Math.min((t - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        pct.textContent = Math.round(target * eased) + '%';
        if (p < 1) requestAnimationFrame(tick);
        else pct.classList.remove('counting');
      })(t0);
      obs.unobserve(pct);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.sk-item-pct').forEach(p => obs.observe(p));
})();

/* ── 23. SCROLL TO TOP BUTTON ────────────────────────────── */
(function() {
  const btn = document.createElement('button');
  btn.id = 'to-top';
  btn.setAttribute('aria-label', 'Scroll to top');
  btn.innerHTML = '&#8593;';
  document.body.appendChild(btn);
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 600);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();
