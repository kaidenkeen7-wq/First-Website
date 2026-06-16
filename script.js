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

// ── Template card stagger animation ────────────────────────────
const gridObserver = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      gridObserver.unobserve(entry.target);
    }
  }),
  { threshold: 0.1 }
);

function observeGrids() {
  document.querySelectorAll('.templates-grid:not(.in-view)').forEach(el => {
    gridObserver.observe(el);
  });
}

// ── Navbar shrink on scroll ─────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 24);
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
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) closeMobileMenu();
}, { passive: true });

