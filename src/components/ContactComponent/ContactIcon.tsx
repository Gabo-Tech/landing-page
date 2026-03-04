import { JSX } from 'solid-js';
import { trackEvent } from '~/lib/analytics';

export default function ContactIcon(props: {
  href: string;
  icon: {
    viewBox: string | undefined;
    path: string | undefined;
    strokeWidth: number | undefined;
  };
  text:
    | number
    | boolean
    | Node
    | JSX.ArrayElement
    | (string & {})
    | null
    | undefined;
}): JSX.Element {
  const icon = (
    <svg
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={props.icon.viewBox}
      stroke-width={props.icon.strokeWidth}
      stroke="currentColor"
      class="mx-auto mb-4 h-8 w-8 text-fg"
    >
      <path d={props.icon.path} />
    </svg>
  );

  return (
    <div class="mx-auto text-center transition duration-300 ease-smooth hover:-translate-y-0.5">
      <a
        href={props.href}
        class="text-fg hover:underline"
        onClick={() =>
          trackEvent('contact_method_click', {
            href: props.href,
          })
        }
      >
        {icon}
        <h6 class="text-sm font-medium">{props.text}</h6>
      </a>
    </div>
  );
}
