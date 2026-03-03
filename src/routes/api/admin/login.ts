import { createLoginCookieHeader, validatePasscode } from '~/lib/server/auth';

type LoginPayload = {
  passcode?: string;
};

export async function POST({ request }: { request: Request }) {
  try {
    const body = (await request.json()) as LoginPayload;
    const passcode = body.passcode?.trim() ?? '';
    if (!validatePasscode(passcode)) {
      return new Response(JSON.stringify({ error: 'Invalid passcode' }), {
        status: 401,
        headers: { 'content-type': 'application/json; charset=utf-8' },
      });
    }

    const headers = new Headers({ 'content-type': 'application/json; charset=utf-8' });
    headers.append('set-cookie', createLoginCookieHeader());
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Unable to login',
        detail: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'content-type': 'application/json; charset=utf-8' },
      },
    );
  }
}
