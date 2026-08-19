/**
 * Sign-in providers offered by this app.
 * Google OAuth is handled directly by Better Auth.
 */
export type AuthProvider = {
  providerId: string;
  label: string;
};

export const AUTH_PROVIDERS: readonly AuthProvider[] = [
  { providerId: "google", label: "Google" },
];

// Backwards-compatible alias for existing UI imports.
export const GROK_PROVIDERS = AUTH_PROVIDERS;
