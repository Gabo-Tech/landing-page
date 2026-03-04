import type { JSX } from 'solid-js';
import { A } from '@solidjs/router';

export default function WebDevelopment(): JSX.Element {
  return (
    <main class="w-full px-4 py-12 lp-ambient">
      <div class="lp-container max-w-4xl space-y-6">
        <section class="lp-card">
          <h1 class="text-3xl sm:text-4xl font-semibold tracking-tight">Web Development Services</h1>
          <p class="mt-3 text-sm text-muted">
            Conversion-focused websites and scalable web products built for speed, clarity, and maintainability.
          </p>
        </section>
        <section class="lp-card">
          <h2 class="text-lg font-semibold">What’s included</h2>
          <ul class="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
            <li>Information architecture and conversion-focused page flow</li>
            <li>Frontend development in modern JavaScript/TypeScript stacks</li>
            <li>Performance-first implementation and responsive QA</li>
            <li>Launch support with baseline technical SEO</li>
          </ul>
          <p class="mt-4 text-sm font-semibold">Typical engagement: CHF 6,000-15,000</p>
          <p class="mt-2 text-sm text-muted">Best for companies that need a reliable website that supports sales, hiring, or brand trust.</p>
          <div class="mt-4 flex flex-wrap gap-3">
            <a href="mailto:sendmessage@gabo.email" class="inline-flex lp-button-primary">Email us</a>
            <A href="/work" class="inline-flex lp-button-secondary">See related work</A>
          </div>
          <p class="mt-3 text-sm text-muted">Expect a response within 48 hours • No obligation • Worldwide remote collaboration</p>
        </section>
      </div>
    </main>
  );
}
