import type { JSX } from 'solid-js';
import { A } from '@solidjs/router';

export default function EcommerceDevelopment(): JSX.Element {
  return (
    <main class="w-full px-4 py-12 lp-ambient">
      <div class="lp-container max-w-4xl space-y-6">
        <section class="lp-card">
          <h1 class="text-3xl sm:text-4xl font-semibold tracking-tight">Ecommerce Development Services</h1>
          <p class="mt-3 text-sm text-muted">
            Ecommerce experiences focused on product clarity, checkout completion, and operational scalability.
          </p>
        </section>
        <section class="lp-card">
          <h2 class="text-lg font-semibold">What’s included</h2>
          <ul class="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
            <li>Store architecture and conversion-aware UX</li>
            <li>Performance optimization for listing, product, and checkout pages</li>
            <li>Payment/shipping integrations and operational workflows</li>
            <li>Post-launch measurement and improvement roadmap</li>
          </ul>
          <p class="mt-4 text-sm font-semibold">Typical engagement: CHF 10,000-30,000</p>
          <p class="mt-2 text-sm text-muted">Best for teams that need fewer checkout drop-offs and cleaner growth operations.</p>
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
