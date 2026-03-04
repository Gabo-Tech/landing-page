import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import aboutContent from '../../../content/about.json';
import contactContent from '../../../content/contact.json';
import customersContent from '../../../content/customers.json';
import homeContent from '../../../content/home.json';
import legalContent from '../../../content/legal.json';
import partnersContent from '../../../content/partners.json';
import pricingContent from '../../../content/pricing.json';
import siteContent from '../../../content/site.json';

export const contentSectionFiles = {
  site: 'site.json',
  home: 'home.json',
  about: 'about.json',
  contact: 'contact.json',
  legal: 'legal.json',
  pricing: 'pricing.json',
  partners: 'partners.json',
  customers: 'customers.json',
} as const;

export type ContentSection = keyof typeof contentSectionFiles;

const contentDir = join(process.cwd(), 'content');

const bundledDefaults: Record<ContentSection, unknown> = {
  site: siteContent,
  home: homeContent,
  about: aboutContent,
  contact: contactContent,
  legal: legalContent,
  pricing: pricingContent,
  partners: partnersContent,
  customers: customersContent,
};

export function isContentSection(value: string): value is ContentSection {
  return value in contentSectionFiles;
}

function getContentPath(section: ContentSection) {
  return join(contentDir, contentSectionFiles[section]);
}

export async function readContentSection(section: ContentSection) {
  const filePath = getContentPath(section);
  try {
    const fileContent = await readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === 'ENOENT') {
      return bundledDefaults[section];
    }
    throw error;
  }
}

export async function writeContentSection(section: ContentSection, data: unknown) {
  const filePath = getContentPath(section);
  const tempPath = `${filePath}.tmp`;
  const nextContent = `${JSON.stringify(data, null, 2)}\n`;

  await mkdir(contentDir, { recursive: true });
  await writeFile(tempPath, nextContent, 'utf-8');
  await rename(tempPath, filePath);
}

export function listContentSections(): ContentSection[] {
  return Object.keys(contentSectionFiles) as ContentSection[];
}
