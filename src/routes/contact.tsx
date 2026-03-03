// src/pages/Contact.tsx
import { For, createResource } from 'solid-js';
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

export default function Contact() {
  const [contactData] = createResource(fetchContactContent);

  return (
    <main class="w-full bg-stone-800 text-white px-4 py-10 sm:px-6 md:px-10 lg:px-16">
      <section class="max-w-6xl mx-auto text-center">
        <h1 class="text-3xl sm:text-4xl md:text-5xl uppercase font-bold tracking-wide mt-4 mb-6 sm:mb-8">
          {contactData()?.heading ?? contactFallback.heading}
        </h1>
        <h2 class="text-lg sm:text-2xl md:text-3xl uppercase mb-10 sm:mb-14">
          {contactData()?.subheading ?? contactFallback.subheading}
        </h2>
        <div class="mx-auto max-w-5xl rounded-lg bg-[hsla(0,0%,5%,0.72)] px-4 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-[20px]">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <For each={contactData()?.items ?? contactFallback.items}>
              {contactMethod => <ContactIcon {...contactMethod} />}
            </For>
          </div>
        </div>
      </section>
    </main>
  );
}
