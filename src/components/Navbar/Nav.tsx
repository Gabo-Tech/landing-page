import { A, useLocation } from '@solidjs/router';
import { For, createResource } from 'solid-js';
import siteFallback from '../../../content/site.json';

async function fetchSiteContent() {
  try {
    const response = await fetch('/api/content/site');
    if (!response.ok) return siteFallback;
    const payload = await response.json();
    return payload?.data ?? siteFallback;
  } catch {
    return siteFallback;
  }
}

export default function Nav() {
  const location = useLocation();
  const [siteData] = createResource(fetchSiteContent);
  const navLinks = () => siteData()?.navLinks ?? siteFallback.navLinks;

  const active = (path: string) =>
    path === location.pathname ? 'text-white' : 'text-gray-300 hover:text-white';

  return (
    <nav class="bg-stone-950 fixed left-0 right-0 bottom-0 lg:top-0 lg:bottom-auto z-50 h-12">
      <ul
        class="container h-full flex justify-center lg:justify-start items-center px-3 text-gray-200 mx-auto max-w-screen-xl"
      >
        <For each={navLinks()}>
          {link => (
            <li class="mx-1.5 sm:mx-4">
              <A href={link.href} class={`font-medium no-underline ${active(link.href)}`}>
                {link.label}
              </A>
            </li>
          )}
        </For>
      </ul>
    </nav>
  );
}
