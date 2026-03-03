// src/pages/PrivacyPolicy.tsx
import { A } from '@solidjs/router';
import { For, Show, createResource } from 'solid-js';
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

export default function privacy() {
  const [legalData] = createResource(fetchLegalContent);
  const content = () => legalData()?.privacy ?? legalFallback.privacy;

  return (
    <main class="mx-auto p-24 bg-stone-800 text-white min-w-screen">
      <h1 class="text-xl font-semibold my-4">{content().title}</h1>
      <p>
        <strong>{content().effectiveDate}</strong>
      </p>
      <For each={content().sections}>
        {section => (
          <>
            <h2 class="mt-6 mb-2">{section.heading}</h2>
            <For each={section.paragraphs}>{paragraph => <p>{paragraph}</p>}</For>
            <Show when={section.list?.length}>
              <ul>
                <For each={section.list}>{item => <li>{item}</li>}</For>
              </ul>
            </Show>
          </>
        )}
      </For>
      <address>
        Email: {content().contactEmail}
        <br />
        Address: {content().contactAddress}
      </address>

      <div class="mt-6">
        <A
          href={content().ctaHref}
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {content().ctaLabel}
        </A>
      </div>
    </main>
  );
}
