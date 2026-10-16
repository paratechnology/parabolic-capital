(() => {
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const targets = document.querySelectorAll('.ev-principles article, .ev-capability-list > div, .ev-project, .ev-case-step');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -28px 0px', threshold: 0.06 });

  targets.forEach((target) => {
    target.classList.add('ev-reveal');
    observer.observe(target);
  });
})();
