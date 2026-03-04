import { Show, createSignal, onCleanup, onMount } from 'solid-js';
import type { JSX } from 'solid-js';
import { Portal } from 'solid-js/web';

const THEME_STORAGE_KEY = 'theme-preference';
type Theme = 'dark' | 'light';

function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.classList.remove('dark', 'light');
  root.classList.add(theme);
  root.style.colorScheme = theme;
}

export default function ThemeToggle(): JSX.Element {
  const [theme, setTheme] = createSignal<Theme>('dark');
  const [sweepTheme, setSweepTheme] = createSignal<Theme | null>(null);
  let applyTimer: number | undefined;
  let clearTimer: number | undefined;

  onMount(() => {
    const root = document.documentElement;
    const active: Theme = root.classList.contains('light') ? 'light' : 'dark';
    setTheme(active);
  });

  onCleanup(() => {
    if (applyTimer) window.clearTimeout(applyTimer);
    if (clearTimer) window.clearTimeout(clearTimer);
  });

  const toggle = (): void => {
    const nextTheme: Theme = theme() === 'dark' ? 'light' : 'dark';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (applyTimer) window.clearTimeout(applyTimer);
    if (clearTimer) window.clearTimeout(clearTimer);

    if (prefersReducedMotion) {
      applyTheme(nextTheme);
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      setTheme(nextTheme);
      return;
    }

    setSweepTheme(nextTheme);
    applyTimer = window.setTimeout(() => {
      applyTheme(nextTheme);
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      setTheme(nextTheme);
    }, 1300);

    clearTimer = window.setTimeout(() => {
      setSweepTheme(null);
    }, 3200);
  };

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        class="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border text-fg transition-colors duration-200 hover:border-fg/25 hover:text-fg"
        aria-label={`Switch to ${theme() === 'dark' ? 'light' : 'dark'} mode`}
        title={`Switch to ${theme() === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme() === 'dark' ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            class="h-4 w-4"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2.2M12 19.8V22M4.22 4.22l1.55 1.55M18.23 18.23l1.55 1.55M2 12h2.2M19.8 12H22M4.22 19.78l1.55-1.55M18.23 5.77l1.55-1.55" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            class="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7.2 7.2 0 1 0 9.8 9.8z" />
          </svg>
        )}
      </button>
      <Portal>
        <Show when={sweepTheme()}>
          {(nextTheme) => (
            <div class={`theme-sweep theme-sweep--${nextTheme()}`} aria-hidden="true" />
          )}
        </Show>
      </Portal>
    </>
  );
}
