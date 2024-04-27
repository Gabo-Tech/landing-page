// components/HeroSection.tsx
import { A } from '@solidjs/router';

export default function HeroSection() {
  return (
    <div class="bg-stone-700 text-center py-12 md:py-24">
      <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-semibold text-white animate-wiggle animate-thrice animate-duration-1000 animate-delay-[2000ms]">
          ⏰ It's time to
        </h2>
        <h1 class="text-5xl leading-10 font-bold text-white mt-2 mb-4 animate-jump animate-thrice animate-duration-[8000ms] animate-delay-[2000ms] animate-ease-in-out animate-normal animate-fill-both">
          Launch Your Business with Premier Software Development 🚀
        </h1>
        <p class="text-md text-white mb-6 animate-fade-up">
          We are going to help you make it.
        </p>
        <A
          href="/contact"
          class="inline-block bg-slate-50 text-slate-950 text-sm font-extrabold px-5 py-2 rounded shadow-lg hover:bg-zinc-600 transition-colors duration-150 animate-fade-up"
        >
          GET STARTED NOW!
        </A>
        <div class="mt-8 transform transition duration-500 hover:scale-110">
          <img
            src="images/macmock.png"
            alt="Mac example"
            class="mx-auto animate-fade-up"
            width="492"
            style="max-width: 95%; width: auto; height: auto;"
          />
        </div>
      </div>
    </div>
  );
}
