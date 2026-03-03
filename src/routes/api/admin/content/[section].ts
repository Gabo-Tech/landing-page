import { isAuthenticatedRequest } from '~/lib/server/auth';
import {
  isContentSection,
  listContentSections,
  readContentSection,
  writeContentSection,
} from '~/lib/server/content';
import { validateSectionPayload } from '~/lib/server/validation';

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

function getSectionFromRequest(request: Request) {
  const pathname = new URL(request.url).pathname;
  return pathname.split('/').pop() ?? '';
}

function ensureAuthenticated(request: Request) {
  if (isAuthenticatedRequest(request)) return null;
  return jsonResponse({ error: 'Unauthorized' }, 401);
}

export async function GET({ request }: { request: Request }) {
  const authError = ensureAuthenticated(request);
  if (authError) return authError;

  const section = getSectionFromRequest(request);
  if (section === 'all') {
    const result: Record<string, unknown> = {};
    for (const key of listContentSections()) {
      result[key] = await readContentSection(key);
    }
    return jsonResponse({ data: result });
  }

  if (!isContentSection(section)) {
    return jsonResponse({ error: 'Unknown content section' }, 404);
  }

  const data = await readContentSection(section);
  return jsonResponse({ data });
}

export async function PUT({ request }: { request: Request }) {
  const authError = ensureAuthenticated(request);
  if (authError) return authError;

  try {
    const section = getSectionFromRequest(request);
    if (!isContentSection(section)) {
      return jsonResponse({ error: 'Unknown content section' }, 404);
    }

    const body = await request.json();
    const data = body?.data;
    const validationError = validateSectionPayload(section, data);
    if (validationError) {
      return jsonResponse({ error: validationError }, 400);
    }

    await writeContentSection(section, data);
    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse(
      {
        error: 'Unable to save content',
        detail: error instanceof Error ? error.message : 'Unknown error',
      },
      500,
    );
  }
}
