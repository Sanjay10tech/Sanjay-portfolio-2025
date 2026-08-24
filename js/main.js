/* ═══════════════════════════════════════════════════════════
   Sanjay Portfolio — Premium Animations & Interactions
   ═══════════════════════════════════════════════════════════ */

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
