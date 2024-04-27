import { onCleanup, onMount } from 'solid-js';

function CalBookingButton() {
  onMount(() => {
    const script = document.createElement('script');
    script.src = '/cal-setup.js';
    document.body.appendChild(script);
    onCleanup(() => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    });
  });

  return (
    <button
      data-cal-link="gabo-solutions/15min"
      data-cal-namespace=""
      data-cal-config='{"layout":"month_view"}'
      style={{ 'font-size': '16px', cursor: 'pointer' }}
    >
      BOOK A CALL NOW!
    </button>
  );
}

export default CalBookingButton;
