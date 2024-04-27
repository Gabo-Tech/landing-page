import { A } from '@solidjs/router';
import { For } from 'solid-js';

type PricingItemProps = {
  title: string;
  price: string;
  features: string[];
  link: string;
};

export default function PricingItem(props: PricingItemProps) {
  return (
    <A href={props.link} class="w-full md:w-1/2 lg:w-1/3 px-4">
      <div class="relative z-10 mb-10 overflow-hidden rounded-[10px] border-2 border-stroke bg-stone-900 p-8 shadow-pricing dark:border-dark-3 dark:bg-dark-2 transform transition duration-500 hover:scale-110">
        <h3 class="text-lg font-semibold text-primary">{props.title}</h3>
        <strong class="text-[42px] font-bold text-dark">{props.price}</strong>
        <ul class="mt-4">
          <For each={props.features}>
            {feature => (
              <li class="text-base text-body-color dark:text-dark-6">
                {feature}
              </li>
            )}
          </For>
        </ul>
      </div>
    </A>
  );
}
