import { A } from '@solidjs/router';

const LearnMoreSection = () => {
  return (
    <div class="bg-stone-700 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="md:col-span-2 animate-jump-in">
            <h2 class="text-xl font-semibold">Do you have a website?</h2>
            <p class="mt-4">
              A Mobile App? E-commerce? Personal Portfolio or Business Land Page
              with CMS? A SaaS? Or maybe a PaaS? Or would you like to have one,
              but you don’t have the budget to get a team of developers bringing
              to life your project?
              <br />
              We can take care of all your software development needs. We'll
              help you start building your business!
            </p>
            <A
              href="/contact"
              class="inline-block mt-4 bg-slate-50 text-slate-950 font-extrabold px-5 py-2 rounded shadow hover:bg-blue-600 transition-colors"
            >
              Get started now ❯
            </A>
          </div>
          <div class="md:col-span-1 flex justify-center animate-jump-in">
            <img
              src="images/Screenshot-from-2022-11-21-19-47-23.png"
              alt="Mock Up Responsiveness"
              class="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMoreSection;
