// @refresh reload
import { createHandler, StartServer } from '@solidjs/start/server';
import { getRequestEvent } from 'solid-js/web';

const siteUrl = 'https://gabo.solutions';
const themeInitScript = `(function(){try{var k='theme-preference';var s=localStorage.getItem(k);var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var l=window.matchMedia('(prefers-color-scheme: light)').matches;var t='dark';if(s==='dark'||s==='light'){t=s;}else if(d){t='dark';}else if(l){t='light';}document.documentElement.classList.remove('dark','light');document.documentElement.classList.add(t);document.documentElement.style.colorScheme=t;}catch(_){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}})();`;

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
  '/services': {
    title: 'Software Development Services | GABO Solutions',
    description:
      'Software development services for web development, ecommerce builds, and technical SEO/performance optimization with clear milestones.',
    canonicalPath: '/services',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/work': {
    title: 'Selected Work | GABO Solutions',
    description:
      'Review selected projects and outcomes delivered by GABO Solutions across websites, product builds, and optimization work.',
    canonicalPath: '/work',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/web-development': {
    title: 'Web Development Agency Services | GABO Solutions',
    description:
      'Web development agency services for conversion-focused websites and scalable web applications built with modern JavaScript/TypeScript stacks.',
    canonicalPath: '/web-development',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/ecommerce-development': {
    title: 'Ecommerce Website Development Services | GABO Solutions',
    description:
      'Ecommerce website development services focused on product discovery, checkout conversion, performance, and long-term growth.',
    canonicalPath: '/ecommerce-development',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/performance-seo': {
    title: 'Technical SEO and Performance Services | GABO Solutions',
    description:
      'Technical SEO and website performance optimization services to improve discoverability, Core Web Vitals, and conversion quality.',
    canonicalPath: '/performance-seo',
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
      const serviceStructuredData = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: [
          { '@type': 'Service', name: 'Conversion-Focused Websites' },
          { '@type': 'Service', name: 'Ecommerce Development' },
          { '@type': 'Service', name: 'Custom Web Apps and MVPs' },
          { '@type': 'Service', name: 'SEO and Performance Optimization' },
          { '@type': 'Service', name: 'Maintenance and Growth Support' },
        ],
      });
      const faqStructuredData = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How much does a project usually cost?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Most websites are CHF 6,000-15,000, ecommerce projects are CHF 10,000-30,000, and custom apps usually begin at CHF 30,000 depending on scope.',
            },
          },
          {
            '@type': 'Question',
            name: 'How long does a typical project take?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Most websites are completed in 3-8 weeks. More complex ecommerce and app builds usually take 8-16+ weeks.',
            },
          },
          {
            '@type': 'Question',
            name: 'Will I own the code and assets?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. You fully own agreed deliverables after final payment.',
            },
          },
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

            <script innerHTML={themeInitScript} />
            <script type="application/ld+json" innerHTML={structuredData} />
            {pathname === '/' && (
              <>
                <script type="application/ld+json" innerHTML={serviceStructuredData} />
                <script type="application/ld+json" innerHTML={faqStructuredData} />
              </>
            )}
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
