import { For, Show } from 'solid-js';
import type { JSX } from 'solid-js';
import { A } from '@solidjs/router';
import { ownProducts, type OwnProduct } from '~/data/ownProducts';

function ProductLink(props: { product: OwnProduct }): JSX.Element {
  return (
    <a
      href={props.product.href}
      target="_blank"
      rel="noopener"
      class="inline-flex items-center gap-1.5 text-sm font-semibold text-fg underline-offset-4 hover:underline"
    >
      <span class="sr-only">Visit {props.product.name} at </span>
      {props.product.host}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        class="h-3.5 w-3.5 shrink-0"
        aria-hidden="true"
      >
        <path d="M7 17 17 7" />
        <path d="M9 7h8v8" />
      </svg>
    </a>
  );
}

function FullProducts(): JSX.Element {
  return (
    <section
      id="products"
      class="scroll-mt-6 space-y-4"
      aria-labelledby="our-products-heading"
    >
      <div>
        <p class="text-xs uppercase tracking-[0.16em] text-muted">
          Built and operated by GABO
        </p>
        <h2
          id="our-products-heading"
          class="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          Our products
        </h2>
        <p class="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          Live software we design, ship, and keep running. The same craft we
          bring to client work.
        </p>
      </div>
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <For each={ownProducts}>
          {(product, index) => (
            <article
              class="lp-card flex flex-col"
              classList={{
                'xl:col-span-2': index() < 3,
                'xl:col-span-3': index() >= 3,
              }}
            >
              <h3 class="text-lg font-semibold">{product.name}</h3>
              <p class="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {product.description}
              </p>
              <div class="mt-4">
                <ProductLink product={product} />
              </div>
            </article>
          )}
        </For>
      </div>
    </section>
  );
}

function CompactProducts(): JSX.Element {
  return (
    <section
      class="lp-section border-b border-border"
      aria-labelledby="home-products-heading"
    >
      <div class="lp-container">
        <div class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="home-products-heading" class="lp-heading">
              Our products
            </h2>
            <p class="lp-subheading">
              A short list of software we run ourselves, alongside the client
              work above.
            </p>
          </div>
          <A
            href="/work#products"
            class="lp-button-secondary w-full shrink-0 sm:w-auto"
          >
            View on the Work page
          </A>
        </div>
        <div class="lp-card lp-card-flush mt-8 divide-y divide-border">
          <For each={ownProducts}>
            {product => (
              <article class="grid gap-2 px-5 py-4 lg:grid-cols-[12rem_minmax(0,1fr)_auto] lg:items-center lg:gap-8 lg:px-6">
                <h3 class="text-base font-semibold">{product.name}</h3>
                <p class="text-sm leading-relaxed text-muted">
                  {product.description}
                </p>
                <ProductLink product={product} />
              </article>
            )}
          </For>
        </div>
      </div>
    </section>
  );
}

export default function OwnProductsSection(props: {
  variant: 'full' | 'compact';
}): JSX.Element {
  return (
    <Show when={props.variant === 'full'} fallback={<CompactProducts />}>
      <FullProducts />
    </Show>
  );
}
