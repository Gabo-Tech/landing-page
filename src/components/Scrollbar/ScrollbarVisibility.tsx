import { onCleanup, onMount } from 'solid-js';
import type { JSX } from 'solid-js';

export default function ScrollbarVisibility(): JSX.Element {
  onMount(() => {
    const root = document.documentElement;
    let timeoutId: number | undefined;

    const showWhileScrolling = () => {
      root.classList.add('is-scrolling');
      if (timeoutId) window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        root.classList.remove('is-scrolling');
      }, 850);
    };

    window.addEventListener('scroll', showWhileScrolling, { passive: true });

    onCleanup(() => {
      window.removeEventListener('scroll', showWhileScrolling);
      if (timeoutId) window.clearTimeout(timeoutId);
    });
  });

  return null;
}
