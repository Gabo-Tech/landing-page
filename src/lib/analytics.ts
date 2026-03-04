import { track } from '@vercel/analytics';

type EventPayload = Record<string, string | number | boolean>;

export function trackEvent(name: string, payload?: EventPayload): void {
  try {
    track(name, payload);
  } catch {
    // Intentionally silent: analytics should never break UX flows.
  }
}
