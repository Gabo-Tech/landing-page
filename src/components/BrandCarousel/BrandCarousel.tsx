import { For } from 'solid-js';
import './BrandCarousel.css';

type BrandCarouselProps = {
  logos: Array<{ href: string; src: string; alt: string }>;
  type: 'p' | 'c';
};

export default function BrandCarousel(props: BrandCarouselProps) {
  const title = () => (props.type === 'p' ? 'PARTNERS' : 'CUSTOMERS');

  return (
    <div class="bg-stone-950 text-white text-center py-12">
      <h2 class="text-2xl font-semibold mb-4">SOME OF OUR {title()}</h2>
      <div class="marquee-window">
        <div class="marquee-track">
          <For each={props.logos}>
            {logo => (
              <div class="logo-item">
                <a href={logo.href} target="_blank" rel="noopener noreferrer">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="eager"
                    decoding="async"
                    class="h-12 mx-4"
                  />
                </a>
              </div>
            )}
          </For>
          <For each={props.logos}>
            {logo => (
              <div class="logo-item" aria-hidden="true">
                <a
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabindex="-1"
                  aria-hidden="true"
                >
                  <img
                    src={logo.src}
                    alt=""
                    loading="eager"
                    decoding="async"
                    class="h-12 mx-4"
                  />
                </a>
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
}
