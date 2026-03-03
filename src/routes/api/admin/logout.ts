import { createLogoutCookieHeader } from '~/lib/server/auth';

export async function POST() {
  const headers = new Headers({ 'content-type': 'application/json; charset=utf-8' });
  headers.append('set-cookie', createLogoutCookieHeader());
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
}
