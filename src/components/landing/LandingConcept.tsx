import { For } from 'solid-js';
import type { JSX } from 'solid-js';
import { A } from '@solidjs/router';
import CustomCursor from './CustomCursor';
import MouseAmbient from './MouseAmbient';
import { trackEvent } from '~/lib/analytics';
import LocalizedPrice from '~/components/pricing/LocalizedPrice';

const serviceItems = [
  {
    title: 'Conversion-Focused Websites',
    description: 'Company sites, portfolios, and landing pages built to convert visitors into qualified leads.',
    priceFrom: 3000,
    pricePrefix: 'Starting at',
  },
  {
    title: 'Ecommerce Development',
    description: 'Storefronts optimized for product discovery, speed, and checkout completion.',
    priceFrom: 5000,
    pricePrefix: 'Starting at',
  },
  {
    title: 'Custom Web Apps and MVPs',
    description: 'Scalable product foundations for startups and teams that need fast iteration.',
    priceFrom: 20000,
    pricePrefix: 'Starting at',
  },
  {
    title: 'SEO and Performance Optimization',
    description: 'Technical improvements that increase visibility, page speed, and conversion quality.',
    priceFrom: 2500,
    pricePrefix: 'Starting at',
  },
  {
    title: 'Maintenance and Growth Support',
    description: 'Long-term updates, fixes, and feature development after launch.',
    priceFrom: 300,
    pricePrefix: 'From',
    period: 'month' as const,
  },
];

const pricingItems = [
  { label: 'Websites', fromChf: 3000, typicalFromChf: 6000, typicalToChf: 15000 },
  { label: 'Ecommerce', fromChf: 5000, typicalFromChf: 10000, typicalToChf: 30000 },
  { label: 'Custom Web Apps / MVPs', fromChf: 20000, typicalFromChf: 30000, typicalToChf: 90000 },
  { label: 'SEO and Performance', fromChf: 2500, typicalFromChf: 4000, typicalToChf: 12000 },
  { label: 'Maintenance', fromChf: 300, typicalFromChf: 800, typicalToChf: 2500, period: 'month' as const },
];

const caseStudies = [
  {
    title: 'Consulting Personal Brand Website',
    challenge: 'High traffic but weak conversion into qualified calls.',
    solution: 'Reworked content hierarchy, CTA placement, and page speed.',
    result: 'Higher booking intent and clearer qualification before the first call.',
  },
  {
    title: 'Service Business Website Rebuild',
    challenge: 'Outdated UX and low trust from first-time visitors.',
    solution: 'Modernized UI, tightened messaging, and improved mobile UX.',
    result: 'Stronger first-impression trust and a clearer path from visit to inquiry.',
  },
  {
    title: 'Confidential Startup MVP',
    challenge: 'Need to ship quickly without accumulating technical debt.',
    solution: 'Built milestone-based MVP with scalable architecture.',
    result: 'Faster launch decisions and smoother iteration after release.',
  },
];

const processSteps = [
  'Discovery',
  'Strategy and Scope',
  'Design and Build',
  'QA and Launch',
  'Post-Launch Growth',
];

const differentiators = [
  'Outcome-driven delivery',
  'Strategy plus execution in one team',
  'Fast, direct communication',
  'Built for scale, not quick hacks',
  'Conversion-aware development',
  'Flexible collaboration models',
];

const stackItems = [
  'TypeScript',
  'SolidStart',
  'React',
  'Angular',
  'Svelte',
  'Vue',
  'Astro',
  'Alpine.js',
  'Node.js',
  'Express',
  'Tailwind CSS',
  'Tauri',
  'React Native',
  'Vercel',
];

