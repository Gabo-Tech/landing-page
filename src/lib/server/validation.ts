import { ContentSection } from './content';

const urlLikeRegex = /^(\/|https?:\/\/|mailto:)/i;

function isObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

export function validateSectionPayload(section: ContentSection, payload: unknown) {
  switch (section) {
    case 'partners':
    case 'customers': {
      if (!Array.isArray(payload)) return `${section} must be an array`;
      for (const item of payload) {
        if (!isObject(item)) return `${section} items must be objects`;
        const href = String(item.href ?? '');
        const src = String(item.src ?? '');
        const alt = String(item.alt ?? '');
        if (!urlLikeRegex.test(href)) return `${section} item href is invalid`;
        if (!src) return `${section} item src is required`;
        if (!alt) return `${section} item alt is required`;
      }
      return null;
    }

    case 'contact': {
      if (!isObject(payload)) return 'contact must be an object';
      const heading = String(payload.heading ?? '');
      const subheading = String(payload.subheading ?? '');
      const items = payload.items;
      if (!heading || !subheading) return 'contact heading/subheading are required';
      if (!Array.isArray(items)) return 'contact items must be an array';
      for (const item of items) {
        if (!isObject(item)) return 'contact items must be objects';
        const href = String(item.href ?? '');
        const text = String(item.text ?? '');
        const icon = item.icon;
        if (!urlLikeRegex.test(href)) return 'contact item href is invalid';
        if (!text) return 'contact item text is required';
        if (!isObject(icon)) return 'contact item icon is required';
        if (!String(icon.path ?? '') || !String(icon.viewBox ?? '')) {
          return 'contact icon path/viewBox are required';
        }
      }
      return null;
    }

    case 'pricing': {
      if (!isObject(payload)) return 'pricing must be an object';
      const sectionData = payload.section;
      const items = payload.items;
      if (!isObject(sectionData)) return 'pricing.section must be an object';
      if (!Array.isArray(items)) return 'pricing.items must be an array';
      return null;
    }

    case 'site':
    case 'home':
    case 'about':
    case 'legal': {
      if (!isObject(payload)) return `${section} must be an object`;
      return null;
    }
  }
}
