// src/pages/PrivacyPolicy.tsx
import { A } from '@solidjs/router';
import { For, Show, createResource } from 'solid-js';
import type { JSX } from 'solid-js';
import legalFallback from '../../content/legal.json';

async function fetchLegalContent() {
  try {
    const response = await fetch('/api/content/legal');
    if (!response.ok) return legalFallback;
    const payload = await response.json();
    return payload?.data ?? legalFallback;
  } catch {
    return legalFallback;
  }
}

export default function Privacy(): JSX.Element {
  const [legalData] = createResource(fetchLegalContent);
  const content = () => legalData()?.privacy ?? legalFallback.privacy;

  return (
    <main class="w-full px-4 py-12 lp-ambient">
      <div class="lp-container max-w-4xl space-y-6">
        <section class="lp-card">
          <h1 class="text-3xl sm:text-4xl font-semibold tracking-tight">{content().title}</h1>
          <p class="mt-3 text-sm text-muted">{content().effectiveDate}</p>
        </section>

        <For each={content().sections}>
          {(section) => (
            <section class="lp-card">
              <h2 class="text-xl font-semibold">{section.heading}</h2>
              <div class="mt-3 space-y-3 text-sm leading-relaxed text-muted">
                <For each={section.paragraphs}>{(paragraph) => <p>{paragraph}</p>}</For>
              </div>
              <Show when={section.list?.length}>
                <ul class="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
                  <For each={section.list}>{(item) => <li>{item}</li>}</For>
                </ul>
              </Show>
            </section>
          )}
        </For>

        <section class="lp-card">
          <h2 class="text-lg font-semibold">Contact Information</h2>
          <address class="mt-3 not-italic space-y-2 text-sm text-muted">
            <p>
              Email:{' '}
              <a href={`mailto:${content().contactEmail}`} class="font-semibold text-fg hover:underline">
                {content().contactEmail}
              </a>
            </p>
            <p>Address: {content().contactAddress}</p>
          </address>
          <div class="mt-5">
            <A href={content().ctaHref} class="lp-button-primary">
              {content().ctaLabel}
            </A>
          </div>
        </section>
      </div>
    </main>
  );
}