const faqItems = [
  {
    q: 'How much does a project usually cost?',
    a: 'Most websites are CHF 6,000-15,000, ecommerce projects are CHF 10,000-30,000, and custom apps usually begin at CHF 30,000 depending on scope.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'Most websites are completed in 3-8 weeks. More complex ecommerce and app builds usually take 8-16+ weeks.',
  },
  {
    q: 'Do you provide design, development, and SEO?',
    a: 'Yes. Engagements can include strategy, UX direction, development, technical SEO, and post-launch optimization.',
  },
  {
    q: 'What does communication look like during the project?',
    a: 'You get direct communication, milestone updates, and clear weekly progress so scope and delivery stay predictable.',
  },
  {
    q: 'Do you work with clients worldwide?',
    a: 'Yes. Delivery is remote-first with clear milestones and regular updates.',
  },
  {
    q: 'Will I own the code and assets?',
    a: 'Yes. You fully own agreed deliverables after final payment.',
  },
  {
    q: 'Do you offer maintenance after launch?',
    a: 'Yes. Ongoing maintenance and growth support are available through monthly retainers.',
  },
  {
    q: 'Can we start with a smaller phase first?',
    a: 'Yes. Many engagements begin with a focused discovery phase or MVP milestone and expand from there.',
  },
];

function BookCallButton(props: { text: string; primary?: boolean; placement?: string }): JSX.Element {
  return (
    <a
      href="mailto:sendmessage@gabo.email"
      class={props.primary ? 'lp-button-primary' : 'lp-button-secondary'}
      aria-label={props.text}
      onClick={() =>
        trackEvent('contact_email_click', {
          placement: props.placement ?? 'unknown',
        })
      }
    >
      {props.text}
    </a>
  );
}

