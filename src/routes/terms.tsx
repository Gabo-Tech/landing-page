// src/routes/terms.tsx
import { A } from '@solidjs/router';
import { For, createResource } from 'solid-js';
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

export default function Terms(): JSX.Element {
  const [legalData] = createResource(fetchLegalContent);
  const content = () => legalData()?.terms ?? legalFallback.terms;

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
            </section>
          )}
        </For>

        <section class="lp-card">
          <p class="text-sm leading-relaxed text-muted">
            Refer to our{' '}
            <A href={content().privacyLinkHref} class="font-semibold text-fg hover:underline">
              {content().privacyLinkLabel}
            </A>{' '}
            for information on how we collect, use, and protect your personal data.
            Our Privacy Policy is an integral part of these Terms.
          </p>
        </section>

        <section class="lp-card">
          <h2 class="text-lg font-semibold">Contact Information</h2>
          <div class="mt-3 space-y-2 text-sm text-muted">
            <p>For any concerns or inquiries, contact us via:</p>
            <p>
              Email:{' '}
              <a href={`mailto:${content().contactEmail}`} class="font-semibold text-fg hover:underline">
                {content().contactEmail}
              </a>
            </p>
            <p>Address: {content().contactAddress}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
