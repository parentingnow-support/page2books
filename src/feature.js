/**
 * Pure helpers — selfcheck runs without Chrome.
 */

export function isRestrictedUrl(url) {
  if (!url) return true;
  return (
    url.startsWith("chrome://") ||
    url.startsWith("chrome-extension://") ||
    url.startsWith("edge://") ||
    url.startsWith("about:") ||
    url.startsWith("devtools://")
  );
}

/** @returns {{ host: string, path: string }} */
export function summarizeUrl(url) {
  try {
    const u = new URL(url);
    return { host: u.host, path: u.pathname + u.search };
  } catch {
    return { host: "", path: "" };
  }
}

/**
 * Normalize a money-like token to a best-effort number string.
 * ponytail: KR/EN heuristics only — upgrade when locale fixtures land.
 */
export function normalizeAmountToken(token) {
  if (!token) return "";
  const cleaned = String(token).replace(/[^\d.,]/g, "").replace(/,/g, "");
  const n = Number.parseFloat(cleaned);
  return Number.isFinite(n) ? String(n) : "";
}
