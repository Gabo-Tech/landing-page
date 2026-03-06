import { onCleanup, onMount } from 'solid-js';
import type { JSX } from 'solid-js';

export default function ScrollbarVisibility(): JSX.Element {
  onMount(() => {
    const scroller = document.querySelector('.app-scroll-root');
    if (!(scroller instanceof HTMLElement)) return;
    let timeoutId: number | undefined;

    const showWhileScrolling = () => {
      scroller.classList.add('is-scrolling');
      if (timeoutId) window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        scroller.classList.remove('is-scrolling');
      }, 1300);
    };

    scroller.addEventListener('scroll', showWhileScrolling, { passive: true });
    scroller.addEventListener('wheel', showWhileScrolling, { passive: true });
    scroller.addEventListener('touchmove', showWhileScrolling, { passive: true });

    onCleanup(() => {
      scroller.removeEventListener('scroll', showWhileScrolling);
      scroller.removeEventListener('wheel', showWhileScrolling);
      scroller.removeEventListener('touchmove', showWhileScrolling);
      if (timeoutId) window.clearTimeout(timeoutId);
    });
  });

  return null;
}
