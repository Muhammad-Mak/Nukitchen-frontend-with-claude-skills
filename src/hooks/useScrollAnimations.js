import { useEffect, useRef } from 'react';

/**
 * Scroll reveal: observes .reveal, .reveal-left, .reveal-right, [data-animate]
 * and adds .visible when they enter the viewport.
 */
export function useScrollAnimations() {
  useEffect(() => {
    const elements = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, [data-animate]'
    );
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/**
 * Parallax images: translates .parallax-img inside .parallax-container
 * based on scroll position using IntersectionObserver with 100 threshold steps.
 */
export function useParallaxImages() {
  const rafRef = useRef(null);

  useEffect(() => {
    const containers = document.querySelectorAll('.parallax-container');
    if (!containers.length) return;

    const thresholds = Array.from({ length: 101 }, (_, i) => i / 100);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const img = entry.target.querySelector('.parallax-img');
          if (!img || !entry.rootBounds) return;

          const viewportH = entry.rootBounds.height;
          const rect = entry.boundingClientRect;
          const progress = 1 - (rect.top + rect.height) / (viewportH + rect.height);
          const clamped = Math.max(0, Math.min(1, progress));

          let distance = 240;
          if (window.innerWidth < 768) distance = 130;
          else if (window.innerWidth < 1024) distance = 200;

          const translate = -clamped * distance;

          if (rafRef.current) cancelAnimationFrame(rafRef.current);
          rafRef.current = requestAnimationFrame(() => {
            img.style.transform = `translateY(${translate}px)`;
          });
        });
      },
      { threshold: thresholds }
    );

    containers.forEach((c) => observer.observe(c));

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);
}

/**
 * Navbar scroll behavior:
 *  - scrolled > 50px  → .scrolled (white bg + shadow)
 *  - scrolling down > 300px → .hidden (slide up)
 *  - scrolling up → remove .hidden
 */
export function useNavbarScroll() {
  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;

        if (y > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }

        if (y > 300 && y > lastScroll) {
          navbar.classList.add('hidden');
        } else {
          navbar.classList.remove('hidden');
        }

        lastScroll = y;
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}
