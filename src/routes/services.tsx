import type { JSX } from 'solid-js';
import { A } from '@solidjs/router';

const serviceLinks = [
  {
    title: 'Web Development',
    description: 'Conversion-focused websites and scalable web app foundations.',
    href: '/web-development',
  },
  {
    title: 'Ecommerce Development',
    description: 'Storefront and checkout optimization for growth-ready online stores.',
    href: '/ecommerce-development',
  },
  {
    title: 'Performance and SEO',
    description: 'Technical SEO and speed optimization for stronger visibility and conversion.',
    href: '/performance-seo',
  },
];

export default function Services(): JSX.Element {
  return (
    <main class="w-full px-4 py-12 lp-ambient">
      <div class="lp-container max-w-5xl space-y-6">
        <section class="lp-card">
          <h1 class="text-3xl sm:text-4xl font-semibold tracking-tight">Services</h1>
          <p class="mt-3 text-sm text-muted">
            Structured offerings designed around outcomes: qualified leads, conversion quality, speed, and maintainability.
          </p>
        </section>
        <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {serviceLinks.map((service) => (
            <article class="lp-card">
              <h2 class="text-lg font-semibold">{service.title}</h2>
              <p class="mt-2 text-sm text-muted">{service.description}</p>
              <A href={service.href} class="mt-4 inline-flex text-sm font-semibold text-fg hover:underline">
                View service details
              </A>
            </article>
          ))}
        </section>
        <section class="lp-card">
          <h2 class="text-lg font-semibold">Ready to scope your project?</h2>
          <p class="mt-2 text-sm text-muted">
            Email us to align priorities, scope, and next milestones.
          </p>
          <div class="mt-4 flex flex-wrap gap-3">
            <a href="mailto:sendmessage@gabo.email" class="lp-button-primary">Email us</a>
            <A href="/work" class="lp-button-secondary">View selected work</A>
          </div>
          <p class="mt-3 text-sm text-muted">Expect a response within 48 hours • No obligation • Worldwide remote collaboration</p>
        </section>
      </div>
    </main>
  );
}
