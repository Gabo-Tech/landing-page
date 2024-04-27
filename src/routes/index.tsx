import BrandCarousel from '~/components/BrandCarousel/BrandCarousel';
import HeroSection from '~/components/HeroComponent/HeroSection';
import partnersLogos from '../data/partnerLogos.json';
import customersLogos from '../data/customersLogos.json';
import features from '../data/featuresData.json';
import features1 from '../data/featuresData1.json';

import LearnMoreSection from '~/components/LearnMoreComponent/LearnMoreSection';
import FeatureSection from '~/components/FeatureComponent/FeatureSection';
import PricingSection from '~/components/PricingComponent/PricingSection';

export default function Home() {
  return (
    <main class="text-center mx-auto text-gray-700">
      <HeroSection />
      <BrandCarousel logos={partnersLogos} type="p" />
      <LearnMoreSection />
      <FeatureSection
        bgColor="stone-800"
        imageUrl="images/Screenshot-from-2022-11-21-20-08-06.png"
        alt="iPad App Mock"
        imagePosition="left"
        title="How we can help"
        paragraph="Here in GABO we can help you design not only your software but also your business, and give you advise about marketing or entrepreneurship in general. This is how we work."
        features={features.features}
      />
      <FeatureSection
        bgColor="stone-700"
        imageUrl="images/mobile-black.png"
        alt="Smartphone App Mock"
        imagePosition="right"
        title="We make a difference"
        features={features1.features}
      />
      <BrandCarousel logos={customersLogos} type="c" />
      <PricingSection />
    </main>
  );
}
