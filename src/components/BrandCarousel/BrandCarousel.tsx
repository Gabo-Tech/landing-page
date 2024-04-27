import { For } from 'solid-js';
import './BrandCarousel.css';

type BrandCarouselProps = {
  logos: Array<{ href: string; src: string; alt: string }>;
  type: 'p' | 'c';
};

export default function BrandCarousel(props: BrandCarouselProps) {
  const title = () => (props.type === 'p' ? 'PARTNERS' : 'CUSTOMERS');
  const logosDuplicated = [
    ...props.logos,
    ...props.logos,
    ...props.logos,
    ...props.logos,
    ...props.logos,
    ...props.logos,
  ];

  return (
    <div class="bg-stone-950 text-white text-center py-12">
      <h2 class="text-2xl font-semibold mb-4">SOME OF OUR {title()}</h2>
      <div class="overflow-hidden relative">
        <div class="flex-container animate-marquee">
          <For each={logosDuplicated}>
            {logo => (
              <div class="logo-item">
                <a href={logo.href} target="_blank" rel="noopener noreferrer">
                  <img src={logo.src} alt={logo.alt} class="h-12 mx-4" />
                </a>
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
}
