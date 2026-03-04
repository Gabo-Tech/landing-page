import { A } from '@solidjs/router';
import type { JSX } from 'solid-js';

export default function NotFound(): JSX.Element {
  return (
    <main class="w-full px-4 py-16 lp-ambient">
      <section class="lp-container max-w-3xl">
        <div class="lp-card text-center">
          <p class="text-xs uppercase tracking-[0.14em] text-muted">Error 404</p>
          <h1 class="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight">Page not found</h1>
          <p class="mt-4 text-sm sm:text-base text-muted">
            The page you requested does not exist or may have moved. Continue to core sections below.
          </p>
          <div class="mt-7 flex flex-wrap justify-center gap-3">
            <A href="/" class="lp-button-primary">
              Back to homepage
            </A>
            <A href="/services" class="lp-button-secondary">
              Explore services
            </A>
            <a href="mailto:sendmessage@gabo.email" class="lp-button-secondary">
              Email us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
