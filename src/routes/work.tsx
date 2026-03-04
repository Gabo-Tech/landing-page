import type { JSX } from 'solid-js';
import { A } from '@solidjs/router';

const workItems = [
  {
    title: 'Consulting Personal Brand Website',
    challenge: 'High traffic, low conversion into qualified calls.',
    solution: 'Improved messaging hierarchy, CTA placement, and page speed.',
    result: 'Better booking intent and stronger lead quality after launch.',
  },
  {
    title: 'Service Business Website Rebuild',
    challenge: 'Outdated interface and low trust from new visitors.',
    solution: 'Modernized visual system, mobile UX, and conversion flow.',
    result: 'Higher engagement and clearer path from visit to inquiry.',
  },
  {
    title: 'Confidential Startup MVP',
    challenge: 'Launch quickly without creating long-term technical debt.',
    solution: 'Defined milestones and shipped on a scalable architecture.',
    result: 'Faster go-to-market and smoother post-launch iterations.',
  },
];

export default function Work(): JSX.Element {
  return (
    <main class="w-full px-4 py-12 lp-ambient">
      <div class="lp-container max-w-5xl space-y-6">
        <section class="lp-card">
          <h1 class="text-3xl sm:text-4xl font-semibold tracking-tight">Selected Work</h1>
          <p class="mt-3 text-sm text-muted">
            A focused set of projects showing how scoping, UX, and engineering decisions improve outcomes.
          </p>
        </section>
        <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {workItems.map((item) => (
            <article class="lp-card">
              <h2 class="text-base font-semibold">{item.title}</h2>
              <p class="mt-3 text-sm text-muted"><span class="font-semibold text-fg">Challenge:</span> {item.challenge}</p>
              <p class="mt-2 text-sm text-muted"><span class="font-semibold text-fg">Solution:</span> {item.solution}</p>
              <p class="mt-2 text-sm text-muted"><span class="font-semibold text-fg">Result:</span> {item.result}</p>
            </article>
          ))}
        </section>
        <section class="lp-card">
          <h2 class="text-lg font-semibold">Want similar outcomes?</h2>
          <p class="mt-2 text-sm text-muted">Email us and get a practical scope with milestones and priorities.</p>
          <div class="mt-4 flex flex-wrap gap-3">
            <a class="lp-button-primary" href="mailto:sendmessage@gabo.email">Email us</a>
            <A class="lp-button-secondary" href="/services">Explore services</A>
          </div>
          <p class="mt-3 text-sm text-muted">Expect a response within 48 hours • No obligation • Worldwide remote collaboration</p>
        </section>
        <section class="grid gap-4 md:grid-cols-3">
          <A href="/web-development" class="lp-card hover:underline">
            <h2 class="text-base font-semibold">Web Development</h2>
            <p class="mt-2 text-sm text-muted">Conversion-focused websites and scalable product builds.</p>
          </A>
          <A href="/ecommerce-development" class="lp-card hover:underline">
            <h2 class="text-base font-semibold">Ecommerce Development</h2>
            <p class="mt-2 text-sm text-muted">Storefront and checkout optimization for growth-focused teams.</p>
          </A>
          <A href="/performance-seo" class="lp-card hover:underline">
            <h2 class="text-base font-semibold">Performance and SEO</h2>
            <p class="mt-2 text-sm text-muted">Technical optimization for discoverability, speed, and results.</p>
          </A>
        </section>
      </div>
    </main>
  );
}
