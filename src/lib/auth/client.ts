import { createAuthClient } from "better-auth/react";
import { AUTH_PROVIDERS } from "./providers";

/**
 * Better Auth client for this React SPA (browser-side).
 *
 * Talks to this app's OWN Better Auth at same-origin `/api/auth/*` using the
 * normal session cookie.
 */
export const authClient = createAuthClient();

/**
 * True when sign-in UI should be shown. Set `VITE_AUTH_ENABLED=false` to
 * force it off (dev user — see `use-current-user`).
 */
export const authEnabled = import.meta.env.VITE_AUTH_ENABLED !== "false";

/** The upstream providers to render sign-in buttons for. */
export { AUTH_PROVIDERS };

/**
 * Start sign-in with one upstream provider (`providerId` from
 * `AUTH_PROVIDERS`) via a full-page redirect into Google's own OAuth flow.
 */
export async function signIn(
  providerId: string,
  opts: { callbackURL?: string; errorCallbackURL?: string } = {},
): Promise<void> {
  const callbackURL = opts.callbackURL ?? "/";
  const errorCallbackURL = opts.errorCallbackURL ?? "/";

  // Clear any prior session first so switching providers actually switches
  // identity.
  try {
    await authClient.signOut();
  } catch {
    // No active session (or a transient sign-out error) — proceed to sign in.
  }

  const { data, error } = await authClient.signIn.social({
    provider: providerId,
    callbackURL,
    errorCallbackURL,
  });
  if (error) throw new Error(error.message ?? "Sign-in failed");
  if (data?.url) window.location.href = data.url;
}

/** Sign out of THIS app's local session, then redirect. */
export async function signOut(redirectTo = "/"): Promise<void> {
  await authClient.signOut();
  window.location.href = redirectTo;
}
