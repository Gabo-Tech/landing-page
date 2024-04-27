import { For } from 'solid-js';
import FeatureItem from './FeatureItem';

type FeatureListProps = {
  features: Array<{
    icon: string;
    alt: string;
    title: string;
    description: string;
  }>;
};

const FeatureList = (props: FeatureListProps) => {
  return (
    <ul>
      <For each={props.features}>
        {feature => (
          <FeatureItem
            icon={feature.icon}
            alt={feature.alt}
            title={feature.title}
            description={feature.description}
          />
        )}
      </For>
    </ul>
  );
};

export default FeatureList;
