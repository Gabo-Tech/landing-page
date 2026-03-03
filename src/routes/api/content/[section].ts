import { isContentSection, readContentSection } from '~/lib/server/content';

function getSectionFromRequest(request: Request) {
  const pathname = new URL(request.url).pathname;
  return pathname.split('/').pop() ?? '';
}

export async function GET({ request }: { request: Request }) {
  try {
    const section = getSectionFromRequest(request);
    if (!isContentSection(section)) {
      return new Response(JSON.stringify({ error: 'Unknown content section' }), {
        status: 404,
        headers: { 'content-type': 'application/json; charset=utf-8' },
      });
    }

    const data = await readContentSection(section);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Unable to read content',
        detail: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'content-type': 'application/json; charset=utf-8' },
      },
    );
  }
}
