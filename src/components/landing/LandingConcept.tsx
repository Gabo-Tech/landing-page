import { For } from 'solid-js';
import type { JSX } from 'solid-js';
import { A } from '@solidjs/router';
import CustomCursor from './CustomCursor';
import MouseAmbient from './MouseAmbient';
import { trackEvent } from '~/lib/analytics';

const serviceItems = [
  {
    title: 'Conversion-Focused Websites',
    description: 'Company sites, portfolios, and landing pages built to convert visitors into qualified leads.',
    price: 'Starting at CHF 3,000',
  },
  {
    title: 'Ecommerce Development',
    description: 'Storefronts optimized for product discovery, speed, and checkout completion.',
    price: 'Starting at CHF 5,000',
  },
  {
    title: 'Custom Web Apps and MVPs',
    description: 'Scalable product foundations for startups and teams that need fast iteration.',
    price: 'Starting at CHF 20,000',
  },
  {
    title: 'SEO and Performance Optimization',
    description: 'Technical improvements that increase visibility, page speed, and conversion quality.',
    price: 'Starting at CHF 2,500',
  },
  {
    title: 'Maintenance and Growth Support',
    description: 'Long-term updates, fixes, and feature development after launch.',
    price: 'From CHF 300/month',
  },
];

const pricingItems = [
  { label: 'Websites', from: 'CHF 3,000', typical: 'CHF 6,000-15,000' },
  { label: 'Ecommerce', from: 'CHF 5,000', typical: 'CHF 10,000-30,000' },
  { label: 'Custom Web Apps / MVPs', from: 'CHF 20,000', typical: 'CHF 30,000-90,000' },
  { label: 'SEO and Performance', from: 'CHF 2,500', typical: 'CHF 4,000-12,000' },
  { label: 'Maintenance', from: 'CHF 300/month', typical: 'CHF 800-2,500/month' },
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

      <section class="lp-section lp-noise-bg border-b border-border">
        <div class="lp-container">
          <p class="text-sm uppercase tracking-[0.22em] text-muted">Boutique Development Agency</p>
          <h1 class="mt-3 text-[clamp(2rem,5vw,4.8rem)] font-semibold leading-[1.08] tracking-tight max-w-5xl">
            Websites and web apps that turn visitors into customers.
          </h1>
          <p class="lp-subheading">
            Conversion-focused digital products for businesses, startups, and online stores.
            Built with clear scope, fast communication, and long-term maintainability.
          </p>
          <div class="mt-6 flex flex-wrap gap-2 text-xs uppercase tracking-[0.16em] text-muted">
            <span class="rounded-full border border-border px-3 py-1">Fast delivery</span>
            <span class="rounded-full border border-border px-3 py-1">Performance-first</span>
            <span class="rounded-full border border-border px-3 py-1">SEO-ready builds</span>
          </div>
          <div class="mt-7 flex flex-wrap items-center gap-3">
            <BookCallButton text="Email us" primary placement="hero" />
            <a href="#services" class="lp-button-secondary">
              View services
            </a>
          </div>
          <p class="mt-3 text-sm text-muted">Expect a response within 48 hours • No obligation • Worldwide remote collaboration</p>
          <div class="mt-5 grid gap-3 sm:grid-cols-3">
            <div class="rounded-md border border-border bg-card p-3">
              <p class="text-xs uppercase tracking-[0.12em] text-muted">Delivery</p>
              <p class="mt-1 text-sm font-semibold">Milestone-based delivery</p>
            </div>
            <div class="rounded-md border border-border bg-card p-3">
              <p class="text-xs uppercase tracking-[0.12em] text-muted">Performance</p>
              <p class="mt-1 text-sm font-semibold">SEO-ready and speed-focused</p>
            </div>
            <div class="rounded-md border border-border bg-card p-3">
              <p class="text-xs uppercase tracking-[0.12em] text-muted">Communication</p>
              <p class="mt-1 text-sm font-semibold">Direct updates, weekly checkpoints</p>
            </div>
          </div>
        </div>
      </section>

      <section class="lp-section border-b border-border">
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
                "Gabriel is one of the very few people I strongly recommend in tech. His work quality is excellent,
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
                "Working with Gabriel was a pleasure. He is dedicated, proactive, and always focused on improving
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
            <h2 class="lp-heading">Services built around business outcomes, not just code.</h2>
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
                  <p class="mt-4 text-sm font-semibold">{item.price}</p>
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
            <p class="mt-3 text-sm font-semibold">From CHF 1,500</p>
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
                <article class="lp-card">
                  <h3 class="text-base font-semibold">{item.label}</h3>
                  <p class="mt-3 text-sm">From: <span class="font-semibold">{item.from}</span></p>
                  <p class="mt-1 text-sm text-muted">Most projects: {item.typical}</p>
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
          <p class="lp-subheading">Senior-level execution with direct communication and long-term thinking.</p>
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

      <section class="lp-section border-b border-border">
        <div class="lp-container">
          <h2 class="lp-heading">Ready to build something that actually performs?</h2>
          <p class="lp-subheading">Email us to align goals, scope, and realistic next milestones.</p>
          <div class="mt-7 flex flex-wrap items-center gap-3">
            <BookCallButton text="Email us" primary placement="final_cta" />
            <A class="lp-button-secondary" href="/contact">
              Send project details
            </A>
          </div>
          <p class="mt-3 text-sm text-muted">Expect a response within 48 hours • Clear scope • Proposal after discovery</p>
        </div>
      </section>

      <div class="mobile-sticky-cta border-t border-border bg-bg/92 backdrop-blur sm:hidden">
        <div class="lp-container py-3">
          <BookCallButton text="Email us" primary placement="mobile_sticky" />
        </div>
      </div>
    </main>
  );
}
