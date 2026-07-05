import { track as vercelTrack } from "@vercel/analytics";

/**
 * Thin, safe wrapper around Vercel Analytics custom events. No-ops cleanly if
 * analytics is unavailable (e.g. blocked, or not yet enabled in the project).
 */
export function track(
  event: string,
  props?: Record<string, string | number | boolean | null>,
): void {
  try {
    vercelTrack(event, props);
  } catch {
    // analytics is best-effort; never break the UI over a tracking call
  }
}
