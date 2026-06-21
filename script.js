/* ================================================================
   KEEN WEBSITE DESIGN — script.js
   ================================================================ */

function switchTab(tabName) {
  const current = document.querySelector('.page.active');
  if (current && current.id === tabName) return;

  if (current && current.id === 'blog') collapseAllArticles();

  if (current) {
    current.classList.remove('visible');
    setTimeout(() => {
      current.classList.remove('active');
      resetPageAnimations(current);
      activatePage(tabName);
    }, 350);
  } else {
    activatePage(tabName);
  }

  document.querySelectorAll('.nav-link[data-tab]').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tabName);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function activatePage(tabName) {
  const page = document.getElementById(tabName);
  if (!page) return;
  page.classList.add('active');

  requestAnimationFrame(() => requestAnimationFrame(() => {
    page.classList.add('visible');
    observeReveals();
    observeGrids();
  }));
}

// ── Blog expand/collapse ────────────────────────────────────────
function expandAllArticles() {
  const container = document.getElementById('blogArticlesExpanded');
  const btn = document.getElementById('blogExpandBtn');
  const isOpen = container && container.classList.contains('open');
  if (container) container.classList.toggle('open', !isOpen);
  if (btn) btn.textContent = isOpen ? 'Read All Articles →' : 'Show Less ↑';
  if (!isOpen && container) {
    setTimeout(() => container.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }
}

function collapseAllArticles() {
  const container = document.getElementById('blogArticlesExpanded');
  const btn = document.getElementById('blogExpandBtn');
  if (container) container.classList.remove('open');
  if (btn) btn.textContent = 'Read All Articles →';
}

// ── Scroll-reveal via IntersectionObserver ──────────────────────
const revealObserver = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  }),
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

function observeReveals() {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    revealObserver.observe(el);
  });
}

// ── Card grid stagger animation ─────────────────────────────────
const GRID_SELECTOR = '.templates-grid, .features-grid, .why-grid, .services-grid, .blog-card-grid, .demo-grid';

const gridObserver = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const grid = entry.target;
    grid.classList.add('in-view');

    // After all stagger animations finish, clear animation so hover transitions work.
    // Guard: if the page was switched away while we waited, the grid no longer has .in-view
    // and its items were already reset by resetPageAnimations — don't overwrite them.
    const items = grid.querySelectorAll(':scope > *');
    const longestDelay = (items.length - 1) * 60 + 600;
    setTimeout(() => {
      if (!grid.classList.contains('in-view')) return;
      items.forEach(item => {
        item.style.animation = 'none';
        item.style.opacity   = '1';
        item.style.transform = 'none';
      });
    }, longestDelay);

    gridObserver.unobserve(grid);
  }),
  { threshold: 0.08 }
);

function observeGrids() {
  document.querySelectorAll(`${GRID_SELECTOR}:not(.in-view)`).forEach(el => {
    gridObserver.observe(el);
  });
}

// ── Reset a page's animation state so re-entering replays everything ──
function resetPageAnimations(page) {
  // Remove .visible so reveal elements animate in again on return
  page.querySelectorAll('.reveal.visible').forEach(el => el.classList.remove('visible'));

  // Remove .in-view from grids, clear JS-set inline styles, re-queue for gridObserver
  page.querySelectorAll(GRID_SELECTOR).forEach(grid => {
    if (!grid.classList.contains('in-view')) return;
    grid.classList.remove('in-view');
    grid.querySelectorAll(':scope > *').forEach(item => {
      item.style.animation = '';
      item.style.opacity   = '';
      item.style.transform = '';
    });
    gridObserver.observe(grid);
  });
}

// ── Navbar shrink + parallax + scroll-to-top ───────────────────
const mbImg       = document.querySelector('.mb-img');
const scrollTopBtn = document.getElementById('scrollTop');
let rafPending = false;

window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 24);
  if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', window.scrollY > 320);

  if (!rafPending) {
    rafPending = true;
    requestAnimationFrame(() => {
      if (mbImg) {
        const maxShift = window.innerHeight * 0.07;
        mbImg.style.transform = `translateY(${Math.min(window.scrollY * 0.18, maxShift)}px)`;
      }
      rafPending = false;
    });
  }
}, { passive: true });

