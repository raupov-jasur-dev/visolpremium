import { Link } from "@tanstack/react-router";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export function AuthSlot({ light = false }: { light?: boolean }) {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return <div className="size-8 animate-pulse rounded-full bg-burgundy/15" />;
  }
  if (user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          to="/mening-taklifnomalarim"
          className={
            light
              ? "hidden text-sm text-ivory/85 underline-offset-4 hover:underline md:inline"
              : "hidden text-sm text-ink/80 underline-offset-4 hover:text-ink hover:underline md:inline"
          }
        >
          Meninglarim
        </Link>
        <UserButton />
      </div>
    );
  }
  return (
    <Link
      to="/login"
      className={
        light
          ? "text-sm text-ivory/85 underline-offset-4 hover:underline"
          : "text-sm text-ink/80 underline-offset-4 hover:text-ink hover:underline"
      }
    >
      Kirish
    </Link>
  );
}