export default function LandingConcept(): JSX.Element {
  return (
    <main class="text-left lp-ambient">
      <MouseAmbient />
      <CustomCursor />

      <section class="lp-section lp-section-priority lp-noise-bg border-b border-border">
        <div class="lp-container">
          <p class="text-sm uppercase tracking-[0.22em] text-muted">Boutique Growth and Development Partner</p>
          <h1 class="mt-3 text-[clamp(2rem,5vw,4.8rem)] font-semibold leading-[1.08] tracking-tight max-w-5xl">
            We build websites and web apps that turn traffic into qualified leads.
          </h1>
          <p class="lp-subheading">
            Strategy, UX, and development aligned to one goal: measurable growth. You get clear scope, direct
            communication, and delivery built for long-term performance.
          </p>
          <div class="mt-6 flex flex-wrap gap-2 text-xs uppercase tracking-[0.16em] text-muted">
            <span class="rounded-full border border-border px-3 py-1">Conversion-first delivery</span>
            <span class="rounded-full border border-border px-3 py-1">Performance and SEO focused</span>
            <span class="rounded-full border border-border px-3 py-1">Senior-level execution</span>
          </div>
          <div class="mt-7 flex flex-wrap items-center gap-3 lp-mobile-cta-group">
            <A href="/contact" class="lp-button-primary">
              Get pricing and proposal ->
            </A>
            <a href="#services" class="lp-button-secondary">
              View services
            </a>
          </div>
          <p class="mt-3 text-sm text-muted">
            Expect a response within 48 hours. No obligation. Remote collaboration worldwide.
          </p>
          <div class="mt-5 grid gap-3 sm:grid-cols-3">
            <div class="lp-quick-price-card rounded-md border border-border bg-card p-3">
              <p class="text-xs uppercase tracking-[0.12em] text-muted">Websites</p>
              <p class="mt-1 text-sm font-semibold">
                From <LocalizedPrice fromChf={3000} />
              </p>
            </div>
            <div class="lp-quick-price-card rounded-md border border-border bg-card p-3">
              <p class="text-xs uppercase tracking-[0.12em] text-muted">Ecommerce</p>
              <p class="mt-1 text-sm font-semibold">
                From <LocalizedPrice fromChf={5000} />
              </p>
            </div>
            <div class="lp-quick-price-card rounded-md border border-border bg-card p-3">
              <p class="text-xs uppercase tracking-[0.12em] text-muted">Custom apps</p>
              <p class="mt-1 text-sm font-semibold">
                From <LocalizedPrice fromChf={20000} />
              </p>
            </div>
          </div>
          <p class="mt-3 text-sm text-muted">
            Need exact numbers? Email{' '}
            <a class="underline hover:no-underline" href="mailto:sendmessage@gabo.email">
              sendmessage@gabo.email
            </a>{' '}
            or use the contact page to receive a tailored estimate.
          </p>
        </div>
      </section>

      <section class="lp-section lp-section-pricing border-b border-border">
        <div class="lp-container">
          <h2 class="lp-heading">Trusted feedback from real professional collaborations</h2>
          <p class="lp-subheading">Trusted by founders and technical leaders for speed, quality, and execution.</p>
          <div class="mt-4 flex flex-wrap gap-2 text-xs text-muted">
            <a href="https://arturorodes.com" target="_blank" rel="noopener noreferrer" class="rounded-full border border-border px-3 py-1 hover:text-fg">
              Source: arturorodes.com
            </a>
            <a href="https://www.linkedin.com/company/gabo-tech" target="_blank" rel="noopener noreferrer" class="rounded-full border border-border px-3 py-1 hover:text-fg">
              Verified LinkedIn recommendations
            </a>
          </div>
          <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <article class="lp-card">
              <p class="text-base leading-relaxed">
                "GABO is one of the very few people I strongly recommend in tech. His work quality is excellent,
                his execution speed is impressive, and he consistently overdelivers."
              </p>
              <p class="mt-4 text-sm font-semibold">Arturo Rodes</p>
              <p class="text-sm text-muted">
                Salary Negotiation Expert ·{' '}
                <a
                  href="https://arturorodes.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-fg hover:underline"
                >
                  arturorodes.com
                </a>
              </p>
            </article>
            <article class="lp-card">
              <p class="text-base leading-relaxed">
                "Working with GABO was a pleasure. He is dedicated, proactive, and always focused on improving
                outcomes with a long-term mindset."
              </p>
              <p class="mt-4 text-sm font-semibold">Ciro Vivacqua</p>
              <p class="text-sm text-muted">CTO / Enterprise Architect</p>
            </article>
          </div>
        </div>
      </section>

      <section class="lp-section border-b border-border" id="services">
        <div class="lp-container">
          <div class="2xl:grid 2xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] 2xl:gap-12 2xl:items-end">
            <h2 class="lp-heading">Services that combine growth strategy, UX, and engineering.</h2>
            <p class="lp-subheading 2xl:mt-0 2xl:max-w-none">
              Each engagement is scoped around measurable impact, not generic deliverables.
            </p>
          </div>
          <div class="mt-8 grid gap-4 md:grid-cols-2">
            <For each={serviceItems}>
              {(item) => (
                <article class="lp-card">
                  <h3 class="text-lg font-semibold">{item.title}</h3>
                  <p class="mt-2 text-sm text-muted leading-relaxed">{item.description}</p>
                  <p class="mt-4 text-sm font-semibold">
                    <LocalizedPrice fromChf={item.priceFrom} prefix={item.pricePrefix} period={item.period} />
                  </p>
                </article>
              )}
            </For>
          </div>
          <p class="mt-6 text-sm text-muted">
            Core stack: JavaScript/TypeScript, React, Angular, Node.js, Express, SolidStart, Tauri, and React
            Native. Also experienced with Python and PHP.
          </p>
          <div class="mt-7 rounded-md border border-border bg-card p-5">
            <p class="text-xs uppercase tracking-[0.14em] text-muted">Start Here</p>
            <h3 class="mt-2 text-lg font-semibold">Discovery Sprint</h3>
            <p class="mt-2 text-sm text-muted leading-relaxed">
              A focused kickoff to define goals, scope, architecture, and milestones before full execution.
            </p>
            <p class="mt-3 text-sm font-semibold">
              <LocalizedPrice fromChf={1500} prefix="From" />
            </p>
            <div class="mt-4">
              <BookCallButton text="Email us" primary placement="discovery_sprint" />
            </div>
          </div>
        </div>
      </section>

      <section class="lp-section border-b border-border">
        <div class="lp-container">
          <div class="2xl:grid 2xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] 2xl:gap-12 2xl:items-end">
            <h2 class="lp-heading">Clear pricing guidance before we talk.</h2>
            <p class="lp-subheading 2xl:mt-0 2xl:max-w-none">
              Every project is unique, but these ranges help qualify scope early and keep planning transparent.
            </p>
          </div>
          <div class="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
            <For each={pricingItems}>
              {(item) => (
                <article class="lp-card lp-pricing-card">
                  <h3 class="text-base font-semibold">{item.label}</h3>
                  <p class="mt-3 text-sm">
                    From:{' '}
                    <span class="font-semibold">
                      <LocalizedPrice fromChf={item.fromChf} period={item.period} />
                    </span>
                  </p>
                  <p class="mt-1 text-sm text-muted">
                    Most projects:{' '}
                    <LocalizedPrice fromChf={item.typicalFromChf} toChf={item.typicalToChf} period={item.period} />
                  </p>
                </article>
              )}
            </For>
          </div>
          <p class="mt-5 text-sm text-muted">
            Final pricing depends on scope, integrations, and timeline. A proposal with clear deliverables is
            shared after discovery.
          </p>
        </div>
      </section>

      <section class="lp-section border-b border-border">
        <div class="lp-container">
          <div class="2xl:grid 2xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] 2xl:gap-12 2xl:items-end">
            <h2 class="lp-heading">Selected projects and outcomes.</h2>
            <p class="lp-subheading 2xl:mt-0 2xl:max-w-none">
              Examples of how strategy and implementation translate into clearer business outcomes.
            </p>
          </div>
          <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <For each={caseStudies}>
              {(caseItem) => (
                <article class="lp-card">
                  <h3 class="text-base font-semibold">{caseItem.title}</h3>
                  <p class="mt-3 text-sm text-muted"><span class="font-semibold text-fg">Challenge:</span> {caseItem.challenge}</p>
                  <p class="mt-2 text-sm text-muted"><span class="font-semibold text-fg">Solution:</span> {caseItem.solution}</p>
                  <p class="mt-2 text-sm text-muted"><span class="font-semibold text-fg">Result:</span> {caseItem.result}</p>
                </article>
              )}
            </For>
          </div>
          <div class="mt-6">
            <A href="/work" class="lp-button-secondary">View selected work</A>
          </div>
        </div>
      </section>

      <section class="lp-section border-b border-border">
        <div class="lp-container">
          <h2 class="lp-heading">A clear process from idea to launch.</h2>
          <p class="lp-subheading">Clear checkpoints keep your project predictable, transparent, and moving.</p>
          <div class="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            <For each={processSteps}>
              {(step, index) => (
                <article class="lp-card">
                  <p class="text-xs uppercase tracking-[0.18em] text-muted">Step {index() + 1}</p>
                  <h3 class="mt-2 text-base font-semibold">{step}</h3>
                </article>
              )}
            </For>
          </div>
          <p class="mt-5 text-sm text-muted">Weekly updates • Transparent milestones • Direct communication</p>
        </div>
      </section>

      <section class="lp-section border-b border-border">
        <div class="lp-container">
          <h2 class="lp-heading">Why clients choose to work with us.</h2>
          <p class="lp-subheading">
            You get one team for strategy and execution, with clear accountability from planning to delivery.
          </p>
          <div class="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            <For each={differentiators}>
              {(item) => <div class="lp-card text-sm font-medium">{item}</div>}
            </For>
          </div>
        </div>
      </section>

      <section class="lp-section border-b border-border">
        <div class="lp-container">
          <h2 class="lp-heading">Technology that fits your goals.</h2>
          <p class="lp-subheading">Tools are selected for business fit, maintainability, and scale.</p>
          <div class="mt-6">
            <p class="text-xs uppercase tracking-[0.15em] text-muted">Selected tools and stack</p>
            <div class="mt-3 flex flex-wrap gap-2.5 2xl:max-w-5xl">
              <For each={stackItems}>
                {(item) => (
                  <span class="rounded-full border border-border/70 bg-muted-2/55 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.11em] text-fg/80 transition-colors duration-200 hover:border-fg/25 hover:bg-card/80 hover:text-fg">
                    {item}
                  </span>
                )}
              </For>
            </div>
          </div>
          <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <article class="lp-card">
              <h3 class="text-base font-semibold">Frontend</h3>
              <p class="mt-2 text-sm text-muted">React, Angular, SolidStart, JavaScript, TypeScript</p>
            </article>
            <article class="lp-card">
              <h3 class="text-base font-semibold">Backend</h3>
              <p class="mt-2 text-sm text-muted">Node.js, Express, API integrations, auth, and automation</p>
            </article>
            <article class="lp-card">
              <h3 class="text-base font-semibold">Mobile and Desktop</h3>
              <p class="mt-2 text-sm text-muted">React Native and Tauri</p>
            </article>
            <article class="lp-card">
              <h3 class="text-base font-semibold">Additional Experience</h3>
              <p class="mt-2 text-sm text-muted">Python and PHP</p>
            </article>
          </div>
        </div>
      </section>

      <section class="lp-section border-b border-border">
        <div class="lp-container">
          <h2 class="lp-heading">Frequently asked questions</h2>
          <div class="mt-8 space-y-3">
            <For each={faqItems}>
              {(item) => (
                <details
                  class="lp-card faq-item"
                  onToggle={(event) => {
                    const el = event.currentTarget;
                    if (el.open) {
                      trackEvent('faq_open', { question: item.q });
                    }
                  }}
                >
                  <summary class="faq-summary cursor-pointer text-sm font-semibold">
                    <span>{item.q}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.8"
                      class="faq-chevron h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </summary>
                  <div class="faq-answer">
                    <p class="pt-3 text-sm text-muted leading-relaxed">{item.a}</p>
                  </div>
                </details>
              )}
            </For>
          </div>
        </div>
      </section>

      <section class="lp-section lp-section-priority border-b border-border">
        <div class="lp-container">
          <h2 class="lp-heading">Ready for a clear scope, clear price, and clear next step?</h2>
          <p class="lp-subheading">Share your goals and receive a practical proposal with timeline and pricing guidance.</p>
          <div class="mt-7 flex flex-wrap items-center gap-3 lp-mobile-cta-group">
            <BookCallButton text="Email us" primary placement="final_cta" />
            <A class="lp-button-secondary" href="/contact">
              Open contact options
            </A>
          </div>
          <p class="mt-3 text-sm text-muted">
            Contact: sendmessage@gabo.email • Response within 48 hours • Proposal after discovery
          </p>
          <div class="mt-4 lp-contact-strip">
            <a href="mailto:sendmessage@gabo.email" class="lp-contact-chip">sendmessage@gabo.email</a>
            <A href="/contact" class="lp-contact-chip">Open contact page</A>
          </div>
        </div>
      </section>

      <div class="mobile-sticky-cta border-t border-border bg-bg/92 backdrop-blur sm:hidden">
        <div class="lp-container py-3">
          <BookCallButton text="Get pricing by email" primary placement="mobile_sticky" />
          <p class="mt-2 text-center text-xs text-muted">Response within 48 hours</p>
          <p class="mt-1 text-center text-[11px] uppercase tracking-[0.12em] text-muted">
            Trusted by founders and technical leaders
          </p>
        </div>
      </div>
    </main>
  );
}
