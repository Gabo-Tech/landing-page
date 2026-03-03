import { createHash, timingSafeEqual } from 'node:crypto';

const COOKIE_NAME = 'admin_session';
const SESSION_TTL_SECONDS = 60 * 60 * 8;

function hashPasscode(passcode: string) {
  return createHash('sha256').update(passcode).digest('hex');
}

function expectedToken() {
  const passcode = process.env.ADMIN_PASSCODE;
  if (!passcode) return null;
  return hashPasscode(passcode);
}

function parseCookies(cookieHeader: string | null) {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;

  for (const part of cookieHeader.split(';')) {
    const [rawKey, ...rest] = part.trim().split('=');
    if (!rawKey || rest.length === 0) continue;
    cookies[rawKey] = decodeURIComponent(rest.join('='));
  }

  return cookies;
}

export function isAuthenticatedRequest(request: Request) {
  const token = expectedToken();
  if (!token) return false;

  const cookieHeader = request.headers.get('cookie');
  const cookies = parseCookies(cookieHeader);
  const sessionToken = cookies[COOKIE_NAME];
  if (!sessionToken) return false;

  const a = Buffer.from(sessionToken);
  const b = Buffer.from(token);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function validatePasscode(passcode: string) {
  const envPasscode = process.env.ADMIN_PASSCODE;
  if (!envPasscode || !passcode) return false;
  return passcode === envPasscode;
}

export function createLoginCookieHeader() {
  const token = expectedToken();
  if (!token) {
    throw new Error('ADMIN_PASSCODE is not set');
  }

  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_TTL_SECONDS}${secure}`;
}

export function createLogoutCookieHeader() {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure}`;
}
