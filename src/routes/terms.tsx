// src/routes/terms.tsx
import { A } from '@solidjs/router';
import { For, createResource } from 'solid-js';
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

export default function terms() {
  const [legalData] = createResource(fetchLegalContent);
  const content = () => legalData()?.terms ?? legalFallback.terms;

  return (
    <div class="mx-auto p-24 bg-stone-800 text-white">
      <h1 class="text-3xl font-bold mb-6">
        {content().title}
      </h1>
      <p>
        <strong>{content().effectiveDate}</strong>
      </p>
      <For each={content().sections}>
        {section => (
          <>
            <h2 class="mt-6 mb-2 text-xl font-semibold">{section.heading}</h2>
            <For each={section.paragraphs}>{paragraph => <p>{paragraph}</p>}</For>
          </>
        )}
      </For>
      <p>
        Refer to our{' '}
        <A href={content().privacyLinkHref} class="text-white font-bold underline">
          {content().privacyLinkLabel}
        </A>{' '}
        for information on how we collect, use, and protect your personal data.
        Our Privacy Policy is an integral part of these Terms.
      </p>

      <div class="mt-6">
        <p>Contact Information:</p>
        <p>For any concerns or inquiries, contact us via:</p>
        <p>Email: {content().contactEmail}</p>
        <p>
          Address: {content().contactAddress}
        </p>
      </div>
    </div>
  );
}
