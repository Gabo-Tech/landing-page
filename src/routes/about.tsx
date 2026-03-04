import { For, createResource } from 'solid-js';
import type { JSX } from 'solid-js';
import aboutFallback from '../../content/about.json';

async function fetchAboutContent() {
  try {
    const response = await fetch('/api/content/about');
    if (!response.ok) return aboutFallback;
    const payload = await response.json();
    return payload?.data ?? aboutFallback;
  } catch {
    return aboutFallback;
  }
}

export default function About(): JSX.Element {
  const [aboutData] = createResource(fetchAboutContent);
  const sections = () => aboutData()?.sections ?? aboutFallback.sections;

  return (
    <main class="w-full px-4 py-12 lp-ambient">
      <div class="lp-container max-w-3xl space-y-8">
        <For each={sections()}>
          {(section, index) => (
            <section class="lp-card">
              <h2
                class={
                  index() === 0
                    ? 'text-2xl sm:text-3xl font-semibold mb-3'
                    : 'text-xl sm:text-2xl font-semibold mb-2'
                }
              >
                {section.title}
              </h2>
              <p class="text-base leading-relaxed text-muted">
                {section.body}{' '}
                {section.email && (
                  <a href={`mailto:${section.email}`} class="text-fg font-semibold hover:underline">
                    {section.email}
                  </a>
                )}
              </p>
            </section>
          )}
        </For>
      </div>
    </main>
  );
}
