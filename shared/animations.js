(function() {
  // Intersection Observer for entrance animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.setAttribute('data-visible', '');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Stagger container children
  document.querySelectorAll('[data-stagger]').forEach(container => {
    Array.from(container.children).forEach((child, i) => {
      child.style.setProperty('--stagger-i', i);
      child.setAttribute('data-animate', '');
      observer.observe(child);
    });
  });

  // Individual animate elements
  document.querySelectorAll('[data-animate]').forEach(el => {
    if (!el.style.getPropertyValue('--stagger-i')) {
      observer.observe(el);
    }
  });

  // Image animate elements
  document.querySelectorAll('[data-animate-img]').forEach(el => {
    observer.observe(el);
  });

  // Line reveal elements
  document.querySelectorAll('[data-animate-line]').forEach(el => {
    observer.observe(el);
  });

  // Number counter animation
  document.querySelectorAll('[data-counter]').forEach(el => {
    const target = parseFloat(el.getAttribute('data-counter'));
    const prefix = el.getAttribute('data-counter-prefix') || '';
    const suffix = el.getAttribute('data-counter-suffix') || '';
    const duration = 1400;
    let start = null;

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          start = performance.now();
          function update(timestamp) {
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOut cubic
            const current = Math.round(eased * target);
            el.textContent = prefix + current + suffix;
            if (progress < 1) requestAnimationFrame(update);
          }
          requestAnimationFrame(update);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counterObserver.observe(el);
  });

  // Mobile nav toggle
  const hamburgers = document.querySelectorAll('.hamburger');
  hamburgers.forEach(btn => {
    btn.addEventListener('click', () => {
      const nav = (btn.closest('header, nav') || document).querySelector('.mobile-nav')
                 || document.querySelector('.mobile-nav');
      if (nav) {
        nav.classList.toggle('open');
        btn.setAttribute('aria-expanded', nav.classList.contains('open'));
      }
    });
  });

  // ── Capability flags ──────────────────────────────────────────
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasHover       = window.matchMedia('(hover: hover)').matches;

  // ════════════════════════════════════════════════════════════
  // SMOOTH SCROLL MOMENTUM
  // Intercepts wheel events on desktop and lerps scrollY.
  // Skipped on touch/trackpad (reduced-motion or no hover).
  // ════════════════════════════════════════════════════════════
  if (!prefersReduced && hasHover) {
    let scrollCurrent = window.scrollY;
    let scrollTarget  = window.scrollY;
    let scrollActive  = false;
    const ease        = 0.1;

    // Keep targets in sync when native scroll fires (anchor jumps, etc.)
    let externalScroll = false;
    window.addEventListener('scroll', () => {
      if (externalScroll) {
        scrollTarget  = window.scrollY;
        scrollCurrent = window.scrollY;
        externalScroll = false;
      }
    }, { passive: true });

    window.addEventListener('wheel', e => {
      e.preventDefault();
      const delta = e.deltaMode === 1 ? e.deltaY * 32 : e.deltaY; // lines → px
      scrollTarget = Math.max(
        0,
        Math.min(scrollTarget + delta * 0.88, document.documentElement.scrollHeight - window.innerHeight)
      );
      if (!scrollActive) { scrollActive = true; rafScroll(); }
    }, { passive: false });

    // Keyboard scroll (arrows / page up-down / home / end)
    const keyMap = { 38: -80, 40: 80, 33: -window.innerHeight * 0.88, 34: window.innerHeight * 0.88 };
    document.addEventListener('keydown', e => {
      if (['INPUT','SELECT','TEXTAREA'].includes(document.activeElement.tagName)) return;
      if (e.key === 'Home') { scrollTarget = 0; }
      else if (e.key === 'End')  { scrollTarget = document.documentElement.scrollHeight - window.innerHeight; }
      else {
        const delta = keyMap[e.keyCode];
        if (!delta) return;
        scrollTarget = Math.max(0, Math.min(scrollTarget + delta, document.documentElement.scrollHeight - window.innerHeight));
      }
      if (!scrollActive) { scrollActive = true; rafScroll(); }
    });

    function rafScroll() {
      const diff = scrollTarget - scrollCurrent;
      scrollCurrent += diff * ease;
      window.scrollTo(0, scrollCurrent);
      if (Math.abs(diff) > 0.5) {
        requestAnimationFrame(rafScroll);
      } else {
        window.scrollTo(0, scrollTarget);
        scrollCurrent = scrollTarget;
        scrollActive  = false;
      }
    }
  }

  // ════════════════════════════════════════════════════════════
  // 3D CARD TILT ON HOVER
  // Applies perspective rotateX/Y based on mouse position
  // within each .glass-card. Resets smoothly on mouseleave.
  // ════════════════════════════════════════════════════════════
  if (!prefersReduced && hasHover) {
    document.querySelectorAll('.glass-card').forEach(card => {
      card.style.willChange = 'transform';

      card.addEventListener('mousemove', e => {
        const r  = card.getBoundingClientRect();
        const x  = (e.clientX - r.left)  / r.width  - 0.5;   // -0.5 → 0.5
        const y  = (e.clientY - r.top)   / r.height - 0.5;
        const tX = -y * 7;    // rotateX (tilt toward cursor vertically)
        const tY =  x * 7;    // rotateY (tilt toward cursor horizontally)
        card.style.transition = 'transform 0.08s linear, box-shadow 0.08s linear';
        card.style.transform  = `perspective(900px) rotateX(${tX}deg) rotateY(${tY}deg) scale3d(1.02,1.02,1.02)`;
        card.style.boxShadow  = `${-tY * 2}px ${tX * 2}px 32px rgba(172,207,179,0.07)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.6s ease';
        card.style.transform  = '';
        card.style.boxShadow  = '';
      });
    });
  }

  // ════════════════════════════════════════════════════════════
  // SCROLL-LINKED NAV SHRINK
  // Compacts inner content on scroll and hides on scroll-down
  // then reveals instantly on scroll-up.
  // ════════════════════════════════════════════════════════════
  const navEl = document.querySelector('nav.fixed, header.fixed');
  if (navEl) {
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      navEl.classList.toggle('nav-scrolled', y > 60);
      // Hide when scrolling down past 200px; reveal on any upward movement
      if (y > lastScrollY && y > 200) {
        navEl.classList.add('nav-hidden');
      } else {
        navEl.classList.remove('nav-hidden');
      }
      lastScrollY = y;
    }, { passive: true });
  }

})();
