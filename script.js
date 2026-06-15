/* ================================================================
   KEEN WEBSITE DESIGN — script.js
   ================================================================ */

// ── Tab switching ──────────────────────────────────────────────
function switchTab(tabName) {
  const current = document.querySelector('.page.active');
  if (current && current.id === tabName) return;

  if (current) {
    current.classList.remove('visible');
    setTimeout(() => {
      current.classList.remove('active');
      activatePage(tabName);
    }, 350);
  } else {
    activatePage(tabName);
  }

  document.querySelectorAll('.nav-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tabName);
  });
  updateIndicator();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function activatePage(tabName) {
  const page = document.getElementById(tabName);
  page.classList.add('active');

  // Two rAF passes let the browser register display:block before transitioning
  requestAnimationFrame(() => requestAnimationFrame(() => {
    page.classList.add('visible');
    observeReveals();
    if (tabName === 'portfolio') staggerCards();
  }));
}

// ── Sliding tab indicator ──────────────────────────────────────
function updateIndicator() {
  const active    = document.querySelector('.nav-tab.active');
  const indicator = document.querySelector('.tab-indicator');
  const container = document.querySelector('.nav-tabs');
  if (!active || !indicator || !container) return;

  const tabRect  = active.getBoundingClientRect();
  const contRect = container.getBoundingClientRect();
  indicator.style.width     = tabRect.width + 'px';
  indicator.style.transform = `translateX(${tabRect.left - contRect.left}px)`;
}

// ── Scroll-reveal via IntersectionObserver ─────────────────────
const revealObserver = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  }),
  { threshold: 0.14, rootMargin: '0px 0px -40px 0px' }
);

function observeReveals() {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    revealObserver.observe(el);
  });
}

// ── Portfolio card stagger entrance ───────────────────────────
function staggerCards() {
  document.querySelectorAll('.portfolio-card').forEach((card, i) => {
    card.classList.remove('show');
    card.style.animationDelay = `${i * 75}ms`;
    // Small delay so page fade-in finishes first
    setTimeout(() => card.classList.add('show'), 80);
  });
}

// ── Navbar shrink on scroll ────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

// ── Blog post expand/collapse ──────────────────────────────────
function toggleAllBlogPosts(btn) {
  const open = document.querySelector('.blog-full').style.display === 'block';
  document.querySelectorAll('.blog-full').forEach(el => {
    el.style.display = open ? 'none' : 'block';
  });
  btn.textContent = open ? 'Read More →' : 'Read Less ↑';
}

// ── Smooth-scroll anchor clicks ────────────────────────────────
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

