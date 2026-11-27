document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  // 1. Animación de entrada en Hero
  gsap.from('.hero-text > *', {
    y: 24,
    opacity: 0,
    duration: 0.75,
    stagger: 0.1,
    ease: 'power3.out'
  });

  gsap.from('.art-frame', {
    scale: 0.94,
    opacity: 0,
    duration: 0.9,
    delay: 0.2,
    ease: 'power3.out'
  });

  // Flotado sutil en formas de fondo
  gsap.to('.shape-1', { y: 24, x: 16, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.shape-2', { y: -24, x: -16, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });

  // 2. Animaciones al hacer scroll
  gsap.utils.toArray('.gs-reveal').forEach((el) => {
    gsap.from(el, {
      y: 30,
      opacity: 0,
      duration: 0.75,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true }
    });
  });

  gsap.from('.gs-card', {
    y: 30,
    opacity: 0,
    duration: 0.65,
    stagger: 0.12,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.pricing-grid', start: 'top 82%', once: true }
  });

  gsap.from('.gs-art', {
    y: 26,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.gallery-grid', start: 'top 82%', once: true }
  });

  // 3. Switch de Moneda (MXN / USD)
  const currencyBtns = document.querySelectorAll('.currency-btn');
  const priceVals = document.querySelectorAll('.price-val');

  currencyBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const currency = btn.dataset.currency;
      currencyBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      priceVals.forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: -6 }, {
          opacity: 1,
          y: 0,
          duration: 0.25,
          onStart: () => { el.textContent = el.dataset[currency]; }
        });
      });
    });
  });

  // 4. Filtro de Portafolio
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      galleryItems.forEach((item) => {
        const match = filter === 'all' || item.dataset.category.includes(filter);
        item.classList.toggle('hidden', !match);
        if (match) {
          gsap.fromTo(item, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.35 });
        }
      });
    });
  });

  // 5. Lightbox para ver dibujos en grande
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCaption = document.getElementById('lightbox-caption');
  const lbClose = document.querySelector('.lightbox-close');

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('h4').textContent;
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbCaption.textContent = title;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  };

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
});
