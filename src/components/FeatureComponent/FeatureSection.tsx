import FeatureList from './FeatureList';
import './FeatureSection.css';

type FeatureSectionProps = {
  bgColor: string;
  imageUrl: string;
  alt: string;
  imagePosition: 'left' | 'right';
  title: string;
  paragraph?: string;
  features: Array<{
    icon: string;
    alt: string;
    title: string;
    description: string;
  }>;
};

const FeatureSection = (props: FeatureSectionProps) => {
  return (
    <div class={`bg-${props.bgColor} text-white py-12 pb-0`}>
      <div class="container mx-auto px-4">
        <div
          class={`flex flex-col ${props.imagePosition === 'right' ? 'md:flex-row-reverse animate-fade-left' : 'md:flex-row animate-fade-right'}`}
        >
          <div class="md:w-1/2 half-height-container">
            <img
              src={props.imageUrl}
              alt={props.alt}
              class="max-w-full h-auto"
            />
          </div>
          <div class="md:w-1/2 space-y-4">
            <h2 class="text-2xl pt-5 font-extrabold">{props.title}</h2>
            <p>{props.paragraph}</p>
            <FeatureList features={props.features} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
