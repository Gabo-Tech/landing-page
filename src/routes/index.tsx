import { createResource, lazy, Suspense } from 'solid-js';
import HeroSection from '~/components/HeroComponent/HeroSection';
import homeFallback from '../../content/home.json';
import partnersFallback from '../../content/partners.json';
import customersFallback from '../../content/customers.json';
import pricingFallback from '../../content/pricing.json';

const BrandCarousel = lazy(
  () => import('~/components/BrandCarousel/BrandCarousel'),
);
const LearnMoreSection = lazy(
  () => import('~/components/LearnMoreComponent/LearnMoreSection'),
);
const FeatureSection = lazy(
  () => import('~/components/FeatureComponent/FeatureSection'),
);
const PricingSection = lazy(
  () => import('~/components/PricingComponent/PricingSection'),
);

async function fetchSection<T>(section: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`/api/content/${section}`);
    if (!response.ok) return fallback;
    const payload = await response.json();
    return (payload?.data as T) ?? fallback;
  } catch {
    return fallback;
  }
}

export default function Home() {
  const [homeData] = createResource(() => fetchSection('home', homeFallback));
  const [partnersData] = createResource(() =>
    fetchSection('partners', partnersFallback),
  );
  const [customersData] = createResource(() =>
    fetchSection('customers', customersFallback),
  );
  const [pricingData] = createResource(() =>
    fetchSection('pricing', pricingFallback),
  );

  return (
    <main class="text-center mx-auto text-gray-700">
      <HeroSection content={homeData()?.hero ?? homeFallback.hero} />
      <Suspense fallback={<div class="py-10">Loading content...</div>}>
        <BrandCarousel logos={partnersData() ?? partnersFallback} type="p" />
        <LearnMoreSection
          content={homeData()?.learnMore ?? homeFallback.learnMore}
        />
        <FeatureSection {...(homeData()?.featureSections?.[0] ?? homeFallback.featureSections[0])} />
        <FeatureSection {...(homeData()?.featureSections?.[1] ?? homeFallback.featureSections[1])} />
        <BrandCarousel logos={customersData() ?? customersFallback} type="c" />
        <PricingSection
          section={pricingData()?.section ?? pricingFallback.section}
          items={pricingData()?.items ?? pricingFallback.items}
        />
      </Suspense>
    </main>
  );
}
