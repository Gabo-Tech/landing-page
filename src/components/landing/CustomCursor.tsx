import { Show, createSignal, onCleanup, onMount } from 'solid-js';
import type { JSX } from 'solid-js';

export default function CustomCursor(): JSX.Element {
  const [enabled, setEnabled] = createSignal(false);
  const [dotStyle, setDotStyle] = createSignal<Record<string, string>>({});
  const [ringStyle, setRingStyle] = createSignal<Record<string, string>>({});

  onMount(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsPointer = window.matchMedia('(pointer: fine)').matches;

    if (prefersReducedMotion || !supportsPointer) return;
    setEnabled(true);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    const onMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      setDotStyle({
        transform: `translate(${mouseX - 4}px, ${mouseY - 4}px)`,
      });
    };

    const onOver = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest('a, button, [role="button"]');
      setRingStyle({
        transform: interactive
          ? `translate(${ringX - 17}px, ${ringY - 17}px) scale(1.25)`
          : `translate(${ringX - 17}px, ${ringY - 17}px) scale(1)`,
      });
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;
      setRingStyle((prev) => ({
        ...prev,
        transform: prev.transform?.includes('scale(1.25)')
          ? `translate(${ringX - 17}px, ${ringY - 17}px) scale(1.25)`
          : `translate(${ringX - 17}px, ${ringY - 17}px) scale(1)`,
      }));
      raf = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);

    let raf = requestAnimationFrame(tick);

    onCleanup(() => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
    });
  });

  return (
    <Show when={enabled()}>
      <div class="cursor-dot" style={dotStyle()} />
      <div class="cursor-ring" style={ringStyle()} />
    </Show>
  );
}
