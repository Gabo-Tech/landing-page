import { For, createResource } from 'solid-js';
import { A } from '@solidjs/router';
import type { JSX } from 'solid-js';
import siteFallback from '../../../content/site.json';

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

export default function Footer(): JSX.Element {
  const [siteData] = createResource(fetchSiteContent);
  const footer = () => siteData()?.footer ?? siteFallback.footer;
  const year = new Date().getFullYear();

  return (
    <footer class="w-full border-t border-border bg-card">
      <div class="mx-auto grid w-full max-w-[92rem] gap-8 px-4 py-10 md:grid-cols-4 2xl:px-6">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.16em] text-fg">
            {siteData()?.brandName ?? siteFallback.brandName}
          </p>
          <p class="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            Great Apps, Better Opportunities. Boutique development agency focused on conversion, performance, and long-term maintainability.
          </p>
          <A href="/#services" class="mt-4 inline-flex text-sm font-semibold text-fg hover:underline">
            Explore services
          </A>
        </div>
        <div>
          <h4 class="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{footer().companyTitle}</h4>
          <ul class="mt-3 space-y-2">
            <For each={footer().companyLinks}>
              {(link) => (
                <li>
                  <A href={link.href} class="text-sm text-fg hover:underline">
                    {link.label}
                  </A>
                </li>
              )}
            </For>
          </ul>
        </div>
        <div>
          <h4 class="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{footer().legalTitle}</h4>
          <ul class="mt-3 space-y-2">
            <For each={footer().legalLinks}>
              {(link) => (
                <li>
                  <A href={link.href} class="text-sm text-fg hover:underline">
                    {link.label}
                  </A>
                </li>
              )}
            </For>
          </ul>
        </div>
        <div>
          <h4 class="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{footer().helpTitle}</h4>
          <ul class="mt-3 space-y-2">
            <For each={footer().helpLinks}>
              {(link) => (
                <li>
                  {link.href.startsWith('mailto:') ? (
                    <a href={link.href} class="text-sm text-fg hover:underline">
                      {link.label}
                    </a>
                  ) : (
                    <A href={link.href} class="text-sm text-fg hover:underline">
                      {link.label}
                    </A>
                  )}
                </li>
              )}
            </For>
            <li class="pt-2 text-sm text-muted">US English • Worldwide remote collaboration</li>
          </ul>
        </div>
      </div>
      <div class="border-t border-border">
        <div class="mx-auto flex w-full max-w-[92rem] items-center justify-between px-4 py-4 text-sm text-muted 2xl:px-6">
          <p>
            © {year} {siteData()?.brandName ?? siteFallback.brandName}
          </p>
          <a
            href="mailto:sendmessage@gabo.email"
            class="text-fg hover:underline"
          >
            sendmessage@gabo.email
          </a>
        </div>
      </div>
    </footer>
  );
}
