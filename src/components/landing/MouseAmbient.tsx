import { onCleanup, onMount } from 'solid-js';
import type { JSX } from 'solid-js';

export default function MouseAmbient(): JSX.Element {
  onMount(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const target = document.documentElement;
    if (prefersReducedMotion || !target) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let raf = 0;

    const updateVars = () => {
      currentX += (mouseX - currentX) * 0.009;
      currentY += (mouseY - currentY) * 0.009;
      target.style.setProperty('--mouse-x', `${currentX}px`);
      target.style.setProperty('--mouse-y', `${currentY}px`);
      raf = requestAnimationFrame(updateVars);
    };

    const onMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    raf = requestAnimationFrame(updateVars);

    onCleanup(() => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
    });
  });

  return <div class="lp-mouse-ambient" aria-hidden="true" />;
}
