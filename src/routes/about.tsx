import { A } from '@solidjs/router';
import { For, createResource } from 'solid-js';
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

export default function about() {
  const [aboutData] = createResource(fetchAboutContent);
  const sections = () => aboutData()?.sections ?? aboutFallback.sections;

  return (
    <main class="w-full bg-stone-800 text-white px-5 py-12 sm:px-8 md:px-12 lg:px-20 lg:py-16">
      <div class="max-w-3xl mx-auto space-y-10 sm:space-y-12">
        <For each={sections()}>
          {(section, index) => (
            <section class={index() === 0 ? 'text-center' : ''}>
              <h2
                class={
                  index() === 0
                    ? 'text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-center'
                    : 'text-2xl sm:text-3xl font-semibold text-center mb-3 sm:mb-4'
                }
              >
                {section.title}
              </h2>
              <p class="text-base sm:text-lg leading-relaxed text-center">
                {section.body}{' '}
                {section.email && (
                  <a href={`mailto:${section.email}`} class="text-blue-600 hover:underline">
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
