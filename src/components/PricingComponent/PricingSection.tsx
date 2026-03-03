import PricingItem from './PricingItem';
import { For } from 'solid-js';

type PricingSectionContent = {
  eyebrow: string;
  title: string;
  description: string;
};

type PricingItemContent = {
  title: string;
  price: string;
  features: string[];
  link: string;
};

export default function PricingSection(props: {
  section: PricingSectionContent;
  items: PricingItemContent[];
}) {
  return (
    <section class="relative z-10 overflow-hidden bg-stone-800 text-white pb-12 pt-20 lg:pb-[90px] lg:pt-[120px]">
      <div class="container mx-auto">
        <div class="text-center mb-12">
          <span class="text-lg font-semibold text-primary animate-shake animate-twice">
            {props.section.eyebrow}
          </span>
          <h2 class="text-3xl font-bold text-dark animate-shake animate-twice animate-reverse">
            {props.section.title}
          </h2>
          <p class="text-base text-body-color dark:text-dark-6 animate-shake animate-twice">
            {props.section.description}
          </p>
        </div>
        <div class="flex flex-wrap justify-center">
          <For each={props.items}>
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
