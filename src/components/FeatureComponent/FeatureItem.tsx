type FeatureItemProps = {
  icon: string;
  alt: string;
  title: string;
  description: string;
};

const FeatureItem = (props: FeatureItemProps) => {
  return (
    <li class="flex items-start p-5">
      <img
        src={props.icon}
        alt={props.alt}
        class="h-14 w-14 mr-4 border-2 p-2"
      />
      <div class="m-auto">
        <div class="font-bold underline text-lg p-2">{props.title}</div>
        <p>{props.description}</p>
      </div>
    </li>
  );
};

export default FeatureItem;
