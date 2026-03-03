// components/HeroSection.tsx
import { A } from '@solidjs/router';

type HeroContent = {
  kicker: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
};

export default function HeroSection(props: { content: HeroContent }) {
  const content = () => props.content;

  return (
    <div class="bg-stone-700 text-center py-12 md:py-24">
      <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-semibold text-white animate-wiggle animate-thrice animate-duration-1000 animate-delay-[2000ms]">
          {content().kicker}
        </h2>
        <h1 class="text-5xl leading-10 font-bold text-white mt-2 mb-4 animate-jump animate-thrice animate-duration-[8000ms] animate-delay-[2000ms] animate-ease-in-out animate-normal animate-fill-both">
          {content().title}
        </h1>
        <p class="text-md text-white mb-6 animate-fade-up">
          {content().description}
        </p>
        <A
          href={content().ctaHref}
          class="inline-block bg-slate-50 text-slate-950 text-sm font-extrabold px-5 py-2 rounded shadow-lg hover:bg-zinc-600 transition-colors duration-150 animate-fade-up"
        >
          {content().ctaLabel}
        </A>
        <div class="mt-8 transform transition duration-500 hover:scale-110">
          <img
            src={content().imageSrc}
            alt={content().imageAlt}
            class="mx-auto animate-fade-up"
            width="492"
            style="max-width: 95%; width: auto; height: auto;"
          />
        </div>
      </div>
    </div>
  );
}
