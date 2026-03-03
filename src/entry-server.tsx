// @refresh reload
import { createHandler, StartServer } from '@solidjs/start/server';
import { getRequestEvent } from 'solid-js/web';

const siteUrl = 'https://gabo.solutions';

type SeoConfig = {
  title: string;
  description: string;
  canonicalPath: string;
  robots: string;
  ogType?: 'website' | 'article';
};

const defaultSeo: SeoConfig = {
  title: 'Expert Software Development Services | GABO Solutions',
  description:
    'Discover top-tier software development services with GABO Solutions. From SaaS to custom apps, we bring your digital projects to life.',
  canonicalPath: '/',
  robots: 'index, follow',
  ogType: 'website',
};

const seoByPath: Record<string, SeoConfig> = {
  '/': {
    title: 'Expert Software Development Services | GABO Solutions',
    description:
      'Launch your business with expert software development. We build custom web apps, SaaS products, and scalable digital solutions.',
    canonicalPath: '/',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/about': {
    title: 'About GABO Solutions | Software Development Team',
    description:
      'Learn about GABO Solutions, our mission, and how our team helps businesses build modern, scalable software products.',
    canonicalPath: '/about',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/contact': {
    title: 'Contact GABO Solutions | Book a Consultation',
    description:
      'Contact GABO Solutions for software development services. Reach out by email, social media, or book a call.',
    canonicalPath: '/contact',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/privacy': {
    title: 'Privacy Policy | GABO Solutions',
    description:
      'Read the GABO Solutions privacy policy and learn how we collect, use, and protect personal data.',
    canonicalPath: '/privacy',
    robots: 'index, follow',
    ogType: 'article',
  },
  '/terms': {
    title: 'Terms of Service | GABO Solutions',
    description:
      'Review the GABO Solutions terms of service, including user obligations, payments, legal terms, and policies.',
    canonicalPath: '/terms',
    robots: 'index, follow',
    ogType: 'article',
  },
};

function getSeoForPath(pathname: string): SeoConfig {
  if (seoByPath[pathname]) return seoByPath[pathname];

  if (pathname.startsWith('/_build') || pathname.startsWith('/_server')) {
    return { ...defaultSeo, robots: 'noindex, nofollow' };
  }

  return {
    title: 'Page Not Found | GABO Solutions',
    description:
      'The requested page could not be found. Explore GABO Solutions software development services or contact our team.',
    canonicalPath: pathname,
    robots: 'noindex, follow',
    ogType: 'website',
  };
}

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => {
      const event = getRequestEvent();
      const pathname = event?.request?.url
        ? new URL(event.request.url).pathname
        : '/';
      const seo = getSeoForPath(pathname);
      const canonicalUrl = `${siteUrl}${seo.canonicalPath}`;
      const structuredData = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'GABO Solutions',
        url: siteUrl,
        logo: `${siteUrl}/images/webclip.png`,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: 'sendmessage@gabo.email',
          availableLanguage: ['English', 'Spanish'],
        },
        sameAs: [
          'https://www.linkedin.com/company/gabo-tech',
          'https://www.instagram.com/gabo.solutions/',
        ],
      });

      return (
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>{seo.title}</title>
            <meta name="description" content={seo.description} />
            <meta name="robots" content={seo.robots} />
            <link rel="canonical" href={canonicalUrl} />

            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:type" content={seo.ogType ?? 'website'} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:site_name" content="GABO Solutions" />
            <meta property="og:image" content={`${siteUrl}/images/social-share.jpg`} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:description" content={seo.description} />
            <meta name="twitter:image" content={`${siteUrl}/images/social-share.jpg`} />

            <script type="application/ld+json" innerHTML={structuredData} />
            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      );
    }}
  />
));