// ── Smooth-scroll anchor clicks ─────────────────────────────────
document.addEventListener('click', e => {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;
  const href = anchor.getAttribute('href');
  if (!href || href === '#') return;
  try {
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } catch (_) {}
});

// ── Mobile menu ─────────────────────────────────────────────────
function closeMobileMenu() {
  const drawer = document.getElementById('mobileDrawer');
  const toggle = document.getElementById('mobileToggle');
  if (drawer) drawer.classList.remove('open');
  if (toggle) toggle.classList.remove('active');
}

// ── Init ────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-link[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
      closeMobileMenu();
    });
  });

  const logo = document.querySelector('.nav-logo');
  if (logo) {
    logo.addEventListener('click', e => {
      e.preventDefault();
      switchTab('home');
    });
  }

  // Logo lightbox
  const logoImg = document.querySelector('.logo-img');
  const lightbox = document.getElementById('logoLightbox');
  const lightboxClose = document.getElementById('logoLightboxClose');
  if (logoImg && lightbox) {
    logoImg.addEventListener('click', e => {
      e.stopPropagation();
      logoImg.classList.remove('logo-pop');
      void logoImg.offsetWidth; // force reflow so animation restarts
      logoImg.classList.add('logo-pop');
      lightbox.classList.add('open');
    });
    lightboxClose.addEventListener('click', () => lightbox.classList.remove('open'));
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') lightbox.classList.remove('open');
    });
  }

  const toggle = document.getElementById('mobileToggle');
  const drawer = document.getElementById('mobileDrawer');
  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      drawer.classList.toggle('open');
      toggle.classList.toggle('active');
    });
  }

  activatePage('home');

  // Scroll-to-top
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) closeMobileMenu();
}, { passive: true });


/* ================================================================
   DEMO PROJECT PORTFOLIO
   ================================================================ */

/*
  Add new demo sites by appending an object to this array.
  Fields:
    name        – displayed site name
    fakeUrl     – text shown in the fake URL bar (use .demo TLD)
    screenshot  – path to a screenshot image (relative to index.html)
    description – one-line description shown on the card
    tags        – array of feature tag strings
    liveUrl     – URL to load in the modal iframe; null = show placeholder
*/
const DEMO_PROJECTS = [
  {
    name: 'Dale Mercer Contracting',
    fakeUrl: 'dale-mercer-contracting.demo',
    screenshot: 'screenshots/dale-mercer-hero.png',
    description: 'General contractor — services grid, project gallery, client testimonials, and quote request form',
    tags: ['Quote Form', 'Photo Gallery', 'Testimonials', 'Mobile Responsive'],
    liveUrl: 'https://dalemercerportfolio.vercel.app/'
  },
  {
    name: 'Crestline Mechanical Group',
    fakeUrl: 'crestline-mech.demo',
    screenshot: 'screenshots/crestline-mech-hero.png',
    description: 'HVAC & mechanical contractor — service areas, 24/7 emergency callout, and online booking form',
    tags: ['Booking Form', 'Service Areas', 'Emergency CTA', 'Mobile Responsive'],
    liveUrl: 'https://crestlinemechv1.vercel.app/',
    previewImg: 'screenshots/crestline-mech-hero.png'
  },
  {
    name: 'Magnolia Hearth Bakery & Café',
    fakeUrl: 'magnolia-hearth.demo',
    screenshot: 'screenshots/magnolia-hearth-hero.png',
    description: 'Small-batch bakery & coffee bar — auto-scrolling bake case gallery, catering inquiry form, and embedded location map',
    tags: ['Auto-scroll Gallery', 'Inquiry Form', 'Location Map', 'Mobile Responsive'],
    liveUrl: 'https://magnolia-hearth.vercel.app/'
  }
];

