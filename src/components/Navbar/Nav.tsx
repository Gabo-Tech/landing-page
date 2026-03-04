import { A, useLocation } from '@solidjs/router';
import { For, Show, createEffect, createResource, createSignal } from 'solid-js';
import type { JSX } from 'solid-js';
import siteFallback from '../../../content/site.json';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

async function fetchSiteContent() {
  try {
    const response = await fetch('/api/content/site');
    if (!response.ok) return siteFallback;
    const payload = await response.json();
    return payload?.data ?? siteFallback;
  } catch {
    return siteFallback;
  }
}

export default function Nav(): JSX.Element {
  const location = useLocation();
  const [siteData] = createResource(fetchSiteContent);
  const [menuOpen, setMenuOpen] = createSignal(false);
  const navLinks = () => siteData()?.navLinks ?? siteFallback.navLinks;

  createEffect(() => {
    location.pathname;
    setMenuOpen(false);
  });

  const active = (path: string): string =>
    path === location.pathname
      ? 'text-fg border-fg/40'
      : 'text-muted border-transparent hover:text-fg hover:border-fg/20';

  return (
    <nav class="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg/92 backdrop-blur">
      <div class="mx-auto flex h-16 w-full max-w-[92rem] items-center justify-between gap-3 px-4 2xl:px-6">
        <A href="/" class="inline-flex flex-col leading-tight">
          <span class="lp-brand-mark text-xs sm:text-sm text-fg whitespace-nowrap">
            {siteData()?.brandName ?? siteFallback.brandName}
          </span>
          <span class="lp-brand-tagline hidden sm:block text-[10px] uppercase text-muted">
            Great Apps, Better Opportunities
          </span>
        </A>
        <div class="flex items-center gap-1.5 sm:gap-2">
          <ul class="hidden md:flex items-center gap-1 sm:gap-1.5">
            <For each={navLinks()}>
              {(link) => (
                <li>
                  <A
                    href={link.href}
                    class={`inline-flex border px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.1em] sm:tracking-[0.12em] transition-colors duration-200 ${active(link.href)}`}
                  >
                    {link.label}
                  </A>
                </li>
              )}
            </For>
            <li>
              <a href="mailto:sendmessage@gabo.email" class="lp-button-primary px-3 py-1.5 text-xs uppercase tracking-[0.12em]">
                Email us
              </a>
            </li>
          </ul>
          <ThemeToggle />
          <button
            type="button"
            class="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border text-fg transition-colors md:hidden hover:border-fg/25"
            aria-label={menuOpen() ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen(prev => !prev)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-4 w-4">
              <Show
                when={!menuOpen()}
                fallback={<path d="m6 6 12 12M18 6 6 18" />}
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </Show>
            </svg>
          </button>
        </div>
      </div>
      <Show when={menuOpen()}>
        <div class="border-t border-border bg-bg/96 px-4 py-3 md:hidden">
          <div class="mx-auto w-full max-w-[92rem] space-y-2">
            <For each={navLinks()}>
              {(link) => (
                <A
                  href={link.href}
                  class={`flex items-center justify-between rounded-sm border px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] ${active(link.href)}`}
                >
                  <span>{link.label}</span>
                </A>
              )}
            </For>
            <a href="mailto:sendmessage@gabo.email" class="lp-button-primary w-full text-xs uppercase tracking-[0.12em]">
              Email us
            </a>
          </div>
        </div>
      </Show>
    </nav>
  );
}