const templateData = {
  template1: {
    title: 'Design Template 1 — Barbershop',
    badge: 'Barbershop',
    copy: 'A vintage dark-and-gold barbershop site. Full-bleed photo hero with centered badge, six service circles, pricing cards, an about section with photo grid, and animated CTA.',
    previewHtml: `
      <style>
        @keyframes bp-pulse { 0%,100%{box-shadow:0 0 0 0 rgba(200,151,42,0.4)} 50%{box-shadow:0 0 14px 4px rgba(200,151,42,0.25)} }
        .bp-gold { animation: bp-pulse 2.5s ease-in-out infinite; }
      </style>
      <div style="font-family:system-ui,-apple-system,sans-serif;background:#1c1008;">
        <!-- Nav -->
        <div style="background:#0e0804;padding:10px 20px;display:flex;align-items:center;justify-content:space-between;">
          <div style="color:#c8972a;font-size:13px;font-weight:800;letter-spacing:0.08em;">✂ THE SHARP CUT</div>
          <div style="display:flex;gap:18px;">
            <span style="color:rgba(255,255,255,0.6);font-size:9px;border-bottom:1px solid #c8972a;padding-bottom:2px;">HOME</span>
            <span style="color:rgba(255,255,255,0.45);font-size:9px;">ABOUT US</span>
            <span style="color:rgba(255,255,255,0.45);font-size:9px;">SERVICES</span>
            <span style="color:rgba(255,255,255,0.45);font-size:9px;">GALLERY</span>
            <span style="color:rgba(255,255,255,0.45);font-size:9px;">SHOP</span>
            <span style="color:rgba(255,255,255,0.45);font-size:9px;">CONTACTS</span>
          </div>
          <div style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);padding:3px 10px;border-radius:2px;">
            <span style="color:rgba(255,255,255,0.35);font-size:8px;">Search...</span>
          </div>
        </div>
        <!-- Hero -->
        <div style="background:linear-gradient(160deg,#3d2310,#5c3618 30%,#2c1a0e 70%,#1c1008);padding:52px 20px 40px;text-align:center;position:relative;">
          <div style="display:inline-flex;flex-direction:column;align-items:center;gap:5px;margin-bottom:16px;">
            <div style="color:#c8972a;font-size:8px;letter-spacing:0.2em;font-weight:600;">── HAIR SALON ──</div>
            <div style="border:1px solid rgba(200,151,42,0.55);border-radius:2px;padding:3px 14px;">
              <span style="color:#c8972a;font-size:7px;letter-spacing:0.15em;">EST. 2019</span>
            </div>
            <div style="color:#c8972a;font-size:16px;letter-spacing:0.3em;">✂ ✂</div>
          </div>
          <div style="color:#fff;font-size:23px;font-weight:900;letter-spacing:0.04em;margin-bottom:12px;text-shadow:0 2px 8px rgba(0,0,0,0.5);">THE SHARP CUT<br>HAIRCUT &amp; SHAVES</div>
          <div style="color:rgba(255,255,255,0.5);font-size:9px;max-width:340px;margin:0 auto 22px;line-height:1.7;">Craftsmanship is everything. It drives confidence and makes you walk out looking your best — always delivering your perfect look.</div>
          <div style="display:flex;gap:10px;justify-content:center;">
            <div class="bp-gold" style="background:#c8972a;color:#000;font-size:8px;font-weight:700;padding:8px 20px;border-radius:2px;letter-spacing:0.08em;cursor:pointer;">ABOUT US</div>
            <div style="border:1px solid rgba(255,255,255,0.45);color:rgba(255,255,255,0.8);font-size:8px;padding:8px 18px;border-radius:2px;letter-spacing:0.08em;cursor:pointer;">BOOK NOW</div>
          </div>
          <div style="display:flex;gap:6px;justify-content:center;margin-top:22px;">
            <div style="width:7px;height:7px;border-radius:50%;background:#c8972a;"></div>
            <div style="width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,0.2);"></div>
            <div style="width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,0.2);"></div>
          </div>
        </div>
        <!-- Services Row -->
        <div style="background:#0e0804;padding:22px 16px;">
          <div style="display:flex;justify-content:center;gap:18px;flex-wrap:wrap;">
            <div style="display:flex;flex-direction:column;align-items:center;gap:7px;">
              <div style="width:54px;height:54px;border-radius:50%;border:2px solid rgba(200,151,42,0.4);background:#1c1008;display:flex;align-items:center;justify-content:center;font-size:20px;">✂</div>
              <div style="color:rgba(255,255,255,0.65);font-size:7px;text-align:center;">Hair<br>Cutting</div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:7px;">
              <div style="width:54px;height:54px;border-radius:50%;background:#c8972a;display:flex;align-items:center;justify-content:center;font-size:20px;">🚿</div>
              <div style="color:#c8972a;font-size:7px;text-align:center;">Hair<br>Washing</div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:7px;">
              <div style="width:54px;height:54px;border-radius:50%;border:2px solid rgba(200,151,42,0.4);background:#1c1008;display:flex;align-items:center;justify-content:center;font-size:20px;">🪒</div>
              <div style="color:rgba(255,255,255,0.65);font-size:7px;text-align:center;">Shaving<br>Style</div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:7px;">
              <div style="width:54px;height:54px;border-radius:50%;border:2px solid rgba(200,151,42,0.4);background:#1c1008;display:flex;align-items:center;justify-content:center;font-size:20px;">💆</div>
              <div style="color:rgba(255,255,255,0.65);font-size:7px;text-align:center;">Head<br>Massage</div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:7px;">
              <div style="width:54px;height:54px;border-radius:50%;border:2px solid rgba(200,151,42,0.4);background:#1c1008;display:flex;align-items:center;justify-content:center;font-size:20px;">✨</div>
              <div style="color:rgba(255,255,255,0.65);font-size:7px;text-align:center;">Beauty<br>Spa</div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:7px;">
              <div style="width:54px;height:54px;border-radius:50%;border:2px solid rgba(200,151,42,0.4);background:#1c1008;display:flex;align-items:center;justify-content:center;font-size:20px;">🧔</div>
              <div style="color:rgba(255,255,255,0.65);font-size:7px;text-align:center;">Beard<br>Trim</div>
            </div>
          </div>
        </div>
        <!-- About section -->
        <div style="background:#1c1008;padding:22px 18px;display:flex;gap:18px;align-items:flex-start;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:7px;flex-shrink:0;width:190px;">
            <div style="background:linear-gradient(145deg,#4a2c10,#6b4012);border-radius:5px;height:90px;display:flex;align-items:center;justify-content:center;font-size:32px;">✂</div>
            <div style="background:linear-gradient(145deg,#3d2410,#5c3618);border-radius:5px;height:90px;display:flex;align-items:center;justify-content:center;font-size:32px;">🪒</div>
            <div style="background:linear-gradient(145deg,#2c1a0e,#4a2c10);border-radius:5px;height:55px;grid-column:span 2;display:flex;align-items:center;justify-content:center;font-size:24px;gap:14px;">💈 ✂ 🪒</div>
          </div>
          <div style="flex:1;">
            <div style="color:#c8972a;font-size:7px;letter-spacing:0.15em;font-weight:700;text-transform:uppercase;margin-bottom:8px;">SHARP CUT · BY THE BEST</div>
            <div style="color:#fff;font-size:15px;font-weight:800;line-height:1.3;margin-bottom:10px;">You'll be sure to<br>leave looking <span style="color:#c8972a;">sharp.</span></div>
            <div style="color:rgba(255,255,255,0.42);font-size:8px;line-height:1.8;margin-bottom:14px;">Every haircut is a craft. Our barbers bring years of experience and a passion for precision — from classic cuts to modern fades and everything in between.</div>
            <div style="background:#c8972a;color:#000;font-size:7px;font-weight:700;padding:7px 16px;border-radius:2px;display:inline-block;letter-spacing:0.08em;cursor:pointer;">BOOK APPOINTMENT →</div>
          </div>
        </div>
        <!-- Pricing -->
        <div style="background:#110a04;padding:18px 18px;">
          <div style="color:rgba(255,255,255,0.35);font-size:7px;text-transform:uppercase;letter-spacing:0.12em;text-align:center;margin-bottom:14px;">Our Pricing</div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
            <div style="background:#1c1008;border:1px solid rgba(200,151,42,0.22);border-radius:5px;padding:12px;text-align:center;">
              <div style="color:#c8972a;font-size:18px;font-weight:800;margin-bottom:3px;">$30</div>
              <div style="color:#fff;font-size:8px;font-weight:700;margin-bottom:3px;">Haircut</div>
              <div style="color:rgba(255,255,255,0.35);font-size:6.5px;">Fade · Taper · Scissor</div>
            </div>
            <div style="background:#1c1008;border:1px solid rgba(200,151,42,0.22);border-radius:5px;padding:12px;text-align:center;">
              <div style="color:#c8972a;font-size:18px;font-weight:800;margin-bottom:3px;">$25</div>
              <div style="color:#fff;font-size:8px;font-weight:700;margin-bottom:3px;">Hot Shave</div>
              <div style="color:rgba(255,255,255,0.35);font-size:6.5px;">Straight Razor</div>
            </div>
            <div style="background:#1c1008;border:1px solid rgba(200,151,42,0.22);border-radius:5px;padding:12px;text-align:center;">
              <div style="color:#c8972a;font-size:18px;font-weight:800;margin-bottom:3px;">$20</div>
              <div style="color:#fff;font-size:8px;font-weight:700;margin-bottom:3px;">Beard Trim</div>
              <div style="color:rgba(255,255,255,0.35);font-size:6.5px;">Shape · Line</div>
            </div>
          </div>
        </div>
        <!-- Footer -->
        <div style="background:#080402;padding:14px 18px;display:flex;justify-content:space-between;align-items:center;">
          <div style="color:#c8972a;font-size:10px;font-weight:800;">✂ THE SHARP CUT</div>
          <div style="display:flex;gap:14px;">
            <span style="color:rgba(255,255,255,0.3);font-size:7px;">Mon–Sat 9am–7pm</span>
            <span style="color:rgba(255,255,255,0.3);font-size:7px;">(832) 555-0110</span>
          </div>
        </div>
      </div>
    `
  },
  template2: {
    title: 'Design Template 2 — Contractor',
    badge: 'Contractor',
    copy: 'A professional white-and-red contractor site. Utility bar, nav, full-bleed stone hero with an inline quote form, trust/location bar, service cards, and a dark footer.',
    previewHtml: `
      <div style="font-family:system-ui,-apple-system,sans-serif;background:#fff;">
        <!-- Utility bar -->
        <div style="background:#f9fafb;border-bottom:1px solid #e5e7eb;padding:5px 20px;display:flex;justify-content:space-between;align-items:center;">
          <div style="display:flex;align-items:center;gap:6px;">
            <span style="font-size:9px;">📞</span>
            <span style="color:#dc2626;font-size:8px;font-weight:700;">CALL US ANYTIME: (832) 332-4803</span>
          </div>
          <div style="display:flex;gap:5px;">
            <div style="width:15px;height:15px;border-radius:50%;background:#1d4ed8;display:flex;align-items:center;justify-content:center;color:#fff;font-size:7px;font-weight:700;">f</div>
            <div style="width:15px;height:15px;border-radius:50%;background:#0284c7;display:flex;align-items:center;justify-content:center;color:#fff;font-size:7px;font-weight:700;">t</div>
            <div style="width:15px;height:15px;border-radius:50%;background:#dc2626;display:flex;align-items:center;justify-content:center;color:#fff;font-size:7px;font-weight:700;">▶</div>
            <div style="width:15px;height:15px;border-radius:50%;background:#0f172a;display:flex;align-items:center;justify-content:center;color:#fff;font-size:6px;font-weight:700;">in</div>
          </div>
        </div>
        <!-- Nav -->
        <div style="background:#fff;border-bottom:2px solid #e5e7eb;padding:10px 20px;display:flex;align-items:center;justify-content:space-between;">
          <div style="display:flex;align-items:center;gap:7px;">
            <div style="background:#dc2626;color:#fff;font-size:10px;font-weight:900;padding:4px 7px;border-radius:2px;">DCS</div>
            <div>
              <div style="color:#1e293b;font-size:9px;font-weight:800;line-height:1;">DECORATIVE</div>
              <div style="color:#64748b;font-size:6px;letter-spacing:0.06em;">CONCRETE SURFACES</div>
            </div>
          </div>
          <div style="display:flex;gap:16px;align-items:center;">
            <span style="color:#dc2626;font-size:8px;font-weight:600;border-bottom:2px solid #dc2626;padding-bottom:1px;">Home</span>
            <span style="color:#475569;font-size:8px;">Services ▾</span>
            <span style="color:#475569;font-size:8px;">Gallery ▾</span>
            <span style="color:#475569;font-size:8px;">Locations</span>
            <span style="color:#475569;font-size:8px;">Contact Us</span>
            <span style="color:#475569;font-size:8px;">Blog</span>
          </div>
        </div>
        <!-- Hero -->
        <div style="background:linear-gradient(135deg,#374151,#6b7280 40%,#475569);display:flex;min-height:190px;position:relative;">
          <div style="flex:1;background:linear-gradient(to right,rgba(0,0,0,0.75),rgba(0,0,0,0.38));padding:22px 18px;display:flex;flex-direction:column;justify-content:center;gap:9px;">
            <div style="color:#fff;font-size:21px;font-weight:900;line-height:1.1;text-shadow:0 2px 4px rgba(0,0,0,0.3);">CLASSIC DESIGN<br>TIMELESS APPEAL</div>
            <div style="color:#ef4444;font-size:8px;font-weight:700;letter-spacing:0.04em;">AWARD WINNING CONCRETE COATING INSTALLERS</div>
            <div style="color:rgba(255,255,255,0.65);font-size:8px;line-height:1.65;max-width:250px;">Looking to resurface, refinish or re-color your concrete pool deck, patio driveway, garage floor or commercial surface? We are here to help!</div>
            <div style="display:inline-flex;align-items:center;gap:5px;background:#dc2626;color:#fff;font-size:8px;font-weight:700;padding:8px 14px;border-radius:3px;width:fit-content;cursor:pointer;">📞 Call Us! (832) 332-4803</div>
          </div>
          <!-- Quote form -->
          <div style="width:210px;background:rgba(255,255,255,0.98);margin:12px 16px 12px 0;border-radius:4px;padding:13px 13px;flex-shrink:0;display:flex;flex-direction:column;gap:7px;">
            <div style="color:#1e293b;font-size:9px;font-weight:800;margin-bottom:2px;">Get a Fast FREE Quote</div>
            <div style="border:1px solid #d1d5db;border-radius:2px;padding:5px 8px;color:#9ca3af;font-size:7px;background:#fff;">Name</div>
            <div style="border:1px solid #d1d5db;border-radius:2px;padding:5px 8px;color:#9ca3af;font-size:7px;background:#fff;">Email</div>
            <div style="border:1px solid #d1d5db;border-radius:2px;padding:5px 8px;color:#9ca3af;font-size:7px;background:#fff;">Contact number</div>
            <div style="border:1px solid #d1d5db;border-radius:2px;padding:5px 8px;color:#9ca3af;font-size:7px;background:#fff;">Address</div>
            <div style="border:1px solid #d1d5db;border-radius:2px;padding:5px 8px;color:#9ca3af;font-size:7px;background:#fff;height:32px;display:flex;align-items:flex-start;">Message</div>
            <div style="background:#dc2626;color:#fff;font-size:8px;font-weight:700;padding:8px;border-radius:2px;text-align:center;letter-spacing:0.1em;cursor:pointer;">SEND</div>
          </div>
        </div>
        <!-- Trust bar -->
        <div style="background:#f9fafb;border-top:2px solid #e5e7eb;padding:10px 20px;display:flex;align-items:center;gap:18px;">
          <div>
            <div style="color:#dc2626;font-size:9px;font-weight:800;">FREE ESTIMATES</div>
            <div style="color:#94a3b8;font-size:7px;">WE ARE HERE TO HELP YOU!</div>
          </div>
          <div style="width:1px;height:28px;background:#e5e7eb;"></div>
          <div style="text-align:center;">
            <div style="color:#1e293b;font-size:7px;font-weight:700;">LOS ANGELES</div>
            <div style="color:#94a3b8;font-size:6px;">(323) 319-5230</div>
          </div>
          <div style="text-align:center;">
            <div style="color:#1e293b;font-size:7px;font-weight:700;">THE VALLEY</div>
            <div style="color:#94a3b8;font-size:6px;">(818) 332-4803</div>
          </div>
          <div style="text-align:center;">
            <div style="color:#1e293b;font-size:7px;font-weight:700;">ORANGE COUNTY</div>
            <div style="color:#94a3b8;font-size:6px;">(714) 563-4141</div>
          </div>
          <div style="margin-left:auto;display:flex;gap:6px;align-items:center;">
            <div style="border:1px solid #d1d5db;border-radius:3px;padding:3px 7px;font-size:7px;font-weight:700;color:#1e293b;">BBB</div>
            <div style="border:1px solid #d1d5db;border-radius:3px;padding:3px 7px;font-size:7px;color:#1e293b;">⭐ Google</div>
            <div style="border:1px solid #d1d5db;border-radius:3px;padding:3px 7px;font-size:7px;color:#16a34a;">✓ Certified</div>
          </div>
        </div>
        <!-- Services section -->
        <div style="background:#fff;padding:22px 20px;">
          <div style="text-align:center;margin-bottom:16px;">
            <div style="color:#1e293b;font-size:15px;font-weight:800;">Professional Concrete Resurfacing</div>
            <div style="color:#dc2626;font-size:8px;margin-top:3px;">Houston · Los Angeles · Orange County · Serving All of Texas &amp; California</div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:10px;">
            <div style="background:#fff;border:1px solid #e5e7eb;border-radius:5px;padding:13px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
              <div style="font-size:22px;margin-bottom:7px;">🚗</div>
              <div style="color:#1e293b;font-size:7px;font-weight:700;margin-bottom:3px;">Driveways</div>
              <div style="color:#94a3b8;font-size:6px;line-height:1.5;">Stamped, plain &amp; exposed aggregate</div>
            </div>
            <div style="background:#fff;border:1px solid #e5e7eb;border-radius:5px;padding:13px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
              <div style="font-size:22px;margin-bottom:7px;">🏊</div>
              <div style="color:#1e293b;font-size:7px;font-weight:700;margin-bottom:3px;">Pool Decks</div>
              <div style="color:#94a3b8;font-size:6px;line-height:1.5;">Resurface &amp; re-color decks</div>
            </div>
            <div style="background:#fff;border:1px solid #e5e7eb;border-radius:5px;padding:13px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
              <div style="font-size:22px;margin-bottom:7px;">🏠</div>
              <div style="color:#1e293b;font-size:7px;font-weight:700;margin-bottom:3px;">Patios</div>
              <div style="color:#94a3b8;font-size:6px;line-height:1.5;">Decorative pours &amp; overlays</div>
            </div>
            <div style="background:#fff;border:1px solid #e5e7eb;border-radius:5px;padding:13px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
              <div style="font-size:22px;margin-bottom:7px;">🏗️</div>
              <div style="color:#1e293b;font-size:7px;font-weight:700;margin-bottom:3px;">Garage Floors</div>
              <div style="color:#94a3b8;font-size:6px;line-height:1.5;">Epoxy &amp; polyaspartic coatings</div>
            </div>
          </div>
        </div>
        <!-- Footer -->
        <div style="background:#1e293b;padding:14px 20px;display:flex;justify-content:space-between;align-items:center;">
          <div style="display:flex;align-items:center;gap:7px;">
            <div style="background:#dc2626;color:#fff;font-size:8px;font-weight:900;padding:3px 6px;border-radius:2px;">DCS</div>
            <span style="color:rgba(255,255,255,0.5);font-size:7px;">© 2026 Decorative Concrete Surfaces</span>
          </div>
          <div style="display:flex;gap:14px;">
            <span style="color:rgba(255,255,255,0.35);font-size:7px;">Privacy Policy</span>
            <span style="color:rgba(255,255,255,0.35);font-size:7px;">Terms</span>
            <span style="color:rgba(255,255,255,0.35);font-size:7px;">Sitemap</span>
          </div>
        </div>
      </div>
    `
  },
  template3: {
    title: 'Design Template 3 — Restaurant',
    badge: 'Restaurant',
    copy: 'A bright green-and-white food ordering site. Clean nav, split hero with floating animated food circles, menu grid with buy buttons, a "Why Choose Us" section, and a green footer.',
    previewHtml: `
      <style>
        @keyframes ff-float  { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-9px)} }
        @keyframes ff-float2 { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-6px)} }
        .ff-img  { animation: ff-float  3s ease-in-out infinite; }
        .ff-img2 { animation: ff-float2 2.5s ease-in-out infinite 0.3s; }
        .ff-img3 { animation: ff-float2 2.8s ease-in-out infinite 0.6s; }
        .ff-img4 { animation: ff-float2 3.2s ease-in-out infinite 0.2s; }
      </style>
      <div style="font-family:system-ui,-apple-system,sans-serif;background:#fff;">
        <!-- Nav -->
        <div style="background:#fff;border-bottom:1px solid #e5e7eb;padding:10px 22px;display:flex;align-items:center;justify-content:space-between;">
          <div style="color:#16a34a;font-size:13px;font-weight:900;letter-spacing:0.02em;">QUICK BITE</div>
          <div style="display:flex;gap:18px;align-items:center;">
            <span style="color:#16a34a;font-size:9px;font-weight:600;border-bottom:2px solid #16a34a;padding-bottom:1px;">Home</span>
            <span style="color:#475569;font-size:9px;">Menu</span>
            <span style="color:#475569;font-size:9px;">About Us</span>
            <span style="color:#475569;font-size:9px;">Contact</span>
          </div>
          <div style="display:flex;gap:10px;align-items:center;">
            <span style="font-size:12px;color:#64748b;cursor:pointer;">🔍</span>
            <span style="font-size:12px;color:#64748b;cursor:pointer;">🛒</span>
            <div style="background:#16a34a;color:#fff;font-size:8px;font-weight:700;padding:5px 13px;border-radius:5px;cursor:pointer;">Sign Up</div>
          </div>
        </div>
        <!-- Hero -->
        <div style="background:#fff;padding:26px 24px;display:flex;align-items:center;gap:16px;min-height:168px;">
          <div style="flex:1;">
            <div style="display:inline-block;background:rgba(22,163,74,0.1);border:1px solid rgba(22,163,74,0.3);color:#16a34a;font-size:8px;padding:4px 13px;border-radius:100px;margin-bottom:13px;">Hungry?</div>
            <div style="color:#0f172a;font-size:23px;font-weight:900;line-height:1.1;margin-bottom:10px;">JUST COME TO<br>QUICK BITE &amp; ORDER</div>
            <div style="color:#64748b;font-size:9px;line-height:1.7;margin-bottom:16px;">Here you will find the best quality and pure food. Order now to satisfy your hunger pangs and taste the real difference.</div>
            <div style="display:flex;gap:10px;">
              <div style="background:#16a34a;color:#fff;font-size:9px;font-weight:700;padding:8px 18px;border-radius:6px;cursor:pointer;">Order Now</div>
              <div style="border:1px solid #d1d5db;color:#475569;font-size:9px;padding:8px 16px;border-radius:6px;cursor:pointer;">Explore More →</div>
            </div>
          </div>
          <div style="position:relative;width:168px;height:168px;flex-shrink:0;">
            <div class="ff-img" style="width:135px;height:135px;border-radius:50%;background:radial-gradient(circle,#22c55e,#15803d);display:flex;align-items:center;justify-content:center;font-size:62px;position:absolute;top:16px;left:16px;box-shadow:0 8px 32px rgba(22,163,74,0.28);">🍔</div>
            <div class="ff-img2" style="width:36px;height:36px;border-radius:50%;background:radial-gradient(circle,#86efac,#22c55e);display:flex;align-items:center;justify-content:center;font-size:15px;position:absolute;top:0;right:0;box-shadow:0 4px 12px rgba(0,0,0,0.12);">🍟</div>
            <div class="ff-img3" style="width:30px;height:30px;border-radius:50%;background:radial-gradient(circle,#fde68a,#f59e0b);display:flex;align-items:center;justify-content:center;font-size:13px;position:absolute;bottom:12px;right:4px;box-shadow:0 4px 12px rgba(0,0,0,0.12);">🌶️</div>
            <div class="ff-img4" style="width:26px;height:26px;border-radius:50%;background:radial-gradient(circle,#bfdbfe,#3b82f6);display:flex;align-items:center;justify-content:center;font-size:11px;position:absolute;bottom:22px;left:0;box-shadow:0 4px 12px rgba(0,0,0,0.12);">🥤</div>
          </div>
        </div>
        <!-- Menu grid -->
        <div style="background:#f0fdf4;padding:18px 24px;">
          <div style="color:#0f172a;font-size:12px;font-weight:800;text-align:center;margin-bottom:5px;">OUR REGULAR FOOD</div>
          <div style="color:#64748b;font-size:7.5px;text-align:center;margin-bottom:14px;">This is our daily food menu. Here you will find all kinds of food — choose your favorite and order now.</div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:10px;">
            <div style="background:#fff;border-radius:9px;padding:11px;text-align:center;box-shadow:0 1px 4px rgba(0,0,0,0.06);">
              <div style="width:50px;height:50px;border-radius:50%;background:radial-gradient(circle,#4ade80,#15803d);display:flex;align-items:center;justify-content:center;font-size:24px;margin:0 auto 7px;">🍔</div>
              <div style="color:#1e293b;font-size:8px;font-weight:700;margin-bottom:2px;">Chicken Burger</div>
              <div style="color:#94a3b8;font-size:6.5px;margin-bottom:7px;line-height:1.4;">Fresh, juicy &amp; grilled</div>
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="color:#16a34a;font-size:8px;font-weight:700;">$7.99</span>
                <div style="background:#16a34a;color:#fff;font-size:6px;font-weight:700;padding:3px 7px;border-radius:3px;cursor:pointer;">Buy Now</div>
              </div>
            </div>
            <div style="background:#fff;border-radius:9px;padding:11px;text-align:center;box-shadow:0 1px 4px rgba(0,0,0,0.06);">
              <div style="width:50px;height:50px;border-radius:50%;background:radial-gradient(circle,#86efac,#16a34a);display:flex;align-items:center;justify-content:center;font-size:24px;margin:0 auto 7px;">🍕</div>
              <div style="color:#1e293b;font-size:8px;font-weight:700;margin-bottom:2px;">Chicken Pizza</div>
              <div style="color:#94a3b8;font-size:6.5px;margin-bottom:7px;line-height:1.4;">Loaded with toppings</div>
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="color:#16a34a;font-size:8px;font-weight:700;">$9.99</span>
                <div style="background:#16a34a;color:#fff;font-size:6px;font-weight:700;padding:3px 7px;border-radius:3px;cursor:pointer;">Buy Now</div>
              </div>
            </div>
            <div style="background:#fff;border-radius:9px;padding:11px;text-align:center;box-shadow:0 1px 4px rgba(0,0,0,0.06);">
              <div style="width:50px;height:50px;border-radius:50%;background:radial-gradient(circle,#fde68a,#d97706);display:flex;align-items:center;justify-content:center;font-size:24px;margin:0 auto 7px;">🍟</div>
              <div style="color:#1e293b;font-size:8px;font-weight:700;margin-bottom:2px;">Loaded Fries</div>
              <div style="color:#94a3b8;font-size:6.5px;margin-bottom:7px;line-height:1.4;">Crispy &amp; seasoned</div>
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="color:#16a34a;font-size:8px;font-weight:700;">$4.99</span>
                <div style="background:#16a34a;color:#fff;font-size:6px;font-weight:700;padding:3px 7px;border-radius:3px;cursor:pointer;">Buy Now</div>
              </div>
            </div>
            <div style="background:#fff;border-radius:9px;padding:11px;text-align:center;box-shadow:0 1px 4px rgba(0,0,0,0.06);">
              <div style="width:50px;height:50px;border-radius:50%;background:radial-gradient(circle,#f9a8d4,#ec4899);display:flex;align-items:center;justify-content:center;font-size:24px;margin:0 auto 7px;">🍰</div>
              <div style="color:#1e293b;font-size:8px;font-weight:700;margin-bottom:2px;">Special Dessert</div>
              <div style="color:#94a3b8;font-size:6.5px;margin-bottom:7px;line-height:1.4;">Sweet &amp; satisfying</div>
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="color:#16a34a;font-size:8px;font-weight:700;">$3.50</span>
                <div style="background:#16a34a;color:#fff;font-size:6px;font-weight:700;padding:3px 7px;border-radius:3px;cursor:pointer;">Buy Now</div>
              </div>
            </div>
          </div>
        </div>
        <!-- Why Choose Us -->
        <div style="background:#fff;padding:22px 24px;text-align:center;">
          <div style="color:#0f172a;font-size:14px;font-weight:800;margin-bottom:5px;">WHY CHOOSE US?</div>
          <div style="color:#64748b;font-size:8px;margin-bottom:18px;line-height:1.6;">You will choose us because we have the best quality food<br>and we deliver fast — right to your door.</div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px;">
            <div style="display:flex;flex-direction:column;align-items:center;gap:9px;">
              <div style="width:46px;height:46px;border-radius:50%;background:#f0fdf4;border:2px solid #dcfce7;display:flex;align-items:center;justify-content:center;font-size:20px;">🥗</div>
              <div style="color:#1e293b;font-size:8px;font-weight:700;">Serve Healthy Food</div>
              <div style="color:#94a3b8;font-size:7px;line-height:1.5;text-align:center;">We serve all healthy food here. You can choose any food you like.</div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:9px;">
              <div style="width:46px;height:46px;border-radius:50%;background:#f0fdf4;border:2px solid #dcfce7;display:flex;align-items:center;justify-content:center;font-size:20px;">⭐</div>
              <div style="color:#1e293b;font-size:8px;font-weight:700;">Best Quality</div>
              <div style="color:#94a3b8;font-size:7px;line-height:1.5;text-align:center;">Our food quality is excellent. You will get exactly what you taste.</div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:9px;">
              <div style="width:46px;height:46px;border-radius:50%;background:#f0fdf4;border:2px solid #dcfce7;display:flex;align-items:center;justify-content:center;font-size:20px;">🚀</div>
              <div style="color:#1e293b;font-size:8px;font-weight:700;">Fast Delivery</div>
              <div style="color:#94a3b8;font-size:7px;line-height:1.5;text-align:center;">You will receive it shortly after ordering — we are that fast.</div>
            </div>
          </div>
        </div>
        <!-- Footer -->
        <div style="background:#15803d;padding:15px 24px;display:flex;justify-content:space-between;align-items:center;">
          <div style="color:#fff;font-size:11px;font-weight:900;">QUICK BITE</div>
          <div style="display:flex;gap:16px;">
            <span style="color:rgba(255,255,255,0.6);font-size:7.5px;">Home</span>
            <span style="color:rgba(255,255,255,0.6);font-size:7.5px;">Menu</span>
            <span style="color:rgba(255,255,255,0.6);font-size:7.5px;">About Us</span>
            <span style="color:rgba(255,255,255,0.6);font-size:7.5px;">Contact</span>
          </div>
          <div style="color:rgba(255,255,255,0.45);font-size:7px;">© 2026 Quick Bite Burgers · All Rights Reserved</div>
        </div>
      </div>
    `
  },
  template4: {
    title: 'Design Template 4 — Photography',
    badge: 'Photography',
    copy: 'A minimal deep-blue portfolio for photographers and creative studios. Full-screen gallery grid, services section, and clean dark aesthetic.',
    previewHtml: `
      <div style="font-family:system-ui,-apple-system,sans-serif;background:#0a0e1c;">
        <div style="background:#070b14;border-bottom:1px solid rgba(255,255,255,0.06);padding:11px 22px;display:flex;align-items:center;justify-content:space-between;">
          <div style="color:#fff;font-size:12px;font-weight:800;letter-spacing:0.08em;">LENS&amp;CO.</div>
          <div style="display:flex;gap:20px;align-items:center;">
            <span style="color:rgba(255,255,255,0.45);font-size:8px;">Work</span>
            <span style="color:rgba(255,255,255,0.45);font-size:8px;">About</span>
            <span style="color:rgba(255,255,255,0.45);font-size:8px;">Services</span>
            <span style="color:rgba(255,255,255,0.45);font-size:8px;">Contact</span>
          </div>
          <div style="border:1px solid rgba(59,130,246,0.5);color:#3b82f6;font-size:7px;font-weight:700;padding:5px 14px;border-radius:3px;letter-spacing:0.08em;">BOOK NOW</div>
        </div>
        <div style="background:linear-gradient(160deg,#0a0e1c,#0d1530 60%,#091020);padding:40px 22px 32px;text-align:center;position:relative;overflow:hidden;">
          <div style="position:absolute;width:200px;height:200px;border-radius:50%;background:rgba(59,130,246,0.07);top:-60px;right:-40px;filter:blur(40px);"></div>
          <div style="color:rgba(59,130,246,0.8);font-size:7px;letter-spacing:0.2em;font-weight:700;text-transform:uppercase;margin-bottom:10px;">Portfolio · 2026</div>
          <div style="color:#fff;font-size:26px;font-weight:900;line-height:1.1;margin-bottom:12px;letter-spacing:-0.02em;">Capturing moments<br><span style="color:#3b82f6;">that last forever.</span></div>
          <div style="color:rgba(255,255,255,0.45);font-size:8.5px;max-width:280px;margin:0 auto 22px;line-height:1.7;">Professional photography for weddings, portraits, brands, and everything in between.</div>
          <div style="display:flex;gap:10px;justify-content:center;margin-bottom:24px;">
            <div style="background:#3b82f6;color:#fff;font-size:8px;font-weight:700;padding:8px 20px;border-radius:4px;letter-spacing:0.06em;">View Portfolio</div>
            <div style="border:1px solid rgba(255,255,255,0.18);color:rgba(255,255,255,0.65);font-size:8px;padding:8px 18px;border-radius:4px;">Contact Me</div>
          </div>
        </div>
        <div style="padding:16px 22px 8px;">
          <div style="color:rgba(255,255,255,0.25);font-size:7px;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:12px;text-align:center;">Selected Work</div>
          <div style="display:grid;grid-template-columns:2fr 1fr 1fr;grid-template-rows:80px 60px;gap:5px;">
            <div style="background:linear-gradient(135deg,#1a2240,#0d1530);border-radius:4px;grid-row:span 2;display:flex;align-items:center;justify-content:center;font-size:28px;color:rgba(255,255,255,0.15);">📷</div>
            <div style="background:linear-gradient(135deg,#101c30,#0a1525);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:14px;color:rgba(255,255,255,0.12);">🌅</div>
            <div style="background:linear-gradient(135deg,#0d1a28,#091520);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:14px;color:rgba(255,255,255,0.12);">🖼️</div>
            <div style="background:linear-gradient(135deg,#14203c,#0e1830);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:14px;color:rgba(255,255,255,0.12);">🌃</div>
            <div style="background:linear-gradient(135deg,#0f1e35,#091828);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:14px;color:rgba(255,255,255,0.12);">💍</div>
          </div>
        </div>
        <div style="padding:14px 22px 10px;">
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;">
            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:10px;text-align:center;">
              <div style="font-size:14px;margin-bottom:5px;">💒</div>
              <div style="color:#fff;font-size:7px;font-weight:700;margin-bottom:2px;">Weddings</div>
              <div style="color:rgba(255,255,255,0.3);font-size:6px;">Full-day coverage</div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:10px;text-align:center;">
              <div style="font-size:14px;margin-bottom:5px;">👤</div>
              <div style="color:#fff;font-size:7px;font-weight:700;margin-bottom:2px;">Portraits</div>
              <div style="color:rgba(255,255,255,0.3);font-size:6px;">Studio &amp; outdoor</div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:10px;text-align:center;">
              <div style="font-size:14px;margin-bottom:5px;">🏢</div>
              <div style="color:#fff;font-size:7px;font-weight:700;margin-bottom:2px;">Commercial</div>
              <div style="color:rgba(255,255,255,0.3);font-size:6px;">Brand &amp; product</div>
            </div>
          </div>
        </div>
        <div style="background:#070b14;border-top:1px solid rgba(255,255,255,0.05);padding:12px 22px;display:flex;justify-content:space-between;align-items:center;">
          <div style="color:rgba(255,255,255,0.4);font-size:7px;font-weight:800;letter-spacing:0.08em;">LENS&amp;CO. © 2026</div>
          <div style="display:flex;gap:6px;">
            <div style="width:22px;height:22px;border-radius:4px;background:rgba(255,255,255,0.05);display:flex;align-items:center;justify-content:center;font-size:9px;">📸</div>
            <div style="width:22px;height:22px;border-radius:4px;background:rgba(255,255,255,0.05);display:flex;align-items:center;justify-content:center;font-size:9px;">🎨</div>
          </div>
        </div>
      </div>
    `
  },
  template5: {
    title: 'Design Template 5 — Fitness',
    badge: 'Fitness',
    copy: 'High-energy dark red fitness studio site with class schedule, membership tiers, stats, and bold typography built to convert.',
    previewHtml: `
      <div style="font-family:system-ui,-apple-system,sans-serif;background:#0f0507;">
        <div style="background:#0a0305;border-bottom:1px solid rgba(239,68,68,0.15);padding:10px 22px;display:flex;align-items:center;justify-content:space-between;">
          <div style="display:flex;align-items:center;gap:7px;">
            <div style="background:#ef4444;width:6px;height:22px;border-radius:1px;"></div>
            <div style="color:#fff;font-size:11px;font-weight:900;letter-spacing:0.04em;">APEX FITNESS</div>
          </div>
          <div style="display:flex;gap:18px;align-items:center;">
            <span style="color:rgba(255,255,255,0.4);font-size:8px;">Classes</span>
            <span style="color:rgba(255,255,255,0.4);font-size:8px;">Trainers</span>
            <span style="color:rgba(255,255,255,0.4);font-size:8px;">Pricing</span>
            <span style="color:rgba(255,255,255,0.4);font-size:8px;">About</span>
          </div>
          <div style="background:#ef4444;color:#fff;font-size:7px;font-weight:800;padding:6px 14px;border-radius:3px;letter-spacing:0.06em;">JOIN NOW</div>
        </div>
        <div style="background:linear-gradient(160deg,#1a0406,#2a0810,#140305);padding:38px 22px 28px;position:relative;overflow:hidden;">
          <div style="position:absolute;width:250px;height:250px;border-radius:50%;background:rgba(239,68,68,0.08);top:-80px;right:-60px;filter:blur(50px);"></div>
          <div style="color:#ef4444;font-size:7px;letter-spacing:0.2em;font-weight:700;text-transform:uppercase;margin-bottom:12px;">Achieve Your Best</div>
          <div style="color:#fff;font-size:28px;font-weight:900;line-height:1.05;margin-bottom:12px;letter-spacing:-0.02em;">PUSH YOUR<br>LIMITS TODAY.</div>
          <div style="color:rgba(255,255,255,0.4);font-size:8.5px;max-width:260px;line-height:1.7;margin-bottom:20px;">State-of-the-art gym with expert trainers, group classes, and a community that keeps you going.</div>
          <div style="display:flex;gap:10px;margin-bottom:20px;">
            <div style="background:#ef4444;color:#fff;font-size:8px;font-weight:800;padding:9px 22px;border-radius:3px;letter-spacing:0.08em;">GET STARTED</div>
            <div style="border:1px solid rgba(255,255,255,0.2);color:rgba(255,255,255,0.55);font-size:8px;padding:9px 18px;border-radius:3px;">View Classes</div>
          </div>
          <div style="display:flex;gap:18px;">
            <div style="text-align:center;">
              <div style="color:#ef4444;font-size:16px;font-weight:900;line-height:1;">500+</div>
              <div style="color:rgba(255,255,255,0.3);font-size:6px;text-transform:uppercase;letter-spacing:0.1em;">Members</div>
            </div>
            <div style="width:1px;background:rgba(255,255,255,0.08);"></div>
            <div style="text-align:center;">
              <div style="color:#ef4444;font-size:16px;font-weight:900;line-height:1;">20+</div>
              <div style="color:rgba(255,255,255,0.3);font-size:6px;text-transform:uppercase;letter-spacing:0.1em;">Classes</div>
            </div>
            <div style="width:1px;background:rgba(255,255,255,0.08);"></div>
            <div style="text-align:center;">
              <div style="color:#ef4444;font-size:16px;font-weight:900;line-height:1;">8</div>
              <div style="color:rgba(255,255,255,0.3);font-size:6px;text-transform:uppercase;letter-spacing:0.1em;">Trainers</div>
            </div>
          </div>
        </div>
        <div style="padding:14px 22px;background:#0a0305;">
          <div style="color:rgba(255,255,255,0.25);font-size:7px;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:10px;">Today's Classes</div>
          <div style="display:flex;flex-direction:column;gap:6px;">
            <div style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.2);border-radius:5px;padding:8px 12px;display:flex;align-items:center;justify-content:space-between;">
              <div>
                <div style="color:#fff;font-size:8px;font-weight:700;">CrossFit WOD</div>
                <div style="color:rgba(255,255,255,0.35);font-size:6.5px;">7:00 AM · Coach Marcus</div>
              </div>
              <div style="background:#ef4444;color:#fff;font-size:6px;font-weight:700;padding:3px 9px;border-radius:2px;">Book</div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:5px;padding:8px 12px;display:flex;align-items:center;justify-content:space-between;">
              <div>
                <div style="color:#fff;font-size:8px;font-weight:700;">Yoga Flow</div>
                <div style="color:rgba(255,255,255,0.35);font-size:6.5px;">9:00 AM · Coach Sarah</div>
              </div>
              <div style="border:1px solid rgba(255,255,255,0.18);color:rgba(255,255,255,0.5);font-size:6px;font-weight:700;padding:3px 9px;border-radius:2px;">Book</div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:5px;padding:8px 12px;display:flex;align-items:center;justify-content:space-between;">
              <div>
                <div style="color:#fff;font-size:8px;font-weight:700;">HIIT Burn</div>
                <div style="color:rgba(255,255,255,0.35);font-size:6.5px;">6:00 PM · Coach Jake</div>
              </div>
              <div style="border:1px solid rgba(255,255,255,0.18);color:rgba(255,255,255,0.5);font-size:6px;font-weight:700;padding:3px 9px;border-radius:2px;">Book</div>
            </div>
          </div>
        </div>
        <div style="padding:10px 22px 14px;">
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:7px;">
            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:5px;padding:10px;text-align:center;">
              <div style="color:rgba(255,255,255,0.35);font-size:6px;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px;">Basic</div>
              <div style="color:#fff;font-size:14px;font-weight:900;line-height:1;margin-bottom:2px;">$29</div>
              <div style="color:rgba(255,255,255,0.25);font-size:6px;">/month</div>
            </div>
            <div style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);border-radius:5px;padding:10px;text-align:center;">
              <div style="color:#ef4444;font-size:6px;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px;">Pro</div>
              <div style="color:#fff;font-size:14px;font-weight:900;line-height:1;margin-bottom:2px;">$59</div>
              <div style="color:rgba(255,255,255,0.25);font-size:6px;">/month</div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:5px;padding:10px;text-align:center;">
              <div style="color:rgba(255,255,255,0.35);font-size:6px;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px;">Elite</div>
              <div style="color:#fff;font-size:14px;font-weight:900;line-height:1;margin-bottom:2px;">$99</div>
              <div style="color:rgba(255,255,255,0.25);font-size:6px;">/month</div>
            </div>
          </div>
        </div>
        <div style="background:#070305;border-top:1px solid rgba(239,68,68,0.12);padding:11px 22px;display:flex;justify-content:space-between;align-items:center;">
          <div style="color:rgba(255,255,255,0.35);font-size:7px;font-weight:800;letter-spacing:0.08em;">APEX FITNESS © 2026</div>
          <div style="color:rgba(255,255,255,0.2);font-size:7px;">Houston, TX · Open 5AM–11PM</div>
        </div>
      </div>
    `
  },
  template6: {
    title: 'Design Template 6 — Real Estate',
    badge: 'Real Estate',
    copy: 'Sleek teal and dark real estate site with property listings, smart search, agent CTA, and a professional modern layout.',
    previewHtml: `
      <div style="font-family:system-ui,-apple-system,sans-serif;background:#07100f;">
        <div style="background:#050d0c;border-bottom:1px solid rgba(20,184,166,0.12);padding:10px 22px;display:flex;align-items:center;justify-content:space-between;">
          <div style="display:flex;align-items:center;gap:8px;">
            <div style="background:#14b8a6;width:22px;height:22px;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:11px;">🏠</div>
            <div>
              <div style="color:#fff;font-size:9px;font-weight:800;letter-spacing:0.02em;">Summit Realty</div>
              <div style="color:rgba(255,255,255,0.3);font-size:6px;">Homes · Land · Commercial</div>
            </div>
          </div>
          <div style="display:flex;gap:18px;align-items:center;">
            <span style="color:rgba(255,255,255,0.4);font-size:8px;">Buy</span>
            <span style="color:rgba(255,255,255,0.4);font-size:8px;">Sell</span>
            <span style="color:rgba(255,255,255,0.4);font-size:8px;">Rent</span>
            <span style="color:rgba(255,255,255,0.4);font-size:8px;">Agents</span>
          </div>
          <div style="border:1px solid rgba(20,184,166,0.4);color:#14b8a6;font-size:7px;font-weight:700;padding:5px 14px;border-radius:4px;">Contact</div>
        </div>
        <div style="background:linear-gradient(160deg,#07100f,#0c1c1a 60%,#091814);padding:36px 22px 22px;position:relative;overflow:hidden;text-align:center;">
          <div style="position:absolute;width:200px;height:200px;border-radius:50%;background:rgba(20,184,166,0.07);top:-60px;right:-40px;filter:blur(40px);"></div>
          <div style="color:#14b8a6;font-size:7px;letter-spacing:0.2em;font-weight:700;text-transform:uppercase;margin-bottom:10px;">Find Your Perfect Home</div>
          <div style="color:#fff;font-size:24px;font-weight:900;line-height:1.1;margin-bottom:14px;letter-spacing:-0.02em;">Your dream home<br><span style="color:#14b8a6;">starts here.</span></div>
          <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(20,184,166,0.25);border-radius:8px;padding:10px 14px;display:flex;align-items:center;gap:8px;max-width:380px;margin:0 auto 18px;">
            <span style="font-size:10px;">🔍</span>
            <div style="color:rgba(255,255,255,0.3);font-size:8px;flex:1;text-align:left;">Search by city, zip, or address...</div>
            <div style="background:#14b8a6;color:#fff;font-size:7px;font-weight:700;padding:5px 12px;border-radius:5px;">Search</div>
          </div>
          <div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap;">
            <div style="background:rgba(20,184,166,0.1);border:1px solid rgba(20,184,166,0.3);color:#14b8a6;font-size:6.5px;padding:4px 10px;border-radius:100px;">For Sale</div>
            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.4);font-size:6.5px;padding:4px 10px;border-radius:100px;">For Rent</div>
            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.4);font-size:6.5px;padding:4px 10px;border-radius:100px;">1–3 Beds</div>
            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.4);font-size:6.5px;padding:4px 10px;border-radius:100px;">Under $500K</div>
          </div>
        </div>
        <div style="padding:14px 22px;">
          <div style="color:rgba(255,255,255,0.25);font-size:7px;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:10px;">Featured Listings</div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;">
            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:7px;overflow:hidden;">
              <div style="height:50px;background:linear-gradient(135deg,#0c2220,#143530);display:flex;align-items:center;justify-content:center;font-size:18px;">🏡</div>
              <div style="padding:7px 8px;">
                <div style="color:#14b8a6;font-size:8px;font-weight:800;margin-bottom:2px;">$425,000</div>
                <div style="color:rgba(255,255,255,0.5);font-size:6px;">4 bd · 3 ba · 2,100 sqft</div>
                <div style="color:rgba(255,255,255,0.25);font-size:6px;margin-top:1px;">Houston, TX</div>
              </div>
            </div>
            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:7px;overflow:hidden;">
              <div style="height:50px;background:linear-gradient(135deg,#0e2822,#163d36);display:flex;align-items:center;justify-content:center;font-size:18px;">🏠</div>
              <div style="padding:7px 8px;">
                <div style="color:#14b8a6;font-size:8px;font-weight:800;margin-bottom:2px;">$289,000</div>
                <div style="color:rgba(255,255,255,0.5);font-size:6px;">3 bd · 2 ba · 1,650 sqft</div>
                <div style="color:rgba(255,255,255,0.25);font-size:6px;margin-top:1px;">Austin, TX</div>
              </div>
            </div>
            <div style="background:rgba(20,184,166,0.06);border:1px solid rgba(20,184,166,0.15);border-radius:7px;overflow:hidden;">
              <div style="height:50px;background:linear-gradient(135deg,#0d2e2a,#144038);display:flex;align-items:center;justify-content:center;font-size:18px;">🏘️</div>
              <div style="padding:7px 8px;">
                <div style="color:#14b8a6;font-size:8px;font-weight:800;margin-bottom:2px;">$675,000</div>
                <div style="color:rgba(255,255,255,0.5);font-size:6px;">5 bd · 4 ba · 3,200 sqft</div>
                <div style="color:rgba(255,255,255,0.25);font-size:6px;margin-top:1px;">Dallas, TX</div>
              </div>
            </div>
          </div>
        </div>
        <div style="padding:10px 22px 14px;">
          <div style="background:rgba(20,184,166,0.08);border:1px solid rgba(20,184,166,0.2);border-radius:8px;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;">
            <div>
              <div style="color:#fff;font-size:8px;font-weight:700;margin-bottom:2px;">Talk to an agent today</div>
              <div style="color:rgba(255,255,255,0.35);font-size:6.5px;">Free consultation · No commitment</div>
            </div>
            <div style="background:#14b8a6;color:#fff;font-size:7px;font-weight:700;padding:7px 14px;border-radius:4px;">Schedule Call</div>
          </div>
        </div>
        <div style="background:#050d0c;border-top:1px solid rgba(20,184,166,0.1);padding:11px 22px;display:flex;justify-content:space-between;align-items:center;">
          <div style="color:rgba(255,255,255,0.3);font-size:7px;font-weight:700;letter-spacing:0.06em;">SUMMIT REALTY © 2026</div>
          <div style="color:rgba(255,255,255,0.18);font-size:6.5px;">Houston · Austin · Dallas</div>
        </div>
      </div>
    `
  }
};

