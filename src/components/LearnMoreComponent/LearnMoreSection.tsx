import { A } from '@solidjs/router';

type LearnMoreContent = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
};

const LearnMoreSection = (props: { content: LearnMoreContent }) => {
  const content = () => props.content;

  return (
    <div class="bg-stone-700 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="md:col-span-2 animate-jump-in">
            <h2 class="text-xl font-semibold">{content().title}</h2>
            <p class="mt-4">
              {content().description}
            </p>
            <A
              href={content().ctaHref}
              class="inline-block mt-4 bg-slate-50 text-slate-950 font-extrabold px-5 py-2 rounded shadow hover:bg-blue-600 transition-colors"
            >
              {content().ctaLabel}
            </A>
          </div>
          <div class="md:col-span-1 flex justify-center animate-jump-in">
            <img
              src={content().imageSrc}
              alt={content().imageAlt}
              loading="lazy"
              decoding="async"
              class="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMoreSection;
