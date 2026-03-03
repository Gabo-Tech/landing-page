type CalBookingButtonProps = {
  href: string;
  text?: string;
};

function CalBookingButton(props: CalBookingButtonProps) {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      class="inline-block text-white hover:underline font-medium"
    >
      {props.text ?? 'BOOK A CALL NOW!'}
    </a>
  );
}

export default CalBookingButton;
