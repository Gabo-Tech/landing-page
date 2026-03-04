// src/pages/Contact.tsx
import { For, createResource } from 'solid-js';
import type { JSX } from 'solid-js';
import ContactIcon from '../components/ContactComponent/ContactIcon';
import contactFallback from '../../content/contact.json';

async function fetchContactContent() {
  try {
    const response = await fetch('/api/content/contact');
    if (!response.ok) return contactFallback;
    const payload = await response.json();
    return payload?.data ?? contactFallback;
  } catch {
    return contactFallback;
  }
}

export default function Contact(): JSX.Element {
  const [contactData] = createResource(fetchContactContent);
  const orderedItems = () => {
    const items = contactData()?.items ?? contactFallback.items;
    return [...items].sort((a, b) => {
      const aIsEmail = a.href.startsWith('mailto:');
      const bIsEmail = b.href.startsWith('mailto:');
      return Number(bIsEmail) - Number(aIsEmail);
    });
  };

  return (
    <main class="w-full px-4 py-12 lp-ambient">
      <section class="lp-container text-center">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4">
          {contactData()?.heading ?? contactFallback.heading}
        </h1>
        <h2 class="mx-auto mb-8 max-w-2xl text-base sm:text-lg text-muted">
          {contactData()?.subheading ?? contactFallback.subheading}
        </h2>
        <div class="mx-auto mb-8 max-w-3xl rounded-md border border-border bg-card p-5 text-left">
          <p class="text-xs uppercase tracking-[0.14em] text-muted">What Happens Next</p>
          <div class="mt-3 grid gap-3 sm:grid-cols-3">
            <div class="rounded-md border border-border bg-bg p-3">
              <p class="text-xs uppercase tracking-[0.1em] text-muted">Step 1</p>
              <p class="mt-1 text-sm font-medium">Send your project details by email</p>
            </div>
            <div class="rounded-md border border-border bg-bg p-3">
              <p class="text-xs uppercase tracking-[0.1em] text-muted">Step 2</p>
              <p class="mt-1 text-sm font-medium">Align scope and priorities</p>
            </div>
            <div class="rounded-md border border-border bg-bg p-3">
              <p class="text-xs uppercase tracking-[0.1em] text-muted">Step 3</p>
              <p class="mt-1 text-sm font-medium">Receive a clear proposal</p>
            </div>
          </div>
        </div>
        <div class="mx-auto max-w-5xl rounded-md border border-border bg-card px-4 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <For each={orderedItems()}>
              {(contactMethod, index) => (
                <div
                  class={`rounded-md border bg-bg p-4 ${
                    index() === 0
                      ? 'border-fg/40 sm:col-span-2 lg:col-span-2'
                      : 'border-border'
                  }`}
                >
                  <ContactIcon {...contactMethod} />
                </div>
              )}
            </For>
          </div>
        </div>
      </section>
    </main>
  );
}
