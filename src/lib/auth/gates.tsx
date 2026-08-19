import type { ReactNode } from "react";
import { Navigate } from "@tanstack/react-router";
import { authEnabled, signOut } from "./client";
import { useCurrentUser, useCurrentUserState } from "./use-current-user";

export const SIGN_IN_PATH = "/login";

export function SignedIn({ children }: { children: ReactNode }) {
  const { user } = useCurrentUserState();
  return user ? <>{children}</> : null;
}

export function SignedOut({ children }: { children: ReactNode }) {
  const { user, isPending } = useCurrentUserState();
  if (isPending || user) return null;
  return <>{children}</>;
}

export function RedirectToSignIn({ to = SIGN_IN_PATH }: { to?: string }) {
  return <Navigate to={to} />;
}

export function UserButton() {
  const user = useCurrentUser();
  if (!user) return null;
  const label = user.displayName ?? user.primaryEmail ?? "Profil";
  return (
    <div className="flex items-center gap-2">
      {user.profileImageUrl ? (
        <img
          src={user.profileImageUrl}
          alt=""
          className="size-8 rounded-full object-cover"
        />
      ) : (
        <span className="grid size-8 place-items-center rounded-full bg-burgundy/15 font-display text-sm text-burgundy">
          {label.charAt(0).toUpperCase()}
        </span>
      )}
      <span className="hidden max-w-28 truncate text-sm font-medium sm:inline">{label}</span>
      {authEnabled && (
        <button
          type="button"
          onClick={() => void signOut()}
          className="cursor-pointer text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
        >
          Chiqish
        </button>
      )}
    </div>
  );
}
