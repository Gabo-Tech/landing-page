import { mkdir, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { isAuthenticatedRequest } from '~/lib/server/auth';
import { readContentSection, writeContentSection } from '~/lib/server/content';

type BrandSection = 'partners' | 'customers';

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

function toSafeFileName(name: string) {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return base || 'logo.svg';
}

function isBrandSection(value: string): value is BrandSection {
  return value === 'partners' || value === 'customers';
}

export async function POST({ request }: { request: Request }) {
  if (!isAuthenticatedRequest(request)) {
    return jsonResponse({ error: 'Unauthorized' }, 401);
  }

  try {
    const formData = await request.formData();
    const section = String(formData.get('section') ?? '');
    const href = String(formData.get('href') ?? '').trim();
    const alt = String(formData.get('alt') ?? '').trim();
    const file = formData.get('file');

    if (!isBrandSection(section)) {
      return jsonResponse({ error: 'Invalid section' }, 400);
    }
    if (!href || !alt) {
      return jsonResponse({ error: 'href and alt are required' }, 400);
    }
    if (!(file instanceof File)) {
      return jsonResponse({ error: 'SVG file is required' }, 400);
    }

    const ext = extname(file.name).toLowerCase();
    const looksLikeSvg = file.type === 'image/svg+xml' || ext === '.svg';
    if (!looksLikeSvg) {
      return jsonResponse({ error: 'Only .svg files are allowed' }, 400);
    }

    const fileName = `${Date.now()}-${toSafeFileName(file.name.endsWith('.svg') ? file.name : `${file.name}.svg`)}`;
    const uploadDir = join(process.cwd(), 'public', 'images', 'uploads');
    const diskPath = join(uploadDir, fileName);
    const publicSrc = `/images/uploads/${fileName}`;

    await mkdir(uploadDir, { recursive: true });
    const bytes = new Uint8Array(await file.arrayBuffer());
    await writeFile(diskPath, bytes);

    const existing = await readContentSection(section);
    const list = Array.isArray(existing) ? existing : [];
    const nextItem = { href, src: publicSrc, alt };

    await writeContentSection(section, [...list, nextItem]);
    return jsonResponse({ ok: true, item: nextItem });
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    const isReadOnlyFs = err.code === 'EROFS';
    return jsonResponse(
      {
        error: isReadOnlyFs
          ? 'Uploads are not writable in this deployment environment'
          : 'Unable to upload SVG',
        detail: isReadOnlyFs
          ? 'Server filesystem is read-only. Use external object storage for persistent uploads.'
          : error instanceof Error
            ? error.message
            : 'Unknown error',
      },
      500,
    );
  }
}
