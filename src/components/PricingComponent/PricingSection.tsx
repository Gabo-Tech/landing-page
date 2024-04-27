import PricingItem from './PricingItem';
import pricingDetails from '../../data/pricingDetails.json';
import { For } from 'solid-js';

export default function PricingSection() {
  return (
    <section class="relative z-10 overflow-hidden bg-stone-800 text-white pb-12 pt-20 lg:pb-[90px] lg:pt-[120px]">
      <div class="container mx-auto">
        <div class="text-center mb-12">
          <span class="text-lg font-semibold text-primary animate-shake animate-twice">
            Service Pricing Breakdown
          </span>
          <h2 class="text-3xl font-bold text-dark animate-shake animate-twice animate-reverse">
            Our Pricing Plan
          </h2>
          <p class="text-base text-body-color dark:text-dark-6 animate-shake animate-twice">
            Pick what suits best for you, if you don't find it contact us
            anyways, we might arrange something! 😉
          </p>
        </div>
        <div class="flex flex-wrap justify-center">
          <For each={pricingDetails}>
            {item => (
              <PricingItem
                title={item.title}
                price={item.price}
                features={item.features}
                link={item.link}
              />
            )}
          </For>
        </div>
      </div>
    </section>
  );
}
