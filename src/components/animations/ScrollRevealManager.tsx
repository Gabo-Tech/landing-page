import { onCleanup, onMount } from 'solid-js';
import type { JSX } from 'solid-js';

export default function ScrollRevealManager(): JSX.Element {
  onMount(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const selector = [
      'main .lp-section',
      'main .lp-card',
      'main h1',
      'main .lp-heading',
      'main .lp-subheading',
      'main .lp-button-primary',
      'main .lp-button-secondary',
      'main details',
      'main h2',
      'main h3',
      'main p',
    ].join(', ');

    const targets = Array.from(document.querySelectorAll<HTMLElement>(selector));

    if (!targets.length) return;

    targets.forEach((el, index) => {
      if (!el.dataset.reveal) {
        if (el.classList.contains('lp-card')) {
          el.dataset.reveal = index % 4 === 0 ? 'left' : index % 4 === 2 ? 'right' : 'soft';
        } else if (el.tagName === 'H1') {
          el.dataset.reveal = 'zoom';
        } else {
          el.dataset.reveal = 'soft';
        }
      }

      if (!el.style.getPropertyValue('--reveal-delay')) {
        const stagger = (index % 8) * 55;
        el.style.setProperty('--reveal-delay', `${stagger}ms`);
      }
    });

    if (prefersReducedMotion) {
      targets.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          target.classList.add('is-revealed');
          observer.unobserve(target);
        });
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.12,
      },
    );

    targets.forEach((el) => observer.observe(el));

    onCleanup(() => observer.disconnect());
  });

  return null;
}
