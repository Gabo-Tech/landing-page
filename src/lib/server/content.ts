import { readFile, rename, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

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

export function isContentSection(value: string): value is ContentSection {
  return value in contentSectionFiles;
}

function getContentPath(section: ContentSection) {
  return join(contentDir, contentSectionFiles[section]);
}

export async function readContentSection(section: ContentSection) {
  const filePath = getContentPath(section);
  const fileContent = await readFile(filePath, 'utf-8');
  return JSON.parse(fileContent);
}

export async function writeContentSection(section: ContentSection, data: unknown) {
  const filePath = getContentPath(section);
  const tempPath = `${filePath}.tmp`;
  const nextContent = `${JSON.stringify(data, null, 2)}\n`;

  await writeFile(tempPath, nextContent, 'utf-8');
  await rename(tempPath, filePath);
}

export function listContentSections(): ContentSection[] {
  return Object.keys(contentSectionFiles) as ContentSection[];
}
