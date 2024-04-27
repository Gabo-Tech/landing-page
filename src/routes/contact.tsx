// src/pages/Contact.tsx
import { For } from 'solid-js';
import ContactIcon from '../components/ContactComponent/ContactIcon';
import contactDetails from '../data/contactDetails.json';

export default function Contact() {
  return (
    <main class="text-center mx-auto bg-stone-800 text-white p-4 min-h-screen">
      <h1 class="text-6xl text-black-700 uppercase my-16">
        Getting in touch is easy
      </h1>
      <h2 class="mb-40 text-4xl text-black-700 uppercase my-16">
        We'll get back to you ASAP. No worries.
      </h2>
      <div class="container my-28 mx-auto md:px-6">
        <section>
          <div class="container px-6 md:px-12 text-white">
            <div class="block rounded-lg bg-[hsla(0,0%,100%,0.7)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[hsla(0,0%,5%,0.7)] dark:shadow-black/20 md:py-16 md:px-12 -mt-[100px] backdrop-blur-[30px]">
              <div class="grid gap-x-6 md:grid-cols-2 lg:grid-cols-4">
                <For each={contactDetails}>
                  {contactMethod => <ContactIcon {...contactMethod} />}
                </For>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
