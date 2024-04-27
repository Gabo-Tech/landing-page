import { createSignal, onCleanup, onMount } from 'solid-js';
import { A, useLocation } from '@solidjs/router';

export default function Nav() {
  const location = useLocation();
  const [windowWidth, setWindowWidth] = createSignal(0);
  const [justify, setJustify] = createSignal('right');

  const updateWidth = () => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
    }
  };

  onMount(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateWidth);
      updateWidth();
    }
  });

  onCleanup(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', updateWidth);
    }
  });

  const isMobile = () => windowWidth() < 768;
  const navPositionClass = () => (isMobile() ? 'bottom-0' : 'top-0');
  const justifyClass = () => (isMobile() ? 'justify-center' : justify());

  const active = (path: string) =>
    path === location.pathname
      ? 'border-grey-600'
      : 'border-transparent hover:border-grey-600';

  return (
    <nav class={`bg-stone-950 fixed left-0 right-0 z-50 ${navPositionClass()}`}>
      <ul
        class={`container flex ${justifyClass()} items-center p-3 text-gray-200 mx-auto max-w-screen-xl`}
      >
        <li class={`border-b-2 ${active('/')} mx-1.5 sm:mx-6`}>
          <A href="/">Home</A>
        </li>
        <li class={`border-b-2 ${active('/contact')} mx-1.5 sm:mx-6`}>
          <A href="/contact">Contact</A>
        </li>
      </ul>
    </nav>
  );
}
