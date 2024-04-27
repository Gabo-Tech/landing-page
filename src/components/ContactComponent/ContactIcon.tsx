import { JSX } from 'solid-js';
import CalBookingButton from '../CalBookingButton/CalBookingButton';

const calBookingUrl = 'https://cal.com/gabo/book-a-call';

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
}) {
  const isCalBookingLink = props.href === calBookingUrl;

  const icon = (
    <svg
      fill="#fff"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={props.icon.viewBox}
      stroke-width={props.icon.strokeWidth}
      stroke="currentColor"
      class="mx-auto mb-6 h-8 w-8 text-primary dark:text-primary-400"
    >
      <path d={props.icon.path} />
    </svg>
  );

  return (
    <div class="mx-auto mb-12 text-center lg:mb-0 transform transition duration-500 hover:scale-125">
      {isCalBookingLink ? (
        <div>
          {icon}
          <CalBookingButton />
        </div>
      ) : (
        <a href={props.href} class="text-white hover:underline">
          {icon}
          <h6 class="font-medium">{props.text}</h6>
        </a>
      )}
    </div>
  );
}