function openTemplateModal(templateKey) {
  const modal = document.getElementById('templateModal');
  const data = templateData[templateKey];
  if (!modal || !data) return;

  modal.querySelector('.modal-badge').textContent = data.badge;
  modal.querySelector('#templateModalTitle').textContent = data.title;
  modal.querySelector('.template-modal-copy').textContent = data.copy;
  modal.querySelector('.template-modal-preview').innerHTML = data.previewHtml;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeTemplateModal() {
  const modal = document.getElementById('templateModal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

// ── Init ─────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  // Wire tab buttons
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  // Logo goes home
  document.querySelector('.nav-logo').addEventListener('click', e => {
    e.preventDefault();
    switchTab('home');
  });

  // Template preview interactions
  document.querySelectorAll('.template-card').forEach(card => {
    card.addEventListener('click', () => openTemplateModal(card.dataset.template));
  });

  const modal = document.getElementById('templateModal');
  if (modal) {
    modal.querySelector('[data-close]').addEventListener('click', closeTemplateModal);
    modal.querySelector('.template-modal-close').addEventListener('click', closeTemplateModal);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeTemplateModal();
      }
    });
  }

  // Boot the home page
  activatePage('home');
  updateIndicator();
});

// Re-measure indicator if window resizes (e.g. font scaling)
window.addEventListener('resize', updateIndicator, { passive: true });
