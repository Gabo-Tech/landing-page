import { For, createResource } from 'solid-js';
import { A } from '@solidjs/router';
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

export default function Footer() {
  const [siteData] = createResource(fetchSiteContent);
  const footer = () => siteData()?.footer ?? siteFallback.footer;

  return (
    <footer class="bg-stone-700 text-white text-center p-4 pb-6 w-full">
      <div class="container mx-auto flex justify-between">
        <div>
          <h4>{footer().legalTitle}</h4>
          <ul>
            <For each={footer().legalLinks}>
              {link => (
                <li>
                  <A href={link.href} class="hover:underline">
                    {link.label}
                  </A>
                </li>
              )}
            </For>
          </ul>
        </div>
        <div>
          <h4>{footer().companyTitle}</h4>
          <ul>
            <For each={footer().companyLinks}>
              {link => (
                <li>
                  <A href={link.href} class="hover:underline">
                    {link.label}
                  </A>
                </li>
              )}
            </For>
            <li>© {new Date().getFullYear()} {siteData()?.brandName ?? siteFallback.brandName}</li>
          </ul>
        </div>
        <div>
          <h4>{footer().helpTitle}</h4>
          <ul>
            <For each={footer().helpLinks}>
              {link => (
                <li>
                  <A href={link.href} class="hover:underline">
                    {link.label}
                  </A>
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>
    </footer>
  );
}
