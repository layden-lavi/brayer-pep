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
})();
