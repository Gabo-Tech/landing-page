import type { JSX } from 'solid-js';
import { A } from '@solidjs/router';

export default function PerformanceSeo(): JSX.Element {
  return (
    <main class="w-full px-4 py-12 lp-ambient">
      <div class="lp-container max-w-4xl space-y-6">
        <section class="lp-card">
          <h1 class="text-3xl sm:text-4xl font-semibold tracking-tight">Performance and SEO Services</h1>
          <p class="mt-3 text-sm text-muted">
            Technical SEO and performance improvements designed to increase discoverability, speed, and conversion quality.
          </p>
        </section>
        <section class="lp-card">
          <h2 class="text-lg font-semibold">What’s included</h2>
          <ul class="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
            <li>Core Web Vitals and render-path optimization</li>
            <li>Technical SEO audit and implementation fixes</li>
            <li>Content structure and internal linking improvements</li>
            <li>Prioritized roadmap for measurable gains</li>
          </ul>
          <p class="mt-4 text-sm font-semibold">Typical engagement: CHF 4,000-12,000</p>
          <p class="mt-2 text-sm text-muted">Best for websites with strong potential traffic but weak technical foundations.</p>
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