function renderDemoGrid() {
  const grid = document.getElementById('demoGrid');
  if (!grid || grid.dataset.rendered) return;
  grid.dataset.rendered = '1';

  grid.innerHTML = DEMO_PROJECTS.map((p, i) => `
    <div class="demo-card" tabindex="0" role="button"
         aria-label="Preview ${p.name} demo"
         data-index="${i}">
      <div class="demo-badge">Demo Project</div>
      <div class="browser-frame">
        <div class="browser-topbar">
          <div class="browser-dots">
            <div class="browser-dot dot-red"></div>
            <div class="browser-dot dot-yellow"></div>
            <div class="browser-dot dot-green"></div>
          </div>
          <div class="browser-url">${escHtml(p.fakeUrl)}</div>
        </div>
        <img
          class="browser-screenshot"
          src="${escHtml(p.screenshot)}"
          alt="${escHtml(p.name)} screenshot"
          loading="lazy"
          onerror="this.style.display='none'"
        >
        <div class="demo-hover-reveal" aria-hidden="true"><span>View Demo</span></div>
      </div>
      <div class="demo-card-meta">
        <div class="demo-card-name">${escHtml(p.name)}</div>
        <div class="demo-card-desc">${escHtml(p.description)}</div>
        <div class="demo-tag-list">
          ${p.tags.map(t => `<span class="demo-tag">${escHtml(t)}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.demo-card').forEach(card => {
    const i = Number(card.dataset.index);
    card.addEventListener('click', () => openDemoModal(i));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDemoModal(i); }
    });
  });
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function openDemoModal(index) {
  const p          = DEMO_PROJECTS[index];
  const overlay    = document.getElementById('demoModalOverlay');
  const titleEl    = document.getElementById('demoModalTitle');
  const linkEl     = document.getElementById('demoModalLink');
  const iframe     = document.getElementById('demoModalIframe');
  const holder     = document.getElementById('demoModalPlaceholder');
  const previewImg = document.getElementById('demoModalPreviewImg');
  if (!overlay) return;
  overlay.classList.remove('closing');

  titleEl.textContent = p.name;

  if (p.previewImg) {
    iframe.style.display      = 'none';
    holder.style.display      = 'none';
    previewImg.src            = p.previewImg;
    previewImg.alt            = p.name + ' preview';
    previewImg.style.display  = '';
    linkEl.style.display      = p.liveUrl ? '' : 'none';
    if (p.liveUrl) linkEl.href = p.liveUrl;
  } else if (p.liveUrl) {
    iframe.style.display      = '';
    holder.style.display      = 'none';
    previewImg.style.display  = 'none';
    linkEl.style.display      = '';
    linkEl.href               = p.liveUrl;
    iframe.src                = p.liveUrl;
    requestAnimationFrame(() => requestAnimationFrame(scaleModalIframe));
  } else {
    iframe.style.display      = 'none';
    previewImg.style.display  = 'none';
    holder.style.display      = 'flex';
    linkEl.style.display      = 'none';
  }

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDemoModal() {
  const overlay    = document.getElementById('demoModalOverlay');
  const iframe     = document.getElementById('demoModalIframe');
  const previewImg = document.getElementById('demoModalPreviewImg');
  if (!overlay || !overlay.classList.contains('open')) return;
  overlay.classList.add('closing');
  document.body.style.overflow = '';
  setTimeout(() => {
    overlay.classList.remove('open', 'closing');
    if (iframe) iframe.src = 'about:blank';
    if (previewImg) previewImg.src = '';
  }, 240);
}

function scaleModalIframe() {
  const wrap   = document.getElementById('demoModalIframeWrap');
  const iframe = document.getElementById('demoModalIframe');
  if (!wrap || !iframe || iframe.style.display === 'none') return;
  const scale = wrap.clientWidth / 1200;
  iframe.style.transform = `scale(${scale})`;
  iframe.style.height    = Math.ceil(wrap.clientHeight / scale) + 'px';
}

window.addEventListener('resize', () => {
  const overlay = document.getElementById('demoModalOverlay');
  if (overlay && overlay.classList.contains('open')) scaleModalIframe();
}, { passive: true });

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeDemoModal();
});

/* Wire up modal close button and overlay-click-to-close on DOMContentLoaded */
window.addEventListener('DOMContentLoaded', () => {
  renderDemoGrid();

  const overlay   = document.getElementById('demoModalOverlay');
  const closeBtn  = document.getElementById('demoModalClose');
  if (closeBtn) closeBtn.addEventListener('click', closeDemoModal);
  if (overlay)  overlay.addEventListener('click', e => { if (e.target === overlay) closeDemoModal(); });

  /* Footer nav tab links */
  document.querySelectorAll('.footer-nav button[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
});

